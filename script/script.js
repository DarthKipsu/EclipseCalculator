function raceSelector() {
	$('ul.race-selector').slideDown('slow')

	$('div.race-selector').mouseleave(function() {
		$('ul.race-selector').slideUp('slow')
	})
}
