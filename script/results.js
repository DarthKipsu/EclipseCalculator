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
        var attacker = initiativeOrder[ship]

        // target with smallest hull
        var target = selectTarget(initiativeOrder, attacker)
        var targetHitPoints = target[0].hull+1
        console.log('TARGET hp:', targetHitPoints, '('+ target[0].type +')')
        
        //weapon and hitRate info
        var weapons = addHitRates(attacker, target)

        //chance to destroy enemy hull
        var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
        var targetWeapons = addHitRates(target, attacker)
        if (ship==0) var killProbability = (results.attackerHits(weapons)*100).toPrecision(3)
        else var killProbability = (results.enemyHits(targetWeapons, weapons)*100).toPrecision(3)
        var noHitsProbability = (results.attackerMiss(weapons)*100).toPrecision(3)
        if (ship==0) var gettingKilledProbability = (results.enemyHits(targetWeapons, weapons)*100).toPrecision(3)
        else var gettingKilledProbability = (results.attackerHits(weapons)*100).toPrecision(3)

        console.log('chance to kill enemy on first turn:', killProbability, '%. Chance to get no hits:', noHitsProbability, '%. Chance to get killed:', gettingKilledProbability, '%.')

        //console.log('binomi:', ((binomial(1,1,1/6))*(1-binomial(2,0,1/6))*100).toPrecision(2)+'%')
    }
}

function selectTarget(initiativeOrder, attacker) {
    var attackerSide = attacker[1]
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

function addHitRates(attacker, target) {
    var weapons = {
        hitRate: (1 + attacker[0].computer + target[0].shield) / 6,
        w1HP: attacker[0].dice1HP,
        w2HP: attacker[0].dice2HP,
        w4HP: attacker[0].dice4HP,
    }
    weapons.all = weapons.w1HP + weapons.w2HP + weapons.w4HP
    if (weapons.hitRate<1/6) weapons.hitRate = 1/6
    return weapons
}

function hitOutcomes(attacker, targetHitPoints, weapons) {
    var result = []
    for (var i=0; i<weapons.w1HP+1; i++) {
        var outcome = {
            name: 'w1HP',
            hits: i,
            targetHP: targetHitPoints - i * 1
        }
        result.push(outcome)
    }
    return result
}

var results = {
    attackerHits: function(weapons, hits) {
        var result = binomial(weapons.w1HP, hits, weapons.hitRate)
        return result
    },
    attackerMiss: function(weapons) {
         var result = binomial(weapons.w1HP, 0, weapons.hitRate)
        return result
    },
    enemyHits: function(targetWeapons, weapons, hits) {
        var result = binomial(targetWeapons.w1HP, hits, targetWeapons.hitRate) *
            results.attackerMiss(weapons)
        return result
    },
    /*enemyMiss: function(targetWeapons, weapons) {
        var result = binomial(targetWeapons, 0, targetWeapons.hitRate) *
            results.attackerMiss(weapons)
        return result
    },*/
    kill: function(attacker, target, weapons, targetWeapons) {
        var targetHP = target[0].hull + 1
        if (target[0].hits1HP!=undefined) {
            addKillChanceWithPreviousHits(target, targetHP, weapons)
        }
        if (weapons.w1HP<targetHP) {
            saveHitPoints(target, targetHP, weapons)
            return 0
        }
        else if (attacker[1]=='defender') {
            saveHitPoints(target, targetHP, weapons)
            var killChance = results.attackerHits(weapons, targetHP)
            saveKillChance(target, killChance)
            return target[0].killed
        }
        else {
            var killChance = results.enemyHits(targetWeapons, weapons, attacker[0].hull+1)
            saveKillChance(target, killChance)
            return killChance
        }
    }
}

function addKillChanceWithPreviousHits(target, targetHP, weapons) {
    for (var i=targetHP+1; i>0; i--) {
        if (target[0]['hits'+i+'HP']!=undefined && targetHP-i<=weapons.w1HP) {
            var killChance = results.attackerHits(weapons, targetHP-i) * target[0]['hits'+i+'HP']
            saveKillChance(target, killChance)
        }
    }
}

function saveHitPoints(target, targetHP, weapons) {
    for (var i=1; i<weapons.w1HP+1; i++) {
        if (i<targetHP) {
            if (target[0]['hits'+i+'HP']==undefined) target[0]['hits'+i+'HP'] = 0
            target[0]['hits'+i+'HP'] += results.attackerHits(weapons, i)
        }
    }
}

function saveKillChance(target, killChance) {
    if (target[0].killed==undefined) target[0].killed = 0
    target[0].killed += killChance
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
