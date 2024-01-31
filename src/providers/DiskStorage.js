const path = require("path");
const fs = require("fs");
const uploadConfig = require("../configs/upload");

class DiskStorage{

    async saveFile(file){//Função para tranferir os arquivos da pasatr temporaria para a pasta definitiva
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file
    }

    async deleteFile(file){//Função para deletar foto de usuário antiga, caso haja
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);//Procurando o arquivo que tenha esse nome na pasta de upload

        try {
            await fs.promises.stat(filePath);//Verificando status de arquivos
        } catch {
            return
        }

        await fs.promises.unlink(filePath);//Removendo arquivo da pasta
    }

}

module.exports = DiskStorage;
