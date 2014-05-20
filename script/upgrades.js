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
        console.log('upgrade:', upgradeData, 'race:', this.classList[0], 'ship:', this.classList[1], 'slot:', this.classList[2])
        var upgradeSlot = recordTable[this.classList[0]][this.classList[1]]
        checkValidity(this.classList, upgradeData, upgradeSlot)
        $(this).html('')
        var img = document.createElement('img')
        img.src = upgradeSrc
        $(img).appendTo(this)

        upgradeSlot.energy = totalEnergy(this.classList, upgradeData, upgradeSlot)
        upgradeSlot[this.classList[2]] = upgradeData
    })
})

function checkValidity(classList, upgradeData, upgradeSlot) {
    var energy = totalEnergy(classList, upgradeData, upgradeSlot)
    if (energy<0) console.log('NOT ENOUGH ENERGY! (' + energy + ')')
    if (classList[1]!='starbase') {
        var speed = totalSpeed(classList, upgradeData, upgradeSlot)
        if (speed<1) console.log('NEED ENGINE!')
    }
}

function totalEnergy(classList, upgradeData, upgradeSlot) {
    var currentEnergy = upgradeSlot.energy
    if (upgradeAttributes[upgradeSlot[classList[2]]]) {
        var removedUpgradeEnergy = upgradeAttributes[upgradeSlot[classList[2]]].energy
    } else var removedUpgradeEnergy = 0
    var newUpgradeEnergy = upgradeAttributes[upgradeData]['energy']
    return currentEnergy - removedUpgradeEnergy + newUpgradeEnergy
}

function totalSpeed(classList, upgradeData, upgradeSlot) {
    var currentSpeed = upgradeSlot.speed
    if (upgradeAttributes[upgradeSlot[classList[2]]]) {
        var removedSpeed = upgradeAttributes[upgradeSlot[classList[2]]].speed
    } else var removedSpeed = 0
    var newUpgradeSpeed = upgradeAttributes[upgradeData]['speed']
    return currentSpeed - removedSpeed + newUpgradeSpeed
}
