describe('race selector', function() {

    beforeEach(function() {
        $('body').empty()
	var raceDiv = document.createElement('div')
	raceDiv.className = 'race-selector'
	var firstRace = document.createElement('span')
	firstRace.className = 'race-selector'
	$(firstRace).attr('data-race', 'terran')
	var ul = document.createElement('ul')
	ul.className = 'race-selector'
	var otherRaces = ['eridani', 'hydran', 'planta', 'draco', 'mechanema', 'orion']
	for (var i=0; i<otherRaces.length; i++) {
	    var li = document.createElement('li')
	    li.className = 'race-selector'
	    $(li).attr('data-race', otherRaces[i])
	    ul.appendChild(li)
	}
        raceDiv.appendChild(firstRace)
	raceDiv.appendChild(ul)
	document.body.appendChild(raceDiv)
    })
	
    it('has 7 races to choose from', function() {
        var dataRaces = document.querySelectorAll('[data-race]')
        expect(dataRaces.length).toBe(7)
    })

    it('replaces the selectors first race with users choise', function() {
	var clickedRace = $('li:nth-child(3)')
        selectChosenRace(clickedRace, 'race')
	var firstRace = $('span.race-selector').attr('data-race')
        var dataRaces = document.querySelectorAll('[data-race]')
	expect(firstRace).toEqual('planta')
        expect(dataRaces.length).toBe(7)
    })
})
