const AppError = require("../utils/AppError");
const knex = require("../database/knex");//importando o banco de dados

const UserRepository = require("../repositories/UserRepositorys");
const userRepository = new UserRepository();

const UserCreateServices = require("../services/User/UserCreateServices");
const UserUpdateServices = require("../services/User/UserUpdateServices");
const UserAvatarServices = require("../services/User/UserAvatarServices");

class UserController{

    async create(request, response){

        const { name, email, password } = request.body;

        const userCreateServices = new UserCreateServices(userRepository);
        await userCreateServices.execute({ name, email, password });

        return response.status(201).json();

    }

    async update(request, response){

        const { name, email, password, newPassword} = request.body;
        const user_id = request.user.id;

        const userUpdateServices = new UserUpdateServices(userRepository);
        await userUpdateServices.execute({name, email, password, newPassword, user_id });
        
        return response.json();
    }

    async avatar(req, res){
        const user_id = req.user.id;
        const avatar = req.file.filename;//Puxando nome de arquivo

        const userAvatarServices = new UserAvatarServices(userRepository);
        const userUpdate = await userAvatarServices.execute({user_id, avatar});

        return res.json(userUpdate)
    }

}

module.exports = UserController;