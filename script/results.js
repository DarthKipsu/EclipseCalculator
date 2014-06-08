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
        
        //weapon and hitRate info
        var weapons = {
            hitRate: (1 + initiativeOrder[ship][0].computer + target[0].shield) / 6,
            w1HP: initiativeOrder[ship][0].dice1HP,
            w2HP: initiativeOrder[ship][0].dice2HP,
            w4HP: initiativeOrder[ship][0].dice4HP,
        }
        weapons.all = weapons.w1HP + weapons.w2HP + weapons.w4HP
        console.log(weapons)
        if (weapons.hitRate<1/6) weapons.hitRate = 1/6

        //chance to destroy enemy hull
        console.log('binomi:', ((binomial(1,1,1/6))*(1-binomial(2,0,1/6))*100).toPrecision(2)+'%')

        var targetHP = target[0].hull + 1
        var savedHits = {
            w1HP: [],
            w2HP: [],
            w4HP: []
        }

        if (weapons.w4HP>0) countHitProbabilities(targetHP, 4, 'w4HP', savedHits, weapons)
        if (weapons.w2HP>0) {
            countHitProbabilities(targetHP, 2, 'w2HP', savedHits, weapons)
        }
        if (weapons.w1HP>0) countHitProbabilities(targetHP, 1, 'w1HP', savedHits, weapons)
        console.log('weapon HP', savedHits)

    }
}

function countHitProbabilities(targetHP, weaponHP, name, savedHits, weapons) {
        var loopHP = targetHP

        for (i=0; loopHP>=0; i++) {
            if (weapons[name] >= i) savedHits[name].push([i, targetHP - i * weaponHP, name])
            loopHP -= i * weaponHP
        }
}

function binomial(weapons, hp, hitRate) {
    return nCr(weapons, hp)*Math.pow(hitRate, hp)*Math.pow(1-hitRate, weapons-hp)
}

function nCr(weapons, hp) {
    return factional(weapons) / (factional(hp) * factional(weapons-hp))
}

function factional(number) {
    if (number<0) return -1
    else if (number==0) return 1
    else return (number * factional(number-1))
}
