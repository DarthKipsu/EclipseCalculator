$(document).ready(function() {
	$('ul.race-selector').hide()
	$('.race-selector span').mouseenter(function() {
		raceSelectorMenu() //race-selector.js
	})

	$('.race-selector span, li.race-selector').click(function() {
		choosingARace(this) //race-selector.js
	})
})
