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
        var hitRate = (1 + initiativeOrder[ship][0].computer) / 6
        var weapons = ['dice4HP', 'dice2HP', 'dice1HP']
        var weapons1HP = initiativeOrder[ship][0].dice1HP
        var weapons2HP = initiativeOrder[ship][0].dice2HP
        var weapons4HP = initiativeOrder[ship][0].dice4HP
        var allWeapons = weapons1HP + weapons2HP + weapons4HP
        //console.log('hit rates:', hitRates)

        //chance to destroy enemy hull
        for (var weapon=0; weapon<allWeapons; weapon++) {
            var hitProbability = calculateHitChance(weapon+1, allWeapons, hitRate)
            console.log('probability to get', weapon+1, 'hits:', hitProbability.toPrecision(2))

            if (weapon==allWeapons-1) {
                if (targetHitPoints>allWeapons) {
                    console.log('no chance of destroying the enemy')
                } else {
                    var destroyChance = calculateDestoryChance(allWeapons, hitRate, weapon, targetHitPoints, weapons1HP, weapons2HP, weapons4HP, hitProbability)
                    console.log(destroyChance.toPrecision(2), 'chance of destroying the enemy')
                }
            }
        }

        //initiativeOrder[targetIndex].push({hitRates: hitRates, summedHitRates: summedHitRates})
    }
}

function calculateHitChance(weapon, allWeapons, hitRate) {
    var hitProbability
    if (weapon==1) hitProbability = allWeapons*hitRate
    else if (weapon==allWeapons) hitProbability = Math.pow(hitRate, weapon)
    else if ((weapon==2 && allWeapons==3) || (weapon==3 && allWeapons==4) || (weapon==4 &&
        allWeapons==5)) hitProbability = allWeapons*Math.pow(hitRate, weapon)
    else if (weapon==2 && allWeapons==6) hitProbability = 6*Math.pow(hitRate, weapon)
    else if (((weapon==2 || weapon==3) && allWeapons==5) || (weapon==4 && allWeapons==6))
        hitProbability = 10*Math.pow(hitRate, weapon)
    else if (weapon==2 && allWeapons==6) hitProbability = 15*Math.pow(hitRate, weapon)
    else if (weapon==3 && allWeapons==6) hitProbability = 20*Math.pow(hitRate, weapon)
    else if (weapon==5 && allWeapons==6) hitProbability = 5*Math.pow(hitRate, weapon)
    return hitProbability
}

function calculateDestoryChance(allWeapons, hitRate, weapon, targetHitPoints, weapons1HP, weapons2HP, weapons4HP, hitProbability) {
    var destroyChance = 0
    if (targetHitPoints==1) destroyChance = allWeapons*hitRate
    else if (targetHitPoints==allWeapons) destroyChance = hitProbability
    else if (targetHitPoints==2) {
        if (weapons2HP<=1 || weapons4HP<=1) destroyChance = weapons2HP*hitRate +
          weapons4HP*hitRate + Math.floor(weapons1HP/2)*Math.pow(hitRate,2)
        else destroyChance = Math.floor(weapons1HP/2)*Math.pow(hitRate,2)
    }
    return destroyChance
}
