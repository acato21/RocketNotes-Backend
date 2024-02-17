class NoteCreateServices{
    constructor(noteRepository){
        this.noteRepository = noteRepository;
    }

    async execute({title, description, links, tags, user_id }){

        const user = await this.noteRepository.findUserById(user_id);

        if(!user){
            throw new AppError("Nenhum usuário cadastrado");
        }

        const note_id = await this.noteRepository.createNote({title, description, user_id});

        const linkInsert = links.map(link => {
            return{
                note_id,
                url: link
            };
        });

        await this.noteRepository.createLinks(linkInsert);

        const tagInsert = tags.map(tag => {
            return{
                user_id,
                note_id,
                name: tag
            };
        });

        await this.noteRepository.createTags(tagInsert);

        return
    }
}

module.exports = NoteCreateServices;