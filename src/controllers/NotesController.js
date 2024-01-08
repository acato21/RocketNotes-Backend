const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController{

    async index(request, response){
        
    }

    async create(request, response){

        const { title, description, links, tags } = request.body;
        const user_id = request.user.id;

        const user = await knex("users").where({id: user_id});

        console.log(user);

        if(!user){
            throw new AppError("Nenhum usuário cadastrado");
        }

        const [note_id] = await knex("notes").insert({title, description, user_id});

        const linkInsert = links.map(link => {
            return{
                note_id,
                url: link
            };
        });

        await knex("links").insert(linkInsert);

        const tagInsert = tags.map(tag => {
            return{
                user_id,
                note_id,
                name: tag
            };
        });

        console.log(tagInsert)

        await knex("tags").insert(tagInsert);

        return response.json(note_id);
    }

    async delete(request, response){

        const id = request.params;

        await knex("notes").where(id).delete();

        return response.json();

     }

     async show(request, response){

        const { note_id } = request.params;
        const user_id = request.user.id;

        const note = await knex("notes").where({id: note_id, user_id: user_id}).first();

        return response.json(note);

     }
}

module.exports = NotesController;