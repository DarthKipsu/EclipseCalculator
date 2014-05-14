function addContentFromHTML(to, from) {
	$(to).load(from)
}

function hideShipPartIcons() {
	$('#upgrades').html('<span>Continue upgrading ships</span>')
    changeCssForUpgrade('0.5', '-80px auto', '740px')
	$('#upgrades span').click(function() {
		addContentFromHTML('#upgrades', 'upgrades.html')
        changeCssForUpgrade('1', '40px auto', '1250px')
	})
}

function changeCssForUpgrade(zoom, margin, width) {
    $('#player-ship').css('transform', 'scale(' + zoom + ')')
    //$('#player-ship').css('-moz-transform', 'scale(' + zoom + ')')
    $('#player-ship').css('-webkit-transform', 'scale(' + zoom + ')')
    //$('#player-ship').css('margin', margin)
    $('#player-ship').css('transform-origin', 'center top')
    $('#player-ship').css('-webkit-transform-origin', 'center top')
    $('.title').css('width', width)
}
