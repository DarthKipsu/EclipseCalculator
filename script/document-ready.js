$(document).ready(function() {
    $('ul.race-selector, .enemy-selector, #enemy-race').hide()

    $('.race-selector span').mouseenter(function() {
        raceSelectorMenu('race') //race-selector.js
    })
    
    $('.enemy-selector span').mouseenter(function() {
        raceSelectorMenu('enemy') //race-selector.js
    })
    
    $('.race-selector span, li.race-selector').click(function() {
        moveRaceSelector()
        choosingARace(this) //race-selector.js
        if ($('.enemy-selector:hidden')) addEnemySelector()
        hideRaceSelectorPopUps()
    })
    
    $('.enemy-selector span, li.enemy-selector').click(function() {
        choosingEnemy(this) //race-selector.js
        hideRaceSelectorPopUps()
    })
})

function addEnemySelector() {
    $('#enemy-race, .enemy-selector').show()
}

function hideRaceSelectorPopUps() {
    $('ul').hide()
    $('.race-selector span, .enemy-selector span').css('border-bottom', '1px solid #DBDBDB')
}
