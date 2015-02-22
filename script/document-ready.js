$(document).ready(function() {
    $(document).ajaxStart(function () {
        $("#loading").show();
        $('#go').prop('disabled',true);
    }).ajaxStop(function () {
        $("#loading").hide();
        $('#go').prop('disabled',false);
    });

    $('ul.race-selector, .enemy-selector, #enemy-race').hide()

        $('.race-selector span').mouseenter(function() {
            openRaceSelectorMenu('race') //race-selector.js
        })

    $('.enemy-selector span').mouseenter(function() {
        openRaceSelectorMenu('enemy') //race-selector.js
    })

    $('.race-selector span, li.race-selector').click(function() {
        $.get("https://eclipse-calculator.herokuapp.com/odds", {})
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
        $('#results').empty()
            var allValid = allShipsAreValid() //results.js
            if (allValid && bothSideHaveShipsSelected()) { //results.js
                $('#results').show()
                    showResults() //results.js
            } else if (!allValid) {
                showFlashMessage('Fix the red ships first!') //upgrades.js
            } else {
                showFlashMessage('You have no ships selected!') //upgrades.js
            }
    })
})
