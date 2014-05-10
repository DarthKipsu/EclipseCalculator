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

for (var i=0; i<7; i++) {
    var race = Object.keys(raceTraits)[i]
    var slots = []
    for (var j=0; j<7; j++) {
        slots.push(raceTraits[race].interceptor[j])
    }
    var interceptor = {
        ship: new Interceptor(race, slots[0], slots[1], slots[2], slots[3], slots[4], slots[5],
            slots[6])
    }
    raceShips[race].push(jade.renderFile('interceptor.jade', interceptor))
}

console.log(raceShips)
