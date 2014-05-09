function Interceptor(race, slotOne, slotTwo, slotThree, slotFour, initiative) {
    this.race = race
    if (slotOne==null) this.slotOne = null
    else this.slotOne = 'images/tech_' + slotOne + '.jpg'
    this.slotTwo = 'images/tech_' + slotTwo + '.jpg'
    this.slotThree = 'images/tech_' + slotThree + '.jpg'
    this.slotFour = 'images/tech_' + slotFour + '.jpg'
    if (initiative==null) this.initiative = null
    else this.initiative = 'images/ship_' + initiative + '.jpg'
}

function Cruiser(race, slotOne, slotTwo, slotThree, slotFour, slotFive, slotSix, initiative) {
    this.race = race
    this.slotOne = 'images/tech_' + slotOne + '.jpg'
    if (slotTwo==null) this.slotTwo = null
    else this.slotTwo = 'images/tech_' + slotTwo + '.jpg'
    this.slotThree = 'images/tech_' + slotThree + '.jpg'
    this.slotFour = 'images/tech_' + slotFour + '.jpg'
    this.slotFive = 'images/tech_' + slotFive + '.jpg'
    this.slotSix = 'images/tech_' + slotSix + '.jpg'
    if (initiative==null) this.initiative = null
    else this.initiative = 'images/ship_' + initiative + '.jpg'
}

function Dreadnought(race, slotOne, slotTwo, slotThree, slotFour, slotFive, slotSix,
  slotSeven, slotEight, initiative) {
    this.race = race
    this.slotOne = 'images/tech_' + slotOne + '.jpg'
    this.slotTwo = 'images/tech_' + slotTwo + '.jpg'
    this.slotThree = 'images/tech_' + slotThree + '.jpg'
    this.slotFour = 'images/tech_' + slotFour + '.jpg'
    if (slotFive==null) this.slotFive = null
    else this.slotFive = 'images/tech_' + slotFive + '.jpg'
    this.slotSix = 'images/tech_' + slotSix + '.jpg'
    this.slotSeven = 'images/tech_' + slotSeven + '.jpg'
    this.slotEight = 'images/tech_' + slotEight + '.jpg'
}

function Starbase(race, slotOne, slotTwo, slotThree, slotFour, initiative, energy) {
    this.race = race
    this.slotOne = 'images/tech_' + slotOne + '.jpg'
    this.slotTwo = 'images/tech_' + slotTwo + '.jpg'
    this.slotThree = 'images/tech_' + slotThree + '.jpg'
    if (slotFour==null) this.slotFour = null
    else this.slotFour = 'images/tech_' + slotFour + '.jpg'
    this.slotFive = 'images/tech_' + slotFive + '.jpg'
    this.initiative = 'images/ship_' + initiative + '.jpg'
    this.energy = 'images/ship_' + energy + '.jpg'
}
