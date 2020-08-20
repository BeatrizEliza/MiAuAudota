const Database = require('./db')
const createPet = require('./createPet')

Database.then(async (db) => {
    //inserir dados
    petValue = {
        name: "Toby Tobbynho",
        fotopet: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1560&q=80", 
        whatsapp: "89987654534", 
        bio: "Cãozinho amoroso e muito brincalhão. <br><br>Gosta de comer ração o tempo todo e brincar de pegar a bolinha, pronto para conviver com crianças", 
    }

    informationValue = {
        pet: 1, 
        anunciante:"Regiane Dutra",
        //pet id vem do BD
    }

    informationValue2 = {
        sex: 0,
        age: 12
    }
    await createPet(db, {petValue, informationValue, informationValue2})
    //consultar dados //TODOS OS PETS

    const selectedPets = await db.all("SELECT * FROM registrer")
    console.log(selectedPets)

    // consultar informações do pet e trazer junto FALHA
    const selectRegistrerAndInformation = await db.all(`
        SELECT pets_information.*, registrer.*
        FROM registrer
        JOIN pets_information ON (pets_information.registrer_id = registrer.id)
        WHERE pets_information.registrer_id = 1
    `)
    //console.log(selectRegistrerAndInformation)

    const selectInformation2 = await db.all(`
        SELECT pets_information2.*
        FROM pets_information2
        WHERE pets_information2.pets_information2_id = "1"
        AND pets_information2.sex = "0"
        AND pets_information2.age = "12"
    `)
    //console.log(selectInformation2)
})