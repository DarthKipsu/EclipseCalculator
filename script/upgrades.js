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
    checkEnergyValidity(classList, upgradeSlot)
    checkSpeedValidity(classList, upgradeSlot)
}

function checkEnergyValidity(classList, upgradeSlot) {
    if (upgradeSlot.energy<0) {
        highlightShip(classList, '#FF3333', true)
        showFlashMessage('Not enough energy! (' + upgradeSlot.energy + ')')
    } else if (classList[1]=='starbase' || upgradeSlot.speed>=1) {
        highlightShip(classList, 'white', false)
    }
}

function checkSpeedValidity(classList, upgradeSlot) {
    if (classList[1]!='starbase' && upgradeSlot.speed<1) {
        highlightShip(classList, '#FF3333', true)
        showFlashMessage('Need engine!')
    } else if (upgradeSlot.energy>=0) {
        highlightShip(classList, 'white', false)
    }
}

function highlightShip(classList, color, addInvalidClass) {
    $('.' + classList[0] + ' .' + classList[1]).css('background', color)
    if (addInvalidClass) $('.' + classList[0] + ' .' + classList[1]).addClass('invalid')
    else $('.' + classList[0] + ' .' + classList[1]).removeClass('invalid')
}

function showFlashMessage(message) {
    var div = createFlashDiv(message)
    slideDownFlash(div)
}

function createFlashDiv(message) {
    var div = document.createElement('div')
    div.className = 'flash'
    document.body.appendChild(div)
    $('.flash').html('<p>' + message + '</p>')
    return div
}

function slideDownFlash(div) {
    $('.flash').slideDown(function() {
        setTimeout(function() {
            slideUpFlash(div)
        }, 600)
    })
}

function slideUpFlash(div) {
    $('.flash').slideUp(150)
    setTimeout(function() {
        document.body.removeChild(div)
    }, 100)
}
