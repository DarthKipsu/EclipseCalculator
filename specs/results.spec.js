describe('adding ships in initiative order', function() {

    var inputs

    beforeEach(function() {
        inputs = [{value: 2, name: 'interceptor', classList: ['player']},
            {value: 2, name: 'cruiser', classList: ['player']},
            {value: 0, name: 'dreadnought', classList: ['player']},
            {value: 0, name: 'starbase', classList: ['player']},
            {checked: true},
            {value: 1, name: 'interceptor', classList: ['enemy']},
            {value: 3, name: 'cruiser', classList: ['enemy']},
            {value: 1, name: 'dreadnought', classList: ['enemy']},
            {value: 1, name: 'starbase', classList: ['enemy']}]
    })

    it('adds the right ship types in game', function() {
        var shipsAttending = initiative.addShipsBasedOnInputs(inputs, 'attacker', 'defender')
        expect(shipsAttending.length).toBe(10)
        expect(shipsAttending[0]).toEqual(shipsAttending[1])
        expect(shipsAttending[0]).not.toEqual(shipsAttending[2])
    })

    it('adds enemyTerran defending interceptors before terran players attacking ones', function() {
        chosenRace = 'terran'
        enemyRace = 'enemyTerran'
        var shipsAttending = initiative.addShipsBasedOnInputs(inputs, 'attacker', 'defender')
        var initiativeOrder = []
        while (shipsAttending.length>0) {
            initiative.moveBiggestInitiative(shipsAttending, initiativeOrder)
        }
        expect(initiativeOrder[1][0].type).toBe('interceptor')
        expect(initiativeOrder[1][1]).toBe('defender')
        expect(initiativeOrder[2][0].type).toBe('interceptor')
        expect(initiativeOrder[2][1]).toBe('attacker')
    })

    it('adds planta starbase only after attacking terran interceptors', function() {
        chosenRace = 'terran'
        enemyRace = 'planta'
        var shipsAttending = initiative.addShipsBasedOnInputs(inputs, 'attacker', 'defender')
        var initiativeOrder = []
        while (shipsAttending.length>0) {
            initiative.moveBiggestInitiative(shipsAttending, initiativeOrder)
        }
        expect(initiativeOrder[1][0].type).toBe('interceptor')
        expect(initiativeOrder[1][1]).toBe('attacker')
        expect(initiativeOrder[2][0].type).toBe('starbase')
        expect(initiativeOrder[2][1]).toBe('defender')
    })

    describe('target selection', function() {

        function setInitiativeOrder(chosen, enemy) {
            chosenRace = chosen
            enemyRace = enemy
            var shipsAttending = initiative.addShipsBasedOnInputs(inputs, 'attacker', 'defender')
            var initiativeOrder = []
            while (shipsAttending.length>0) {
                initiative.moveBiggestInitiative(shipsAttending, initiativeOrder)
            }
            return initiativeOrder
        }

        it('selects target with smallest hitpoints', function() {
            var initiativeOrder = setInitiativeOrder('terran', 'enemyTerran')
            var target = selectTarget(initiativeOrder, initiativeOrder[0])
            expect(target[0].hull).toEqual(0)
            expect(target[1]).toBe("attacker")
        })
    })

})

describe('hit probabilities', function() {

    describe('defending enemyTerran interceptor vs attacking terran interceptor', function() {
        
        var initiativeOrder = [[recordTable.terran.interceptor, 'attacker'],
            [recordTable.enemyTerran.interceptor, 'defender']]
        var attacker = initiativeOrder[1]
        var target = selectTarget(initiativeOrder, attacker)
        var targetHitPoints = target[0].hull + 1
        var weapons = addHitRates(attacker, target)

        it('will hit terran interceptor', function() {
            expect(target[0].type).toEqual('interceptor')
        })

        it('will have 1/6 chance to hit', function() {
            var weapons = addHitRates(attacker, target)
            expect(weapons.hitRate).toEqual(1/6)
        })

        it('gets zero hits with 4HP weapons', function() {
            var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
            var w4HPhits = preservedHP.every(function(n) {
                return n.name != 'w4HP'
            })
            expect(w4HPhits).toBe(true)
        })

        it('gets zero hits with 2HP weapons', function() {
            var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
            var w2HPhits = preservedHP.every(function(n) {
                return n.name != 'w2HP'
            })
            expect(w2HPhits).toBe(true)
        })

        it('gets one or no hits with 1HP weapons', function() {
            var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
            var w1HPhits = preservedHP.filter(function(n) {
                return n.name == 'w1HP'
            })
            expect(w1HPhits.length).toBe(2)
        })

        it('will remove 1 hp with a hit and 0 with a miss', function() {
            var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
            expect(preservedHP[0].hits).toBe(0)
            expect(preservedHP[0].targetHP).toBe(targetHitPoints)
            expect(preservedHP[1].hits).toBe(1)
            expect(preservedHP[1].targetHP).toBe(0)
        })

        it('will have 1/6 chance of destroying enemy on first turn', function() {
            var killProbability = results.kill(attacker, target, weapons)
            expect((killProbability*100).toPrecision(3)).toEqual('16.7')
        })

        it('has 5/6 chance of inflicting no damage', function() {
            var noHitsProbability = results.attackerMiss(weapons)
            expect((noHitsProbability*100).toPrecision(3)).toEqual('83.3')
        })

        it('has 5/36 chance of getting killed by the enemy on first turn', function() {
            var targetWeapons = addHitRates(target, attacker)
            var gettingKilledProbability = results.enemyHits(targetWeapons, weapons, targetHitPoints)
            expect((gettingKilledProbability*100).toPrecision(3)).toEqual('13.9')
        })

    })

    describe('defending orion cru % dread vs attacking enemyTerran cru & dread', function() {
        
        var initiativeOrder = [[recordTable.orion.cruiser, 'defender'],
            [recordTable.orion.dreadnought, 'defender'],
            [recordTable.enemyTerran.cruiser, 'attacker'],
            [recordTable.enemyTerran.dreadnought, 'attacker']]

        var orionCru = initiativeOrder[0]
        var orionDre = initiativeOrder[1]
        var terranCru = initiativeOrder[2]
        var terranDre = initiativeOrder[3]

        var orionTarget = selectTarget(initiativeOrder, orionCru)
        var orionTargetHP = orionTarget[0].hull + 1
        var terranTarget = selectTarget(initiativeOrder, terranCru)
        var terranTargetHP = terranTarget[0].hull + 1

        var orionCruWeapons = addHitRates(orionCru, orionTarget)
        var orionDreWeapons = addHitRates(orionDre, orionTarget)
        var terranCruWeapons = addHitRates(terranCru, terranTarget)
        var terranDreWeapons = addHitRates(terranDre, terranTarget)

        it('orion ships have 1/3 hit rate, terran only 1/6', function() {
            expect(orionCruWeapons.hitRate).toEqual(1/3)
            expect(terranCruWeapons.hitRate).toEqual(1/6)
        })

        it('gives orion cruiser 0% chance of killing target on first turn', function() {
            var killProbability = results.kill(orionCru, orionTarget, orionCruWeapons)
            expect((killProbability*100).toPrecision(3)).toEqual('0.00')
        })

        it('gives orion dreadnought 11,1% chance of killing target on it\'s own', function() {
            var killProbability = results.kill(orionDre, orionTarget, orionDreWeapons)
            expect((killProbability*100).toPrecision(3)).toEqual('11.1')
        })

        it('saves orion cruisers 33,3% change of getting one hit to terran cruiser', function() {
            expect((orionTarget[0].hits1HP*100).toPrecision(3)).toEqual('33.3')
        })

    })

})
