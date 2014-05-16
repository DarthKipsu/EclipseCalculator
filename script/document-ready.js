$(document).ready(function() {
    $('ul.race-selector, .enemy-selector, #enemy-race').hide()

    $('.race-selector span').mouseenter(function() {
        openRaceSelectorMenu('race') //race-selector.js
    })
    
    $('.enemy-selector span').mouseenter(function() {
        openRaceSelectorMenu('enemy') //race-selector.js
    })
    
    $('.race-selector span, li.race-selector').click(function() {
        moveRaceSelector()
        addEnemySelector()
        hideSelectorPopUps()
        
        selectChosenRace(this, 'race') //race-selector.js
        addContentFromHTML('#upgrades', 'upgrades.html') //script.js
        $('.title').show()
    })
    
    $('.enemy-selector span, li.enemy-selector').click(function() {
        selectChosenRace(this, 'enemy') //race-selector.js
        hideSelectorPopUps()
    })
})

function moveRaceSelector() {
    $('#choose-race').html('You: ')
    $('div.race').css('margin-top', '20px')
    $('.race-selector').css('margin', '0 20px 0 0')
}

function addEnemySelector() {
    $('#enemy-race, .enemy-selector').show()
}

function hideSelectorPopUps() {
    $('ul').hide()
    $('.race-selector span, .enemy-selector span').css('border-bottom', '1px solid #DBDBDB')
}