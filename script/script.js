function addContentFromHTML(to, from) {
	$(to).load(from)
}

function hideShipPartIcons() {
    addResumeLink()
    changeCssForUpgrade('0.5', '740px')
    $('#upgrades span').click(function() {
        addContentFromHTML('#upgrades', 'upgrades.html')
        changeCssForUpgrade('1', '1250px')
    })
}

function changeCssForUpgrade(zoom, width) {
    var target = $('#player-ship, #enemy-ship')
    $(target).css('transform', 'scale(' + zoom + ')')
    $(target).css('-webkit-transform', 'scale(' + zoom + ')')
    $(target).css('transform-origin', 'center top')
    $(target).css('-webkit-transform-origin', 'center top')
    $('.title').css('width', width)
}

function addResumeLink() {
    $('#upgrades').html('<span>Continue upgrading ships</span>')
}
