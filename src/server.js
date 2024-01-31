require("express-async-errors");//Serve par apuxar o erros do código

const cors = require("cors");//Para ligar o backend com o front
const express = require("express");
const app = express();
app.use(cors());//Para ligar o backend com o front

const uploadConfig = require("./configs/upload");
const routes = require("./routes");
const AppError = require("../src/utils/AppError");

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));//Para exibir a  imagem que está sendo pedida pelo navegador
app.use(routes);
app.use(express.json());

app.use(( error, require, response, next ) => {

    if(error instanceof AppError){
        return response.status(error.statusError).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({

        status: "error",
        message: "Internal server error"

    })

})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`) );