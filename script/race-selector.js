var chosenRace
var enemyRace

function raceSelectorMenu(race) {
    $('ul.' + race + '-selector').slideDown('slow')
    $('.' + race + '-selector span').css('border-bottom', 'none')

    $('div.' + race + '-selector').mouseleave(function() {
        $('ul.' + race + '-selector').slideUp('slow')
        $('.' + race + '-selector span').css('border-bottom', '1px solid #DBDBDB')
    })
}

function choosingARace(selection) {
    chosenRace =$(selection).data('race')
    $('.race-selector span, li.race-selector').unbind('click')
    
    reorderIfNeeded(selection, 'race', chosenRace)

    $('.race-selector span, li.race-selector').click(function() {
        choosingARace(this)
        hideRaceSelectorPopUps()
    })

    if ($('#upgrades').text().length==0) {
        addContentFromHTML('#upgrades', 'upgrades.html') //script.js
    }
    $('#player-ship').html('')
    addContentFromHTML('#player-ship', 'ships/ship-' + chosenRace + '.html')
    $('.title').show()
}

function choosingEnemy(selection) {
    enemyRace = $(selection).data('race')
    $('.enemy-selector span, li.enemy-selector').unbind('click')
    
    reorderIfNeeded(selection, 'enemy', enemyRace)
    $('#enemy-ship').html('')
    addContentFromHTML('#enemy-ship', 'ships/ship-' + enemyRace + '.html') 
    
    $('.enemy-selector span, li.enemy-selector').click(function() {
        choosingEnemy(this) //race-selector.js
        hideRaceSelectorPopUps()
    })
}

function reorderIfNeeded(selection, player, race) {
    var topRaceOnSelector = $('.' + player + '-selector span').attr('data-race')
    if (race!=topRaceOnSelector) {
        reorderRaceSelectorRaces(selection, race, topRaceOnSelector, player)
    }
}

function moveRaceSelector() {
    $('#choose-race').html('You: ')
    $('.race-selector span').css('border-bottom', '1px solid #DBDBDB')
    $('div.race').css('margin-top', '20px')
    $('.race-selector').css('margin', '0 20px 0 0')
}

function reorderRaceSelectorRaces(selection, race, topRaceOnSelector, player) {
    var newLi = document.createElement('li')
    $(newLi).addClass(player + '-selector')
    $(newLi).appendTo('ul.' + player + '-selector')
    $(newLi).attr('data-race', topRaceOnSelector)
    $(newLi).text($('.' + player + '-selector span').text())
    $('.' + player + '-selector span').html($(selection).text())
    $('.' + player + '-selector span').attr('data-race', race)
    var oldLi = $('li.' + player + '-selector[data-race="' + race + '"]')
    $(oldLi).remove()
}
