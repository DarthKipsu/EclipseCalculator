var chosenRace
var enemyRace

function openRaceSelectorMenu(race) {
    $('ul.' + race + '-selector').slideDown('slow')

    $('div.' + race + '-selector').mouseleave(function() {
        $('ul.' + race + '-selector').slideUp('slow')
    })
}

function selectChosenRace(selection, player) {
    var selectedRace = $(selection).data('race')
    if (player=='enemy') enemyRace = selectedRace
    else chosenRace = selectedRace
    
    reorderSelectorIfNeeded(selection, player, selectedRace)
    
    if (player=='enemy') addShipModels('enemy', selectedRace)
    else addShipModels('player', selectedRace)

    refreshClick(player)
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

function addShipModels(player, race) {
    $('#' + player + '-ship').html('')
    addContentFromHTML('#' + player + '-ship', 'ships/ship-' + race + '.html')
}

function refreshClick(player) {
    $('.' + player + '-selector span, li.' + player + '-selector').unbind('click')
    $('.' + player + '-selector span, li.' + player + '-selector').click(function() {
        selectChosenRace(this, player)
        hideSelectorPopUps()
    })
}