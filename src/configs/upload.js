const  multer = require("multer");//Serve para fazer a minipulação de arquivos
const path = require("path");
const crypto = require("crypto");//Para criar um texto aleatorio

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");//Pasta temporária para salvar os arquivos
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");//Pasta definitiva pra salvar arquivos

const MULTER = {//Configurações do multer
    storage: multer.diskStorage({
        destination: TMP_FOLDER,//Colocando como destino dos arquivos a pasta temporaria
        filename(req, file, cb){
            const fileHash =  crypto.randomBytes(10).toString("hex");//Criando texto aleatório para colocar antes do nome
            const filename = `${fileHash}-${file.originalname}`;//Juntando nome aleatorio com o nome original do arquivo

            return cb(null, filename);
        }//Função para determinar um nome para o arquivo da foto de perfil para que não haja nomes iguais 
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}