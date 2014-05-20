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
    totalEnergy(classList, upgradeData, upgradeSlot)
}

function totalEnergy(classList, upgradeData, upgradeSlot) {
    var currentEnergy = upgradeSlot.energy
    if (upgradeAttributes[upgradeSlot[classList[2]]]) {
        var removedUpgradeEnergy = upgradeAttributes[upgradeSlot[classList[2]]].energy
    } else var removedUpgradeEnergy = 0
    var newUpgradeEnergy = upgradeAttributes[upgradeData]['energy']
    console.log('energy:', currentEnergy, '-', removedUpgradeEnergy, '+', newUpgradeEnergy, '=', currentEnergy - removedUpgradeEnergy + newUpgradeEnergy)
    return currentEnergy - removedUpgradeEnergy + newUpgradeEnergy
}
