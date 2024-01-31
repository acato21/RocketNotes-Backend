const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")//localização do banco de dados
    },

    pool: { 
      afterCreate: (conn, cb) => conn.run("PRAGMA foreingn_key = ON", cb)//Para funcionar o efeito de exclusão em cascata
    },

    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")//Aonde armazenarar as tabelas
    },

    useNullAsDefault: true

  }

}