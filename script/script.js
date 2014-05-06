function raceSelector() {
	$('ul.race-selector').slideDown('slow')
	$('.race-selector span').css('border-bottom', 'none')

	$('div.race-selector').mouseleave(function() {
		$('ul.race-selector').slideUp('slow')
		$('.race-selector span').css('border-bottom', '1px solid #DBDBDB')
	})
}

function raceChosen(race) {
	console.log(race)
	$('.race-selector span').css('border-bottom', '1px solid #DBDBDB')
	$('#choose-race, ul.race-selector').hide()
	$('.race-selector span, li.race-selector').unbind('click')
	$('div.race').css('margin-top', '20px')
	$('.race-selector').css('margin', '0')
	
	var chosenRace = $(race).data('race')
	var topRaceOnSelector = $('.race-selector span').attr('data-race')
	console.log(chosenRace, topRaceOnSelector)
	if (chosenRace!=topRaceOnSelector) {
		console.log('replace race')
		var newLi = document.createElement('li')
		$(newLi).addClass('race-selector')
		$(newLi).appendTo('ul.race-selector')
		$(newLi).data('race', topRaceOnSelector)
		$(newLi).text($('.race-selector span').text())
		$('.race-selector span').html($(race).text())
		$('.race-selector span').attr('data-race', chosenRace)
		var oldLi = $('li.race-selector[data-race="' + chosenRace + '"]')
		console.log(oldLi)
		$(oldLi).remove()
	}

	$('.race-selector span, li.race-selector').click(function() {
		raceChosen(this) //script.js
	})
}
