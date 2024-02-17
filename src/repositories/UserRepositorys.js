const knex = require("../database/knex");

class UserRepository{

    async findByEmail(email){

        const [user] = await knex("users").where({email});

        return user;
    }

    async create({name, email, password }){

        const userId = await knex("users").insert({
            name,
            email,
            password
        })

        return
    }

    async findById(id){
        const user = await knex("users").where({id});

        return user;
    }

    async userUpdate({name, email, password, id}){
        await knex("users").update({
            name,
            email,
            password
        })
        .where({id});
        
        return
    }

    async avatarUpdate({avatar, id}){
        await knex("users").update({avatar}).where({id});

        return;
    }

}

module.exports = UserRepository;