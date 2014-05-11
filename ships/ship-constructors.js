function Interceptor(race, slot1, slot2, slot3, slot4, initiative, energy, computer) {
    this.race = race
    if (slot1==null) this.slot1 = null
    else if (slot1!='missing') this.slot1 = 'images/tech_' + slot1 + '.jpg'
    else this.slot1 = 'missing'
    this.slot2 = 'images/tech_' + slot2 + '.jpg'
    this.slot3 = 'images/tech_' + slot3 + '.jpg'
    this.slot4 = 'images/tech_' + slot4 + '.jpg'
    if (initiative!='missing') this.initiative = 'images/ship_' + initiative + '.jpg'
    else this.initiative = 'missing'
    if (energy=='missing') this.energy = 'missing'
    else this.energy = 'images/ship_' + energy + '.jpg'
    if (computer=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + computer + '.jpg'
}

function Cruiser(race, slot1, slot2, slot3, slot4, slot5, slot6, initiative, energy, computer) {
    this.race = race
    this.slot1 = 'images/tech_' + slot1 + '.jpg'
    if (slot2==null) this.slot2 = null
    else if (slot2!='missing') this.slot2 = 'images/tech_' + slot2 + '.jpg'
    else this.slot2 = 'missing'
    this.slot3 = 'images/tech_' + slot3 + '.jpg'
    this.slot4 = 'images/tech_' + slot4 + '.jpg'
    this.slot5 = 'images/tech_' + slot5 + '.jpg'
    this.slot6 = 'images/tech_' + slot6 + '.jpg'
    if (initiative!='missing') this.initiative = 'images/ship_' + initiative + '.jpg'
    else this.initiative = 'missing'
    if (energy=='missing') this.energy = 'missing'
    else this.energy = 'images/ship_' + energy + '.jpg'
    if (computer=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + computer + '.jpg'
}

function Dreadnought(race, slot1, slot2, slot3, slot4, slot5, slot6,
  slot7, slot8, initiative, energy, computer) {
    this.race = race
    this.slot1 = 'images/tech_' + slot1 + '.jpg'
    this.slot2 = 'images/tech_' + slot2 + '.jpg'
    if (slot3==null) this.slot3 = null
    else this.slot3 = 'images/tech_' + slot3 + '.jpg'
    this.slot4 = 'images/tech_' + slot4 + '.jpg'
    if (slot5!='missing') this.slot5 = 'images/tech_' + slot5 + '.jpg'
    else this.slot5 = 'missing'
    this.slot6 = 'images/tech_' + slot6 + '.jpg'
    if (slot7!='missing') this.slot7 = 'images/tech_' + slot7 + '.jpg'
    else this.slot7 = null
    this.slot8 = 'images/tech_' + slot8 + '.jpg'
    if (initiative=='missing') this.initiative = 'missing'
    else this.initiative = 'images/ship_' + initiative + '.jpg'
    if (energy!='missing') this.energy = 'images/ship_' + energy + '.jpg'
    else this.energy = 'missing'
    if (computer=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + computer + '.jpg'
}

function Starbase(race, slot1, slot2, slot3, slot4, initiative, energy, computer) {
    this.race = race
    this.slot1 = 'images/tech_' + slot1 + '.jpg'
    this.slot2 = 'images/tech_' + slot2 + '.jpg'
    this.slot3 = 'images/tech_' + slot3 + '.jpg'
    if (slot4==null) this.slot4 = null
    else this.slot4 = 'missing'
    this.slot5 = 'images/tech_' + slot5 + '.jpg'
    this.initiative = 'images/ship_' + initiative + '.jpg'
    this.energy = 'images/ship_' + energy + '.jpg'
    if (computer=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + computer + '.jpg'
}
