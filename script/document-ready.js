$(document).ready(function() {
    $('ul.race-selector, .enemy-selector, #enemy-race').hide()

    $('.race-selector span').mouseenter(function() {
        openRaceSelectorMenu('race') //race-selector.js
    })
    
    $('.enemy-selector span').mouseenter(function() {
        openRaceSelectorMenu('enemy') //race-selector.js
    })
    
    $('.race-selector span, li.race-selector').click(function() {
        moveRaceSelector() //race-selector.js
        addEnemySelector() //race-selector.js
        hideSelectorPopUps() //race-selector.js
        
        selectChosenRace(this) //race-selector.js
        addContentFromHTML('#upgrades', 'upgrades.html') //script.js
        $('.title').show()
    })

    $('#go').mouseenter(function() {
        if (allShipsAreValid()) {
            $('#go').css('background','#FCFAE1')
        } else $('#go').css('background','red')
    })

    $('#go').mouseleave(function() {
        $('#go').css('background','white')
    })

    $('#go').click(function() {
        if (allShipsAreValid()) { //results.js
            $('#results').show()
            showResults() //results.js
        } else {
            showFlashMessage('Fix the red ships first!') //upgrades.js
        }
    })
})
