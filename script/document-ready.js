$(document).ready(function() {
	$('ul.race-selector, .enemy-selector, #enemy-race').hide()

	$('.race-selector span').mouseenter(function() {
		raceSelectorMenu('race') //race-selector.js
	})
	$('.enemy-selector span').mouseenter(function() {
		raceSelectorMenu('enemy') //race-selector.js
	})

	$('.race-selector span, li.race-selector').click(function() {
		choosingARace(this) //race-selector.js
        if ($('.enemy-selector:hidden')) addEnemySelector() //race-selector.js
	})
})
