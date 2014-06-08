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
            recordTable.enemyTerran.interceptor.hull = 3
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

        it('will have 1/6 chance of destroying enemy', function() {
            var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
            var killProbability = countKillChance(preservedHP, weapons)
            expect(killProbability.toPrecision(3)).toEqual('16.7')
        })

        it('has 5/6 chance of inflicting no damage', function() {
            var preservedHP = hitOutcomes(attacker, targetHitPoints, weapons)
            var noHitsProbability = countMissChance(preservedHP, weapons, targetHitPoints)
            expect(noHitsProbability.toPrecision(3)).toEqual('83.3')
        })

    })

})
