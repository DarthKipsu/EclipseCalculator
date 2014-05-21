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

        upgradeSlot.dice1HPmissile = addAttribute('dice1HPmissile', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.dice2HPmissile = addAttribute('dice2HPmissile', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.dice1HP = addAttribute('dice1HP', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.dice2HP = addAttribute('dice2HP', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.dice4HP = addAttribute('dice4HP', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.computer = addAttribute('computer', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.shield = addAttribute('shield', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.hull = addAttribute('hull', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.initiative = addAttribute('initiative', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.energy = addAttribute('energy', this.classList, upgradeData, upgradeSlot)
        upgradeSlot.speed = addAttribute('speed', this.classList, upgradeData, upgradeSlot)
        upgradeSlot[this.classList[2]] = upgradeData
        console.log(recordTable[this.classList[0]][this.classList[1]])
    })
})

function checkValidity(classList, upgradeData, upgradeSlot) {
    var energy = addAttribute('energy', classList, upgradeData, upgradeSlot)
    if (energy<0) console.log('NOT ENOUGH ENERGY! (' + energy + ')')
    if (classList[1]!='starbase') {
        var speed = addAttribute('speed', classList, upgradeData, upgradeSlot)
        if (speed<1) console.log('NEED ENGINE!')
    }
}

function addAttribute(attribute, classList, upgradeData, upgradeSlot) {
    var currentAttribute = upgradeSlot[attribute]
    if (upgradeAttributes[upgradeSlot[classList[2]]]) {
        var removedUpgrade = upgradeAttributes[upgradeSlot[classList[2]]][attribute]
    } else var removedUpgrade = 0
    var newUpgrade = upgradeAttributes[upgradeData][attribute]
    return currentAttribute - removedUpgrade + newUpgrade
}
