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
})
