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
            var target = selectTarget(initiativeOrder, 0)
            recordTable.enemyTerran.interceptor.hull = 3
            console.log(target, target[0].type)
            expect(target[0].hull).toEqual(0)
            expect(target[1]).toBe("attacker")
        })
    })

})

describe('hit probabilities', function() {

    describe('terran interceptor vs terran interceptor', function() {
        
        var initiativeOrder = [[recordTable.terran.interceptor, 'attacker'],
            [recordTable.enemyTerran.interceptor, 'defender']]

        it('will give defending ship 1/6 chance to hit', function() {
            var target = selectTarget(initiativeOrder, 0)
            var weapons = addHitRates(initiativeOrder, 0, target)
            expect(weapons.hitRate).toEqual(1/6)
        })

    })

})
