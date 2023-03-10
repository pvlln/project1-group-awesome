.then(function(response){
    var overview = data.knowledge_graph;
    var movieInfo = {
        type: overview.type,
        director: overview.director,
        cinematographer: overview.cinematography,
        cast: overview.cast,
    }
    function createRowEl(class1, class2) {
        var newRow = document.createElement('div');
        newRow.classList.add('row', class1, class2);
        return newRow;
    }
    // Revierw All of this
    var infoEl = createRowEl('justify-content-center', 'my-5');
    var movieType = document.createElement('h5');
    movieType.classList.add('col-12', 'text-muted');
    movieType.textContent(movieInfo.type);
    infoEl
    for (let i=1; i<Object.values(movieInfo).length; i++){
        var newTitle = document.createElement('div');
        newLine.classList.add('row');

    }
    userContainer.append(infoEl);
})
