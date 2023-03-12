fetch().then(function(response){
    // Get the movie overview from the data
    var overview = data.knowledge_graph;
    // Create object that stores movie info
    var movieInfo = {
        Type: overview.type,
        Director: overview.director,
        Cinematographer: overview.cinematography,
        Cast: overview.cast,
    }
    // Function that creates a new row
    function createRowEl(class1, class2) {
        var newRow = document.createElement('div');
        newRow.classList.add('row', class1, class2);
        return newRow;
    }
    // Create div to store the information for the movie
    var movie = document.createElement('div');
    // Create array that stores each row
    rows = [];
    // Create the info element for the movie
    var infoEl = createRowEl('justify-content-center', 'my-5');
    var movieType = document.createElement('h5');
    movieType.classList.add('col-12', 'text-muted');
    movieType.textContent(movieInfo.Type);
    infoEl.append(movieType);
    rows.push(infoEl);

    for (let i=1; i<Object.entries(movieInfo).length; i++){
        // Create row for titles
        var titleRow = createRowEl('justify-content-center', 'my-5');
        var bodyRow = createRowEl('justify-content-baseline');
        var newTitle = `<h5>${Object.keys(movieInfo)[i]}</h5>`;
        titleRow.append(newTitle);
        var newBody = movieInfo[Object.keys(movieInfo)[i]] ? `<p>${Object.values[i]}</p>` : 'Information not available for this title';
        bodyRow.append(newBody);
        rows.push(titleRow, bodyRow);
    }
    movie.append(rows);
    userContainer.append(movie);
    // INPUT SERPJS HERE!!
    var zipPrompt = createRowEl('justify-content-center', 'my-5');
    zipPrompt.append('<h3>Search for this title in theaters near you- <br><small class="text-muted">Enter your Zip Code below</small></h3>');
    rows.push(zipPrompt);
    var zipInputRow = createRowEl('justify-content-center', 'my-5');
    zipInputRow.append('<input type="text" placeholder="Enter Zip Code" class="col-6" id="zipCode"></input>');
    var zipCode = $('#zipCode').val();
    zipInputRow.append(`<button class="col-4" onclick=getTheaters(${zipCode})id="zipSearchBtn">Search</button>`);
})
