const Database = require('sqlite-async')

function execute(db) {
    //criando tabelas do banco
    return db.exec(`
        CREATE TABLE IF NOT EXISTS registrer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            fotopet TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS pets_information (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pet INTEGER,
            anunciante TEXT,
            registrer_id INTEGER
        );
            
        CREATE TABLE IF NOT EXISTS pets_information2 (
            sex INTEGER,
            age INTEGER,
            pets_information2_id INTEGER 
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)
