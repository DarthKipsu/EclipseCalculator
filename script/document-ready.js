$(document).ready(function() {
	$('ul.race-selector').hide()
	$('.race-selector span').mouseenter(function() {
		raceSelectorMenu() //script.js
	})

	$('.race-selector span, li.race-selector').click(function() {
		choosingARace(this) //script.js
	})
})
