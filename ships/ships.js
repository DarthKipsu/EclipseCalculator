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

createShipHTML('interceptor')
createShipHTML('cruiser')
createShipHTML('dreadnought')
createShipHTML('starbase')

writeShipsToFile('terran')
writeShipsToFile('eridani')
writeShipsToFile('hydran')
writeShipsToFile('planta')
writeShipsToFile('draco')
writeShipsToFile('mechanema')
writeShipsToFile('orion')

function writeShipsToFile(race) {
    fs.writeFile('ship-'+ race + '.html', raceShips[race], function(err) {
       if (err) console.log(err)
       else console.log(race, 'ship models created!')
    })
}

function createShipHTML(shipType) {
    for (var i=0; i<7; i++) {
        var race = Object.keys(raceTraits)[i]
        var slots = []
        var weaponsArray = raceTraits[race][shipType]
        for (var j=0; j<weaponsArray.length; j++) {
            slots.push(weaponsArray[j])
        }
        var shipAttributes
        if (shipType=='interceptor') {
            shipAttributes = {
                ship: new Interceptor(race, slots[0], slots[1], slots[2], slots[3], slots[4],
                slots[5], slots[6])
            }
        }
        else if (shipType=='cruiser') {
            shipAttributes = {
                ship: new Cruiser(race, slots[0], slots[1], slots[2], slots[3], slots[4],
                slots[5], slots[6], slots[7], slots[8])
            }
        }
        else if (shipType=='dreadnought') {
            shipAttributes = {
                ship: new Dreadnought(race, slots[0], slots[1], slots[2], slots[3], slots[4],
                slots[5], slots[6], slots[7], slots[8], slots[9], slots[10])
            }
        }
        else if (shipType=='starbase') {
            shipAttributes = {
                ship: new Starbase(race, slots[0], slots[1], slots[2], slots[3], slots[4],
                slots[5], slots[6], slots[7])
            }
        }
        raceShips[race].push(jade.renderFile(shipType + '.jade', shipAttributes))
    }
}
