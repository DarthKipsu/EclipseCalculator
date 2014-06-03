describe('adding ships in initiative order', function() {

    it('adds the right ship types in game', function() {
        var inputs = [{value: 2, name: 'interceptor', classList: ['player']},
            {value: 1, name: 'interceptor', classList: ['enemy']}]
        var player = 'attacker'
        var enemy = 'defender'
        var shipsAttending = addShipsBasedOnInputs(inputs, player, enemy)
        expect(shipsAttending.length).toBe(3)
        expect(shipsAttending[0]).toEqual(shipsAttending[1])
        expect(shipsAttending[0]).not.toEqual(shipsAttending[2])
    })

})
