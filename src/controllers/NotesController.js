const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const NoteRepository = require("../repositories/NoteRepository");
const noteRepository = new NoteRepository();

const NoteCreateServices = require("../services/Notes/NoteCreateServices");



class NotesController{

    async index(request, response){

        const { title, tags } = request.query;
        const user_id = request.user.id;

        let note;

        if(tags){
            const Tags = tags.split(",").map(tag => tag);
            
            note = await knex("tags")
            .select(
                "notes.id",
                "notes.title",
                "notes.description"
            )
            .where("notes.user_id", user_id)
            .whereIn("name", Tags)
            .whereLike("notes.title", `%${title}%`)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .groupBy("notes.id")
            .orderBy("notes.title")
        } else {
            note = await knex("notes")
            .whereLike("title", `%${title}%`)
            .where(user_id)
            orderBy("title")
        }

        const Tags = await knex("tags").where({user_id});

        const insertNote = note.map(note => {
            const TagNote = Tags.filter(tag => tag.note_id === note.id);

            return{
                ...note,
                tags: TagNote
            }
        })
        
        return response.json(insertNote)

    }

    async create(request, response){

        const { title, description, links, tags } = request.body;
        const user_id = request.user.id;

        const noteCreateServices = new NoteCreateServices(noteRepository);
        await noteCreateServices.execute({title, description, links, tags, user_id });

        return response.json();
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
        const links = await knex("links").where({note_id});
        const tags = await knex("tags").where({note_id});

        return response.json({note, links, tags});

     }

     async tags(req, res){
        const user_id = req.user.id;

        const tags = await knex("tags")
        .where({user_id})
        .groupBy("name") 

        return res.json(tags);

     }
}

module.exports = NotesController;