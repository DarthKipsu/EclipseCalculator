var jade = require('jade')
var fs = require('fs')

eval(fs.readFileSync('ship-constructors.js') + '')
eval(fs.readFileSync('race-traits.js') + '')

var raceShips = {
    terran: [],
    enemyTerran: [],
    eridani: [],
    hydran: [],
    planta: [],
    draco: [],
    mechanema: [],
    orion: []
}

var shipNames = ['interceptor', 'cruiser', 'dreadnought', 'starbase']
var raceNames = ['terran', 'enemyTerran', 'eridani', 'hydran', 'planta', 'draco', 'mechanema', 'orion']

for (var i=0; i<shipNames.length; i++) {
    createShipHTML(shipNames[i])
}

for (var i=0; i<raceNames.length; i++) {
    writeShipsToFile(raceNames[i])
}

function writeShipsToFile(race) {
    fs.writeFile('../ship-'+ race + '.html', raceShips[race].join(''), function(err) {
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
        if (shipType=='interceptor') shipAttributes = {
            ship: new Interceptor(race, slots)
        }
        else if (shipType=='cruiser') shipAttributes = {
            ship: new Cruiser(race, slots)
        }
        else if (shipType=='dreadnought') shipAttributes = {
            ship: new Dreadnought(race, slots)
        }
        else if (shipType=='starbase') shipAttributes = {
            ship: new Starbase(race, slots)
        }
        raceShips[race].push(jade.renderFile(shipType + '.jade', shipAttributes))
    }
}
