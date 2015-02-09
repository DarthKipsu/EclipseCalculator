function allShipsAreValid() {
    var invalid = document.querySelectorAll('.invalid')
    if (invalid.length>0) return false
    else return true
}

function bothSideHaveShipsSelected() {
    return initiative.countTheShips('defender').length > 0
}

function showResults() {
    hideResultsWithX()

    var enemy = attackerOrDefender()
    var initiativeOrder = initiative.create(enemy)
    firstRoundWinProbability(initiativeOrder, enemy)
}

function hideResultsWithX() {
    $('#results').on('click', '.close', function() {
        $('#results').hide()
        $('#results').empty()
    })
}

function attackerOrDefender() {
    var inputs = document.getElementsByTagName('input')
    var enemy = inputs[4].checked?'defender':'attacker'
    return enemy
}

var initiative = {
    create: function(enemy) {
        var shipsAttending = initiative.countTheShips(enemy)
        if (shipsAttending.length==0) console.log('no ships selected!')

        var initiativeOrder = []
        while (shipsAttending.length>0) {
            initiative.moveBiggestInitiative(shipsAttending, initiativeOrder)
        }
        return initiativeOrder
    },

    countTheShips: function(enemy) {
        var inputs = document.getElementsByTagName('input')
        var player = inputs[4].checked?'attacker':'defender'
        return initiative.addShipsBasedOnInputs(inputs, player, enemy)
    },

    addShipsBasedOnInputs: function(inputs, player, enemy) {
        var shipsAttending = []
        for (var i=0; i<inputs.length; i++) {
            if (inputs[i].value>0) {
                initiative.addAsManyShipsAsInputValue(inputs, player, enemy, i, shipsAttending)
            }
        }
        return shipsAttending
    },

    addAsManyShipsAsInputValue: function(inputs, player, enemy, i, shipsAttending) {
        for (var j=0; j<inputs[i].value; j++) {
            if (inputs[i].classList[0]=='player') {
                shipsAttending.push([recordTable[chosenRace][inputs[i].name], player])
            } else shipsAttending.push([recordTable[enemyRace][inputs[i].name], enemy])
        }
    },

    moveBiggestInitiative: function(shipsAttending, initiativeOrder) {
        var removeIndex
        var biggestInitiative = shipsAttending.reduce(function (accumulator, ship, index) {
            if (ship[0].initiative > accumulator[0].initiative 
                    || (ship[0].initiative == accumulator[0].initiative 
                    && ship[1] == "defender")) {
                accumulator = ship
                removeIndex = index
            }
            return accumulator
        })

        initiativeOrder.push(biggestInitiative)
        shipsAttending.splice(removeIndex,1)
    }
}

function firstRoundWinProbability(initiativeOrder, enemy) {
    var resultContainer = document.getElementById('results')
    var div = document.createElement('div')
    div.classList.add('close')
    $(div).html('X')
    $(div).appendTo(resultContainer)
    
    var info = document.createElement('div')
    var ships = document.createElement('div')
    $.get("https://eclipse-calculator.herokuapp.com/odds", {
        data: JSON.stringify(initiativeOrder)
    }).done(function(data) {
        $(info).html('<p>Attacker win odds:' + data.attacker + ' %</p>'+
                '<p>Defender  win odds:' + data.defender + ' %</p></br>')
        $(info).appendTo(resultContainer)
        $(ships).append('<p>Alive odds for each ship after three rounds:</p>')
        $(ships).append('<ul>')
        for (var i = 0; i < data['alive-odds'].length; i++) {
            if (initiativeOrder[i][1] == 'attacker') {
                $(ships).append('<li>Attacker ' + initiativeOrder[i][0].type +
                        ': ' + data['alive-odds'][i] + ' %')
            }
        };
        $(ships).append('</ul>')
        $(ships).append('<ul>')
        for (var i = 0; i < data['alive-odds'].length; i++) {
            if (initiativeOrder[i][1] == 'defender') {
                $(ships).append('<li>Defender ' + initiativeOrder[i][0].type +
                        ': ' + data['alive-odds'][i] + ' %')
            }
        };
        $(ships).append('</ul>')
        $(ships).appendTo(resultContainer)
    })
}
