const { hash } = require("bcryptjs");
const AppError = require("../../utils/AppError");

class UserCreateServices{
    constructor(userRepository){
        this.userRepository = userRepository;
    }


    async execute({ name, email, password }){

        const checkEmail  = await this.userRepository.findByEmail(email);

        if(checkEmail){
            throw new AppError("Este email já está em uso");
        }

        const hashedPassword = await hash(password, 8);//Criptografando a senha
 
        const user = await this.userRepository.create({name, email, password: hashedPassword })

        return user;
    }

}

module.exports = UserCreateServices;