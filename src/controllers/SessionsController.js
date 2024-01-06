const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const authConfigs = require("../configs/auth");

class SessionsController{

   async create(request, response){

        const { email, password } = request.body;

        const user = await knex("users").where({email}).first();

        if(!user){
            throw new AppError("Email e/ou senha incorreto");
        }

        const checkPassword = await compare(password, user.password);

        if(!checkPassword){
            throw new AppError("Email e/ou senha incorreto");
        }

        const { secret, expiresIn } = authConfigs.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });


        return response.json({ user, token});

    }
}

module.exports = SessionsController;