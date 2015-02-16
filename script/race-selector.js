var chosenRace
var enemyRace = 'enemyTerran'

function openRaceSelectorMenu(race) {
    $('ul.' + race + '-selector').slideDown('slow')

    $('div.' + race + '-selector').mouseleave(function() {
        $('ul.' + race + '-selector').slideUp('slow')
    })
}

function moveRaceSelector() {
    $('#choose-race').html('You: ')
    $('div.race').css('margin-top', '20px')
    $('.race-selector').css('margin', '0 20px 0 0')
    $('.race-selector span').unbind('mouseenter')
    $('.race-selector span').css({
        'background':'none',
        'color':'black',
        'font-weight':'normal',
        'font-size':'14px',
        'cursor':'default'
    })
}

function addEnemySelector() {
    $('#enemy-race, .enemy-selector').show()
}

function hideSelectorPopUps() {
    $('ul').hide()
    $('.race-selector span, .enemy-selector span').css('border-bottom', '1px solid #DBDBDB')
}

function selectChosenRace(selection) {
    var selectedRace = $(selection).data('race')
    chosenRace = selectedRace
    
    reorderSelectorIfNeeded(selection, 'race', selectedRace)
    addContentFromHTML('#player-ship', 'ships/ship-' + selectedRace + '.html')
    addContentFromHTML('#enemy-ship', 'ships/enemy-ships.html')

    refreshClick()
}

function reorderSelectorIfNeeded(selection, player, race) {
    var topRaceOnSelector = $('.' + player + '-selector span').attr('data-race')
    if (race!=topRaceOnSelector) {
        reorderSelectorRaces(selection, race, topRaceOnSelector, player)
    }
}

function reorderSelectorRaces(selection, race, topRaceOnSelector, player) {
    var newLi = document.createElement('li')
    $(newLi).addClass(player + '-selector')
    $(newLi).appendTo('ul.' + player + '-selector')
    $(newLi).attr('data-race', topRaceOnSelector).text($('.' + player + '-selector span').text())
    $('.' + player + '-selector span').html($(selection).text()).attr('data-race', race)
    $('li.' + player + '-selector[data-race="' + race + '"]').remove()
}

function handleClick(selection) {
    $.get("https://eclipse-calculator.herokuapp.com/odds", {})
    var selectedRace = $(selection).data('race')
    if (selectedRace!=chosenRace) {
        selectEnemyRace(selection, selectedRace)
        hideSelectorPopUps()
    }
}

function selectEnemyRace(selection, selectedRace) {
    enemyRace = selectedRace

    reorderSelectorIfNeeded(selection, 'enemy', selectedRace)
    showEnemyShipModels()

    refreshClick()
}

function showEnemyShipModels() {
    $('#enemy-ship > div').css('display', 'none')
    $('#enemy-ship > div.' + enemyRace).css('display', 'inline-block')
}

function refreshClick() {
    $('.enemy-selector span, li.enemy-selector').unbind('click')
    $('.enemy-selector span, li.enemy-selector').click(function() {
        handleClick(this)
    })
}
