const {hash, compare} = require("bcryptjs");

class UserUpdateServices{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({name, email, password, newPassword, user_id }){

        const [user] = await this.userRepository.findById(user_id);

        console.log(user)

        if(email){
            const [checkEmail] = await this.userRepository.findByEmail(email);

            if(checkEmail && checkEmail.id != user_id){
                throw new AppError("O email já está em uso");
            }
        }

        if(!password){
            throw new AppError("Insira a senha atual");
        }

        if(password && newPassword){
            
            const checkPassword = await compare(password, user.password);//Comparado a senha criptografada
    
            if(!checkPassword){
                throw new AppError("A senha está incorreta")
            }

            user.password = await hash(newPassword, 8) 
        }

        user.email = email ?? user.email;
        user.name = name ?? user.name;

        await this.userRepository.userUpdate({name: user.name, email: user.email, password: user.password, id: user_id});
        
        return
    }
}

module.exports = UserUpdateServices;