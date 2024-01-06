const authConfigs = require("../configs/auth");
const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");

function ensureAuthenticated(request, response, next){

    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Usuário não informado");
    }

    const [, token] = authHeader.split(" ");

    try{
       const {sub: user_id } = verify(token, authConfigs.jwt.secret);

        request.user = {id: Number(user_id)};

        return next();
    }catch{
        throw new AppError("Usuário não encontrado");
    }

}

module.exports = ensureAuthenticated;