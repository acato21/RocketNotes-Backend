const knex = require("../database/knex");

class NoteRepository{
    async findUserById(id){
        const user = await knex("users").where({id});

        return user;
    }

    async createNote({title, description, user_id}){
        const [note] = await knex("notes").insert({title, description, user_id});

        return note;
    }

    async createLinks(links){
        await knex("links").insert(links);
        return 
    }

    async createTags(tags){
        await knex("tags").insert(tags);
        return
    }
}

module.exports = NoteRepository;