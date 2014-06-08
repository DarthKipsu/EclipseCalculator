function allShipsAreValid() {
    var invalid = document.querySelectorAll('.invalid')
    if (invalid.length>0) return false
    else return true
}

function showResults() {
    addContentFromHTML('#results', 'results.html')
    hideResultsWithX()

    var enemy = attackerOrDefender()
    var initiativeOrder = initiative.create(enemy)
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

var initiative = {
    create: function(enemy) {
        var shipsAttending = initiative.countTheShips(enemy)
        if (shipsAttending.length==0) console.log('no ships selected!')

        var initiativeOrder = []
        while (shipsAttending.length>0) {
            initiative.moveBiggestInitiative(shipsAttending, initiativeOrder)
        }
        console.log('init order:', initiativeOrder)
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
    console.log(initiativeOrder, enemy)
    for (var ship=0; ship<initiativeOrder.length; ship++) {
        console.log('ATTACKER:', initiativeOrder[ship][0].type, initiativeOrder[ship][1])

        // target with smallest hull
        var target = selectTarget(initiativeOrder, ship)
        var targetHitPoints = target[0].hull+1
        console.log('TARGET hp:', targetHitPoints, '('+ target[0].type +')')
        
        //weapon and hitRate info
        var weapons = addHitRates(initiativeOrder, ship, target)

        //chance to destroy enemy hull
        console.log('binomi:', ((binomial(1,1,1/6))*(1-binomial(2,0,1/6))*100).toPrecision(2)+'%')

        var targetHP = target[0].hull + 1
        var savedHits = {
            w1HP: [],
            w2HP: [],
            w4HP: []
        }
        var savedHitsValues = [[4, 'w4HP'],[2, 'w2HP'],[1, 'w1HP']]

        /*for (var j=0; j<savedHitsValues.length; j++) {
            console.log('start', savedHits)
            countHitProbabilities(targetHP, savedHitsValues[j][0], savedHitsValues[j][1],
                savedHits, weapons)
            console.log(savedHits, 'round', j, targetHP, savedHitsValues[j][0], savedHitsValues[j][1], savedHits, weapons)
            if (savedHitsValues[j][1]=='w2HP' && savedHits.w4HP.length>1) {
                for (var k=1; k<savedHits.w4HP.length; k++) {
                    countHitProbabilities(savedHits.w4HP[k][1], savedHitsValues[j][0],
                        'w2HP', savedHits, weapons)
                }
            } else if (savedHitsValues[j][1]=='w1HP') {
                if (savedHits.w4HP.length>1) {
                    console.log(savedHits.w4HP[1][1])

                    for (var k=1; k<savedHits.w4HP.length; k++) {
                        countHitProbabilities(savedHits.w4HP[k][1], savedHitsValues[j][0],
                            'w4HP', savedHits, weapons)
                    }
                } 
                if (savedHits.w2HP.length>1) {
                    console.log(savedHits.w2HP)
                    for (var k=1; k<savedHits.w2HP.length; k++) {
                        countHitProbabilities(savedHits.w2HP[k][1], savedHitsValues[j][0],
                            'w2HP', savedHits, weapons)
                    }
                }

            }
        }

        if (weapons.w4HP>0) countHitProbabilities(targetHP, 4, 'w4HP', savedHits, weapons)
        if (weapons.w2HP>0) {
            countHitProbabilities(targetHP, 2, 'w2HP', savedHits, weapons)
        }
        if (weapons.w1HP>0) countHitProbabilities(targetHP, 1, 'w1HP', savedHits, weapons)*/
        //console.log('weapon HP', savedHits)

    }
}

function selectTarget(initiativeOrder, attacker) {
    var attackerSide = initiativeOrder[attacker][1]
    var targets = initiativeOrder.filter(function (ship) {
        return ship[1] != attackerSide
    })
    return targets.reduce(function(accumulator, ship) {
        if (ship[0].hull<accumulator[0].hull) {
            accumulator = ship
        }
        return accumulator
    })
}

function addHitRates(initiativeOrder, ship, target) {
    var weapons = {
        hitRate: (1 + initiativeOrder[ship][0].computer + target[0].shield) / 6,
        w1HP: initiativeOrder[ship][0].dice1HP,
        w2HP: initiativeOrder[ship][0].dice2HP,
        w4HP: initiativeOrder[ship][0].dice4HP,
    }
    weapons.all = weapons.w1HP + weapons.w2HP + weapons.w4HP
    if (weapons.hitRate<1/6) weapons.hitRate = 1/6
    return weapons
}

function countHitProbabilities(targetHP, weaponHP, name, savedHits, weapons) {
        console.log('first', name, savedHits)
        var loopHP = targetHP

        for (i=0; loopHP>=0; i++) {
            if (weapons[name] >= i) savedHits[name].push([i, targetHP - i * weaponHP, name])
            loopHP -= i * weaponHP
        }
        console.log('second', name, savedHits)
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
