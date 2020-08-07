const petsChoice = [
    "Cachorro",
    "Gato",
    "Pássaro",
    "Peixe",
    "Coelho",
    "Tartaruga",
    "Hamster",
    "Iguana",
    "Cobra",
    "Cavalo",
    "Outro"
]

const petsSex = [
    "Macho",
    "Fêmea"
]

function getSex(sexNumber) {
    const position = +sexNumber - 1
    return petsSex[position]
  }

  module.exports = {
      petsChoice,
      petsSex,
      getSex
  }