var chosenRace

function raceSelectorMenu() {
	$('ul.race-selector').slideDown('slow')
	$('.race-selector span').css('border-bottom', 'none')

	$('div.race-selector').mouseleave(function() {
		$('ul.race-selector').slideUp('slow')
		$('.race-selector span').css('border-bottom', '1px solid #DBDBDB')
	})
}

function choosingARace(race) {
	moveRaceSelector()
	
	chosenRace = $(race).data('race')
	var topRaceOnSelector = $('.race-selector span').attr('data-race')
	if (chosenRace!=topRaceOnSelector) {
		reorderRaceSelectorRaces(race, chosenRace, topRaceOnSelector)
	}

	$('.race-selector span, li.race-selector').click(function() {
		choosingARace(this)
	})

	if ($('#upgrades').text().length==0) {
		addContentFromHTML('#upgrades', 'upgrades.html') //script.js
	}
	$('#player-ship').html('')
	console.log(chosenRace)
	addContentFromHTML('#player-ship', 'ship-' + chosenRace + '.html')
}

function moveRaceSelector() {
	$('#choose-race, ul.race-selector').hide()
	$('.race-selector span, li.race-selector').unbind('click')
	$('.race-selector span').css('border-bottom', '1px solid #DBDBDB')
	$('div.race').css('margin-top', '20px')
	$('.race-selector').css('margin', '0')
}

function reorderRaceSelectorRaces(race, chosenRace, topRaceOnSelector) {
	var newLi = document.createElement('li')
	$(newLi).addClass('race-selector')
	$(newLi).appendTo('ul.race-selector')
	$(newLi).attr('data-race', topRaceOnSelector)
	$(newLi).text($('.race-selector span').text())
	$('.race-selector span').html($(race).text())
	$('.race-selector span').attr('data-race', chosenRace)
	var oldLi = $('li.race-selector[data-race="' + chosenRace + '"]')
	$(oldLi).remove()
}
