function addUpgradeIcons() {
	$('#upgrades').load('upgrades.html')
}

function hideShipPartIcons() {
	$('#upgrades').html('<span>show ship part icons</span>')
	$('#upgrades span').click(function() {
		addUpgradeIcons()
	})
}
