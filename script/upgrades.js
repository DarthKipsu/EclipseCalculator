$(document).on('click', '.tech > img', function() {
    var upgradeSrc = this.src
    var upgradeName = $(this).attr('data-name')
    var upgradableShipParts = $('.one, .two, .three, .four, .five, .six, .seven, .eight')

    updateHoverEffect(this, upgradableShipParts)

    $(upgradableShipParts).click(function() {
        upgradeOldPart(this, upgradeSrc, upgradeName)
    })
})

function updateHoverEffect(selection, upgradableShipParts) {
    $('.tech > img').css('opacity', '1')
    $(selection).css('opacity', '0.6')

    $(upgradableShipParts).unbind()
    $(upgradableShipParts).mouseenter(function() {
        $(this).css({'opacity':'0.6', 'cursor':'pointer'})
    })
    $(upgradableShipParts).mouseleave(function() {
        $(this).css({'opacity':'1', 'cursor':'default'})
    })
}

function upgradeOldPart(selection, upgradeSrc, upgradeName) {
    var upgradeSlot = recordTable[selection.classList[0]][selection.classList[1]]

    replaceImage(selection, upgradeSrc)
    updateShipAttributes(selection, upgradeName, upgradeSlot)
    replaceUpgradeName(upgradeSlot, selection.classList, upgradeName)

    checkValidity(selection.classList, upgradeSlot)
    console.log('ship:', recordTable[selection.classList[0]][selection.classList[1]])

}

function replaceImage(selection, upgradeSrc) {
    $(selection).html('')
    var img = document.createElement('img')
    img.src = upgradeSrc
    $(img).appendTo(selection)
}

function updateShipAttributes(selection, upgradeName, upgradeSlot) {
    var attr = ['dice1HPmissile', 'dice2HPmissile', 'dice1HP', 'dice2HP', 'dice4HP',
        'computer', 'shield', 'hull', 'initiative', 'energy', 'speed']

    for (var i=0; i<attr.length; i++) {
        upgradeSlot[attr[i]] = addAttribute(attr[i], selection.classList, upgradeName, upgradeSlot)
    }
}

function addAttribute(attribute, classList, upgradeName, upgradeSlot) {
    var currentAttribute = upgradeSlot[attribute]
    var removedUpgrade = getRemovedAttribute(attribute, classList, upgradeSlot)
    var newUpgrade = upgradeAttributes[upgradeName][attribute]
    return currentAttribute - removedUpgrade + newUpgrade
}

function getRemovedAttribute(attribute, classList, upgradeSlot) {
    if (upgradeAttributes[upgradeSlot[classList[2]]]) {
        return upgradeAttributes[upgradeSlot[classList[2]]][attribute]
    } else return 0
}

function replaceUpgradeName(upgradeSlot, classList, upgradeName) {
    upgradeSlot[classList[2]] = upgradeName
}

function checkValidity(classList, upgradeSlot) {
    if (upgradeSlot.energy<0) console.log('NOT ENOUGH ENERGY! (' + upgradeSlot.energy + ')')
    if (classList[1]!='starbase') {
        if (upgradeSlot.speed<1) console.log('NEED ENGINE!')
    }
}
