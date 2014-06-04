function allShipsAreValid() {
    var invalid = document.querySelectorAll('.invalid')
    if (invalid.length>0) return false
    else return true
}

function showResults() {
    addContentFromHTML('#results', 'results.html')
    hideResultsWithX()

    var enemy = attackerOrDefender()
    var initiativeOrder = createInitiativeOrder(enemy)
    firstRoundWinPropability(initiativeOrder, enemy)
}

function hideResultsWithX() {
    $('#results').on('click', '.close', function() {
        $('#results').hide()
    })
}

function attackerOrDefender() {
    var inputs = document.getElementsByTagName('input')
    var enemy = inputs[4].checked?'defender':'attacker'
    return enemy
}

function createInitiativeOrder(enemy) {
    var shipsAttending = countTheShips(enemy)
    if (shipsAttending.length==0) console.log('no ships selected!')

    var initiativeOrder = []
    while (shipsAttending.length>0) {
        moveTheShipWithBiggestInitiative(shipsAttending, initiativeOrder)
    }
    console.log('init order:', initiativeOrder)
    return initiativeOrder
}

function countTheShips(enemy) {
    var inputs = document.getElementsByTagName('input')
    var player = inputs[4].checked?'attacker':'defender'
    return addShipsBasedOnInputs(inputs, player, enemy)
}

function addShipsBasedOnInputs(inputs, player, enemy) {
    var shipsAttending = []
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].value>0) {
            addAsManyShipsAsInputValue(inputs, player, enemy, i, shipsAttending)
        }
    }
    return shipsAttending
}

function addAsManyShipsAsInputValue(inputs, player, enemy, i, shipsAttending) {
    for (var j=0; j<inputs[i].value; j++) {
        if (inputs[i].classList[0]=='player') {
            shipsAttending.push([recordTable[chosenRace][inputs[i].name], player])
        } else shipsAttending.push([recordTable[enemyRace][inputs[i].name], enemy])
    }
}

function moveTheShipWithBiggestInitiative(shipsAttending, initiativeOrder) {
    var biggestInitiative = [{initiative: -1}]
    var index
    for (i=0; i<shipsAttending.length; i++) {
        if (shipsAttending[i][0].initiative>biggestInitiative[0].initiative) {
            biggestInitiative = shipsAttending[i]
            index = i
        } else if (shipsAttending[i][0].initiative==biggestInitiative[0].initiative &&
                   shipsAttending[i][1]=='defender') {
            biggestInitiative = shipsAttending[i]
            index = i
        }
    }
    initiativeOrder.push(biggestInitiative)
    shipsAttending.splice(index,1)
}

function firstRoundWinPropability(initiativeOrder, enemy) {
    var hitsToWin = 0
    var hitRates = []
    for (var i=0; i<initiativeOrder.length; i++) {
        if (initiativeOrder[i][1] == 'defender') {
            hitsToWin += initiativeOrder[i][0].hull + 1
        } else {
            for (var j=0; j<initiativeOrder[i][0].dice1HP; j++) {
                var shipHitRate = 0
                shipHitRate += ( 1 + initiativeOrder[i][0].computer ) / 6
                console.log(initiativeOrder[i][0].dice1HP, initiativeOrder[i][0].computer)
                hitRates.push(shipHitRate)
            }
        }
    }
    console.log('you need', hitsToWin, 'hits to win')
    console.log('your turret hit rates are', hitRates)
}
