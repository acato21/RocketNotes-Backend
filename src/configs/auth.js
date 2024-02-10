module.exports ={

    jwt: {
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: "1d" //Tempo até o tokenj expirar
    }

}