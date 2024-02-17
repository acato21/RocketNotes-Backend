const DiskStorage = require("../../providers/DiskStorage");
const UserRepository = require("../../repositories/UserRepositorys");

class UserAvatarServices{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({user_id, avatar}){
        const diskStorage = new DiskStorage();

        const [user] = await this.userRepository.findById(user_id);

        if(!user){
            throw new AppError("Para trocar foto de usuário é nescessário está logado", 401);
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        await diskStorage.saveFile(avatar);

        await this.userRepository.avatarUpdate({avatar, id: user_id});

        const [userUpdate] = await this.userRepository.findById(user_id);

        return userUpdate;
    }
}

module.exports = UserAvatarServices;