function Interceptor(race, slot) {
    this.race = race
    if (slot[0]==null) this.slot1 = null
    else if (slot[0]!='missing') this.slot1 = 'images/tech_' + slot[0] + '.jpg'
    else this.slot1 = 'missing'
    this.slot2 = 'images/tech_' + slot[1] + '.jpg'
    this.slot3 = 'images/tech_' + slot[2] + '.jpg'
    this.slot4 = 'images/tech_' + slot[3] + '.jpg'
    if (slot[4]!='missing') this.initiative = 'images/ship_' + slot[4] + '.jpg'
    else this.initiative = 'missing'
    if (slot[5]=='missing') this.energy = 'missing'
    else this.energy = 'images/ship_' + slot[5] + '.jpg'
    if (slot[6]=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + slot[6] + '.jpg'
}

function Cruiser(race, slot) {
    this.race = race
    this.slot1 = 'images/tech_' + slot[0] + '.jpg'
    if (slot[1]==null) this.slot2 = null
    else if (slot[1]!='missing') this.slot2 = 'images/tech_' + slot[1] + '.jpg'
    else this.slot2 = 'missing'
    this.slot3 = 'images/tech_' + slot[2] + '.jpg'
    this.slot4 = 'images/tech_' + slot[3] + '.jpg'
    this.slot5 = 'images/tech_' + slot[4] + '.jpg'
    this.slot6 = 'images/tech_' + slot[5] + '.jpg'
    if (slot[6]!='missing') this.initiative = 'images/ship_' + slot[6] + '.jpg'
    else this.initiative = 'missing'
    if (slot[7]=='missing') this.energy = 'missing'
    else this.energy = 'images/ship_' + slot[7] + '.jpg'
    if (slot[8]=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + slot[8] + '.jpg'
}

function Dreadnought(race, slot) {
    this.race = race
    this.slot1 = 'images/tech_' + slot[0] + '.jpg'
    this.slot2 = 'images/tech_' + slot[1] + '.jpg'
    if (slot[2]==null) this.slot3 = null
    else this.slot3 = 'images/tech_' + slot[2] + '.jpg'
    this.slot4 = 'images/tech_' + slot[3] + '.jpg'
    if (slot[4]!='missing') this.slot5 = 'images/tech_' + slot[4] + '.jpg'
    else this.slot5 = 'missing'
    this.slot6 = 'images/tech_' + slot[5] + '.jpg'
    if (slot[6]!='missing') this.slot7 = 'images/tech_' + slot[6] + '.jpg'
    else this.slot7 = null
    this.slot8 = 'images/tech_' + slot[7] + '.jpg'
    if (slot[8]=='missing') this.initiative = 'missing'
    else this.initiative = 'images/ship_' + slot[8] + '.jpg'
    if (slot[9]!='missing') this.energy = 'images/ship_' + slot[9] + '.jpg'
    else this.energy = 'missing'
    if (slot[10]=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + slot[10] + '.jpg'
}

function Starbase(race, slot) {
    this.race = race
    this.slot1 = 'images/tech_' + slot[0] + '.jpg'
    this.slot2 = 'images/tech_' + slot[1] + '.jpg'
    this.slot3 = 'images/tech_' + slot[2] + '.jpg'
    if (slot[3]==null) this.slot4 = null
    else this.slot4 = 'missing'
    this.slot5 = 'images/tech_' + slot[4] + '.jpg'
    this.initiative = 'images/ship_' + slot[5] + '.jpg'
    this.energy = 'images/ship_' + slot[6] + '.jpg'
    if (slot[7]=='missing') this.computer = 'missing'
    else this.computer = 'images/ship_' + slot[7] + '.jpg'
}
