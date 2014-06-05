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
    for (var ship=0; ship<initiativeOrder.length; ship++) {
        console.log('ATTACKER:', initiativeOrder[ship][0].type, initiativeOrder[ship][1])

        // target with smallest hull
        var target = null
        var targetIndex
        for (var j=0; j<initiativeOrder.length; j++) {
            if (initiativeOrder[ship][1]!=initiativeOrder[j][1]) {
                if (target==null) {
                    target = initiativeOrder[j]
                    targetIndex = j
                } else if (initiativeOrder[j][0].hull<target[0].hull) {
                    target = initiativeOrder[j]
                    targetIndex = j
                }
            }
        }
        var targetHitPoints = target[0].hull+1
        console.log('TARGET hp:', targetHitPoints, '('+ target[0].type +')')
        
        //chance to hit hull with turrets [hitRate, hits] 
        var hitRates = []
        var weapons = ['dice4HP', 'dice2HP', 'dice1HP']
        var weapons1HP = initiativeOrder[ship][0].dice1HP
        var weapons2HP = initiativeOrder[ship][0].dice2HP
        var weapons4HP = initiativeOrder[ship][0].dice4HP
        for (var j=0; j<4; j++) {
            for (var k=0; k<initiativeOrder[ship][0][weapons[j]]; k++) {
                var hitRate = 0
                hitRate += ( 1 + initiativeOrder[ship][0].computer ) / 6
                var hits = parseInt(weapons[j].substring(5,4))
                hitRates.push([hitRate, hits])
            }
        }
        //console.log('hit rates:', hitRates)

        //chance to destroy enemy hull
        for (var weapon=0; weapon<hitRates.length; weapon++) {
            var hitProbability = 0
            for (var j=0; j<hitRates.length-weapon; j++) {
                hitProbability += hitRates[j][0]
            }
            console.log('probability to get', weapon+1, 'hits:', hitProbability.toPrecision(2))
            if (weapon==hitRates.length-1) {
                var allWeapons = weapons1HP + weapons2HP + weapons4HP
                if (targetHitPoints>allWeapons) {
                    console.log('no chance of destroying the enemy')
                } else {
                    var destroyChance = 0
                    if (targetHitPoints==1) destroyChance = allWeapons*hitRates[weapon][0]
                    else if (targetHitPoints==allWeapons) destroyChance = hitProbability
                    console.log(destroyChance.toPrecision(2), 'chance of destroying the enemy')
                }
            }
        }

        //initiativeOrder[targetIndex].push({hitRates: hitRates, summedHitRates: summedHitRates})
    }
}
