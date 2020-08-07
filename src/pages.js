const DataBase = require('./database/db')

const {petsChoice, petsSex, getSex} = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageAdopt(req,res){
    const filters = req.query

    if(!filters.petsChoice || !filters. petsSex || filters.age){

        return res.render("adopt.html", {filters, petsChoice, petsSex})
    }

    const query = `
        SELECT pets_information.*, registrer.*
        FROM registrer
        JOIN pets_information ON (pets_information.registrer_id = registrer.id)
        WHERE EXISTS (
            SELECT pets_information2.*
            FROM pets_information2
            WHERE pets_information2.information_id = information.id
            AND pets_information2.age = ${filters.age}
            AND pets_information2.sex = ${filters.petSex}
        ) 
        AND pets_information.pet = "${filters.pet}"
    `

    //caso haja erro na consulta do bd
    try {
        const db = await DataBase
        const pets = await db.all(query)

        pets.map((pet)=> {
            pet.petsChoice = getSex(pet.petsChoice)
        })

        return res.render("study.html", {pets, petsChoice, filters, petsSex})

    } catch (error) {
        console.log(error)
    }
}

function pageGiveHome(req,res){
    
    return res.render("give-home.html", {petsChoice, petsSex})
}

async function saveHome(req, res) {
    const createPet = require('./database/createPet')
    
    const petValue = {
        name: req.body.name,
        fotopet: req.body.fotopet,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const informationValue = {
        pet: req.body.pet,
        anunciante: req.body.anunciante
    }

    const informationValue2 = {
        sex: req.body.sex,
        age: req.body.age
    }
   
  try {
      const db = await DataBase
      await createPet(db, {petValue, informationValue, informationValue2})  

      let queryString = "?pet=" + req.body.pet
      queryString += "&sex" + req.body.sex

      return res.redirect("/adopt" + queryString)

    } catch (error) {
      console.log(error)
  }  
    
}

module.exports = {
    pageLanding,
    pageAdopt,
    pageGiveHome,
    saveHome
}