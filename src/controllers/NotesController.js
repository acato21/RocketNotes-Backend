const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController{

    async create(request, response){

        const { title, description, links, tags } = request.body;
        const user_id = request.user.id;

        const [note_id] = await knex("notes").insert({title, description});

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

}

module.exports = NotesController;