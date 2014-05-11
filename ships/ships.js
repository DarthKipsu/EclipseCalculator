var jade = require('jade')
var fs = require('fs')

eval(fs.readFileSync('ship-constructors.js') + '')
eval(fs.readFileSync('../race-traits.js') + '')

var raceShips = {
    terran: [],
    eridani: [],
    hydran: [],
    planta: [],
    draco: [],
    mechanema: [],
    orion: []
}

createInterceptors()
createCruisers()
createDreadnoughts()

console.log(raceShips)

function createInterceptors() {
    for (var i=0; i<7; i++) {
        var race = Object.keys(raceTraits)[i]
        var slots = []
        for (var j=0; j<7; j++) {
            slots.push(raceTraits[race].interceptor[j])
        }
        var interceptor = {
            ship: new Interceptor(race, slots[0], slots[1], slots[2], slots[3], slots[4],
            slots[5], slots[6])
        }
        raceShips[race].push(jade.renderFile('interceptor.jade', interceptor))
    }
}

function createCruisers() {
    for (var i=0; i<7; i++) {
        var race = Object.keys(raceTraits)[i]
        var slots = []
        for (var j=0; j<9; j++) {
            slots.push(raceTraits[race].cruiser[j])
        }
        var cruiser = {
            ship: new Cruiser(race, slots[0], slots[1], slots[2], slots[3], slots[4],
            slots[5], slots[6], slots[7], slots[8])
        }
        raceShips[race].push(jade.renderFile('cruiser.jade', cruiser))
    }
}

function createDreadnoughts() {
    for (var i=0; i<7; i++) {
        var race = Object.keys(raceTraits)[i]
        var slots = []
        for (var j=0; j<11; j++) {
            slots.push(raceTraits[race].dreadnought[j])
        }
        var dreadnought = {
            ship: new Dreadnought(race, slots[0], slots[1], slots[2], slots[3], slots[4],
            slots[5], slots[6], slots[7], slots[8], slots[9], slots[10])
        }
        raceShips[race].push(jade.renderFile('dreadnought.jade', dreadnought))
    }
}
