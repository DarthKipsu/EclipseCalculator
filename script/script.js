function addContentFromHTML(to, from) {
	$(to).load(from)
}

function hideShipPartIcons() {
	$('#upgrades').html('<span>show ship part icons</span>')
	$('#upgrades span').click(function() {
		addContentFromHTML('#upgrades', 'upgrades.html')
	})
}
