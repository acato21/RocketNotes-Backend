const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UserController{

    async create(request, response){

        const { name, email, password } = request.body;

        const [checkEmail] = await knex("users").where({email});

        if(checkEmail){
            throw new AppError("Este email já está em uso");
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword
    })

        return response.status(201).json({ name, email, password });

    }

    async update(request, response){

        const { name, email, password, newPassword} = request.body;
        const user_id = request.user.id;

        const [user] = await knex("users").where({id: user_id})

        console.log(user.password)

        if(email){
            const [checkEmail] = await knex("users").where({email});

            console.log(checkEmail)

            if(checkEmail && checkEmail.id != user_id){
                throw new AppError("O email já está em uso");
            }
        }


        if(!password){
            throw new AppError("Insira a senha atual");
        }

        
        if(password && newPassword){
            
            const checkPassword = await compare(password, user.password);
    
            if(!checkPassword){
                throw new AppError("A senha está incorreta")
            }

            user.password = await hash(newPassword, 8) 
        }


        user.email = email ?? user.email;
        user.name = name ?? user.name;

        await knex("users").update({
            name: user.name,
            email: user.email,
            password: user.password
        })
        .where({id: user_id});
        
        return response.json();
    }

}

module.exports = UserController;