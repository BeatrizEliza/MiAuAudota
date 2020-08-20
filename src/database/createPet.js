module.exports = async function(db, {petValue, informationValue, informationValue2}){

    //inserir dados na tabela registrer
    const insertedPet = await db.run(`
        INSERT INTO registrer (
            name,
            fotopet,
            whatsapp,
            bio
        ) VALUES (
            "${petValue.name}",
            "${petValue.petfoto}",
            "${petValue.whatsapp}",
           " ${petValue.bio}"
        );
    `)

    const registrer_id = insertedPet.lastID

    //inserir dados na tabela pets_information

    const insertedInformation = await db.run(`
        INSERT INTO pets_information (
            pet,
            anunciante,
            registrer_id
        ) VALUES (
            "${informationValue.pet}",
            "${informationValue.anunciante}",
            "${registrer_id}"
        );
    `)

    const pets_information2_id = insertedInformation.lastID

    //inserir dados na tabela pets_information2
    const insertedAllInformationValues = informationValue2.map((informationValue2) => {
        return db.run(`
            INSERT INTO pets_information2 (
                pets_information2_id,
                sex,
                age
            ) VALUES (
                "${pets_information2_id}",
                "${informationValue2.sex}",
                "${informationValue2.age}" 
            );
         `)
    })

    await Promise.all(insertedAllInformationValues)
}