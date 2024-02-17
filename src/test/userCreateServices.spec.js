const UserCreateServices = require("../services/UserCreateServices");
const UserRepositoryInMemory = require("./RepositpriesInMemories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");
describe("UserCreateServices", () => {

    let userCreateServices; 
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        userCreateServices = new UserCreateServices(userRepository);
    });

    it("user should be create", async () => {

        //Tirar o [] de checkemail em UserCreateServices
    
        const user = {
            name: "test",
            email: "test@gmail.com",
            password: "123"
        }

        const userCreated = await userCreateServices.execute(user);
    
        await expect(userCreated).toHaveProperty("id");
    
    })

    it("Email already registered error", async () => {

        const user1 = {
            name: "test",
            email: "test@gmail.com",
            password: "123"
        }

        const user2 = {
            name: "test 2",
            email: "test@gmail.com",
            password: "123"
        }

        await userCreateServices.execute(user1);
    
        await expect(userCreateServices.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso"));

    })

})