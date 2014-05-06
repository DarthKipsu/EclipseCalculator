$(document).ready(function() {
	$('ul.race-selector').hide()
	$('.race-selector span').mouseenter(function() {
		raceSelector() //script.js
	})

	$('.race-selector span, li.race-selector').click(function() {
		raceChosen(this) //script.js
	})
})
