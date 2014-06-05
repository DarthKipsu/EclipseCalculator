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
    firstRoundWinProbability(initiativeOrder, enemy)
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

function firstRoundWinProbability(initiativeOrder, enemy) {
    for (var i=0; i<initiativeOrder.length; i++) {

        // target with smallest hull
        var target = null
        for (var j=0; j<initiativeOrder.length; j++) {
            if (initiativeOrder[i][1]!=initiativeOrder[j][1]) {
                if (target==null) target = initiativeOrder[j]
                else if (initiativeOrder[j][0].hull<target[0].hull) target = initiativeOrder[j]
            }
        }
        var targetHitPoints = target[0].hull+1
        console.log('target hit points:', targetHitPoints, '('+ target[0].type +')')
        
        //chance to hit hull with turrets [hitRate, hits] 
        var hitRates = []
        var weapons = ['dice1HP', 'dice2HP', 'dice4HP']
        for (var j=0; j<4; j++) {
            for (var k=0; k<initiativeOrder[i][0][weapons[j]]; k++) {
                var hitRate = 0
                hitRate += ( 1 + initiativeOrder[i][0].computer ) / 6
                var hits = parseInt(weapons[j].substring(5,4))
                hitRates.push([hitRate, hits])
            }
        }
        console.log('hit rates:', hitRates)

        //chance to destroy enemy hull
        var summedHitRates = 0
        for (var j=0; j<hitRates.length; j++) {
            summedHitRates += hitRates[j][0] * hitRates[j][1]
        }
        if (targetHitPoints<=hitRates.length) console.log('propability to destroy target:', summedHitRates/(targetHitPoints))
        else console.log('impossible to destroy target')
        for (var j=0; j<targetHitPoints; j++) {
            if (hitRates.length>=targetHitPoints-j) {
                console.log('probability to get', targetHitPoints-j, 'hit:', summedHitRates/(targetHitPoints-j))
            } else console.log('impossible to get', targetHitPoints-j, 'hits')
        }
        
        //prop to kill all shields = summedHitRates/(target.hull+1)
        //prop to kill some shields = summedHitRates/(target.hull+1-X)
    }

    /*var hitsToWin = 0
    var hitRates = []
    for (var i=0; i<initiativeOrder.length; i++) {
        if (initiativeOrder[i][1] == 'defender') {
            hitsToWin += initiativeOrder[i][0].hull + 1
        } else {
            for (var j=0; j<initiativeOrder[i][0].dice1HP; j++) {
                var shipHitRate = 0
                shipHitRate += ( 1 + initiativeOrder[i][0].computer ) / 6
                hitRates.push(shipHitRate)
            }
        }
    }
    console.log('you need', hitsToWin, 'hits to win')
    console.log('your turret hit rates are', hitRates)*/
}
