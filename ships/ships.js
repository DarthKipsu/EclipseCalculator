var jade = require('jade')
var fs = require('fs')

eval(fs.readFileSync('ship-constructors.js') + '')

var interceptorWeapons = [, 'ion-cannon', 'nuclear-source', 'nuclear-drive']
var interceptor = {
    ship: new Interceptor('terran', interceptorWeapons, 'u2')
}

var output = {
    ship: {
        name: 'Verna',
        age: 29
    }
}
var template = jade.renderFile('interceptor.jade', interceptor)
console.log(template)
