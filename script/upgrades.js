$(document).on('click', '.tech > img', function() {
    var upgradeSrc = this.src
    $('.tech > img').css({'opacity':'1', 'cursor':'default'})
    $(this).css('opacity', '0.6')
    var upgradableShipParts = $('.one, .two, .three, .four, .five, .six, .seven, .eight')
    $(upgradableShipParts).mouseenter(function() {
        $(this).css({'opacity':'0.6', 'cursor':'pointer'})
    })
    $(upgradableShipParts).mouseleave(function() {
        $(this).css({'opacity':'1', 'cursor':'default'})
    })
    $(upgradableShipParts).click(function() {
        $(this).html('')
        var img = document.createElement('img')
        img.src = upgradeSrc
        $(img).appendTo(this)
    })
})
