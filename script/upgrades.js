$(document).on('click', '.tech > img', function() {
    var upgradeSrc = this.src
    var upgradeData = $(this).attr('data-name')
    $('.tech > img').css('opacity', '1')
    $(this).css('opacity', '0.6')

    var upgradableShipParts = $('.one, .two, .three, .four, .five, .six, .seven, .eight')

    $(upgradableShipParts).unbind()

    $(upgradableShipParts).mouseenter(function() {
        $(this).css({'opacity':'0.6', 'cursor':'pointer'})
    })
    $(upgradableShipParts).mouseleave(function() {
        $(this).css({'opacity':'1', 'cursor':'default'})
    })

    $(upgradableShipParts).click(function() {
        console.log(upgradeData, this.classList[0], this.classList[1])
        checkValidity(this.classList, upgradeData)
        $(this).html('')
        var img = document.createElement('img')
        img.src = upgradeSrc
        $(img).appendTo(this)

        var upgradeSlot = recordTable[this.classList[0]][this.classList[1]][this.classList[2]]
        upgradeSlot = upgradeData
        console.log(upgradeSlot)
    })
})

function checkValidity(classList, upgradeData) {
    var upgradedShip = recordTable[classList[0]][classList[1]]
    var energy = upgradedShip.energy + upgradeAttributes[upgradeData]['energy']
    totalEnergy(classList, upgradeData, upgradedShip)
    console.log('energy:', energy)
}

function totalEnergy(classList, upgradeData, upgradedShip) {
    for (var i=0; i<upgradedShip.length; i++) {
    }
    console.log('spgraded ship', upgradedShip)
}
