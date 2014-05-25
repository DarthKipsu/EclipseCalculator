function showResults() {
    addContentFromHTML('#results', 'results.html')
    $('#results').on('click', '.close', function() {
        $('#results').hide()
    })
}
