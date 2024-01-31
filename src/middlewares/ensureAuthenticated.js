const authConfigs = require("../configs/auth");
const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");//Serve para verificar token 

function ensureAuthenticated(request, response, next){

    const authHeader = request.headers.authorization;//Pegando token do header

    if(!authHeader){
        throw new AppError("Usuário não informado");
    }

    const [, token] = authHeader.split(" ");//Subtraindo do token do Bearer

    try{
       const {sub: user_id } = verify(token, authConfigs.jwt.secret);//Verificação se os tokens coincidem

        request.user = {id: Number(user_id)};//tranformando user em uma requisição colocando o token no id

        return next();
    }catch{
        throw new AppError("Usuário não encontrado");
    }

}

module.exports = ensureAuthenticated;