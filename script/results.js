function allShipsAreValid() {
    var invalid = document.querySelectorAll('.invalid')
    if (invalid.length>0) return false
    else return true
}

function showResults() {
    addContentFromHTML('#results', 'results.html')
    hideResultsWithX()

    var shipsAttending = countTheShips()
    if (shipsAttending.length==0) console.log('no ships selected!')

    var initiativeOrder = []
    while (shipsAttending.length>0) {
        var biggestInitiative = [{initiative: -1}]
        var index
        for (i=0; i<shipsAttending.length; i++) {
            if (shipsAttending[i][0].initiative>biggestInitiative[0].initiative) {
                biggestInitiative = shipsAttending[i]
                index = i
                console.log(biggestInitiative[0].initiative)
            } else if (shipsAttending[i][0].initiative==biggestInitiative[0].initiative &&
                       shipsAttending[i][1]=='defender') {
                biggestInitiative = shipsAttending[i]
                index = i
                console.log('defender')
            }
        }
        console.log('push')
        initiativeOrder.push(biggestInitiative)
        shipsAttending.splice(index,1)
        biggestInitiative = [{initiative: -1}]
    }
    console.log('init order:', initiativeOrder)
}

function hideResultsWithX() {
    $('#results').on('click', '.close', function() {
        $('#results').hide()
    })
}

function countTheShips() {
    var inputs = document.getElementsByTagName('input')
    var shipsAttending = []
    var player = 'defender'
    var enemy = 'attacker'
    if (inputs[4].checked) {
        player = 'attacker'
        enemy = 'defender'
    }
    console.log(player)
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].value>0) {
            for (var j=0; j<inputs[i].value; j++) {
                if (inputs[i].classList[0]=='player') {
                    shipsAttending.push([recordTable[chosenRace][inputs[i].name], player])
                } else shipsAttending.push([recordTable[enemyRace][inputs[i].name], enemy])
            }
        }
    }
    return shipsAttending
}
