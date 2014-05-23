function addContentFromHTML(to, from) {
	$(to).load(from)
}

function hideShipPartIcons() {
    addResumeLink()
    resizeShipModels('0.5', '740px')
    stopUpgrades()
    displayInputs()
}

function addResumeLink() {
    $('#upgrades').html('<span>Continue upgrading ships</span>')

    $('#upgrades span').click(function() {
        addContentFromHTML('#upgrades', 'upgrades.html')
        resizeShipModels('1', '1250px')
        hideInputs()
    })
}

function resizeShipModels(zoom, width) {
    $('#player-ship, #enemy-ship').css({
        'transform':'scale(' + zoom + ')',
        '-webkit-transform':'scale(' + zoom + ')',
        'transform-origin':'center top',
        '-webkit-transform-origin':'center top'
    })
    $('.title').css('width', width)
}

function hideInputs() {
    $('#player-input, #enemy-input').hide()
}

function stopUpgrades() {
    var upgradableShipParts = $('.one, .two, .three, .four, .five, .six, .seven, .eight')
    $(upgradableShipParts).unbind()
}

function displayInputs() {
    $('#player-input, #enemy-input').show()
}
