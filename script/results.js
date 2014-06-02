function allShipsAreValid() {
    var invalid = document.querySelectorAll('.invalid')
    if (invalid.length>0) return false
    else return true
}

function showResults() {
    addContentFromHTML('#results', 'results.html')
    addResultsCloseX()

    var shipsAttending = countTheShips()

    var initiativeOrder = []
    
}

function addResultsCloseX() {
    $('#results').on('click', '.close', function() {
        $('#results').hide()
    })
}

function countTheShips() {
    var inputs = document.getElementsByTagName('input')
    var shipsAttending = []
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].value>0) {
            for (var j=0; j<inputs[i].value; j++) {
                shipsAttending.push([inputs[i].classList[0], inputs[i].name])
            }
        }
    }
    return shipsAttending
}
