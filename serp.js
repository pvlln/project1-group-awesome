
$(function(){
    // TO DO: CHANGE OUTPUT CONTAINER ID/CLASS & VAR NAME-- DELETE FETCH BUTTON
    // output container
    var userContainer = $('.modal-body');
    // fetch button
    // var fetchButton = $('#fetch-button');


    // TO DO: INSERT CORRECT ID/CLASS FOR ZIP CODE INPUT BOX
    //var zipInputEl = $('#zip-code');
    // TO DO: INSERT CORRECT ID/CLASS FOR ENTER BUTTON
    //var theaterSearchButton = $('#theater-search-btn');
    // TO DO: INSERT CORRECT MOVIE NAME ELEMENT
    // var movieName = 'Cocaine+Bear'; // Should be created previously

    function getMovieInfo (movieName){
        var proxyRequestUrl = 'https://corsproxy.io/?https%3A%2F%2Fserpapi.com%2Fsearch.json%3Fq%3D' + movieName +'+theater%26location%3D' + zipCode + '%26api_key%3D2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';
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
    }
    
    function getTheaters(zip) {
        // zipCode TBD, need to get from input box
        // var zipCode = zipInputEl.value.trim(); -- MAKE USER INPUT FRIENDLY
        // TO DO: CHANGE THIS ZIP CODE VAR
        var zipCode = zip;
        var title = movieName.trim();
        var SERPrequestUrl = 'https://serpapi.com/search.json?q=' + movieName + '+theater&location=' + zipCode + '&api_key=2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';
        var proxyRequestUrl = 'https://corsproxy.io/?https%3A%2F%2Fserpapi.com%2Fsearch.json%3Fq%3D' + movieName +'+theater%26location%3D' + zipCode + '%26api_key%3D2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';

        // Fetch request
        fetch(proxyRequestUrl)
        // Manipulate the response to receive in json format
        .then(function (response) {
              return response.json();
        })
            // INPUT INFORMATION FUNCTION
            // Function to manipulate data
        .then(function (data) {
            console.log(data);
            // Variable to store showtimes data
            var showtimes = data.showtimes;
            // Add title to html
            var dateDiv = document.createElement('div');
            dateDiv.classList.add('row');
            var dateEl = document.createElement('h4');
            var now = dayjs();
            if (now.hour() < 17){
                dateEl.textContent = 'Upcoming showtimes today:';
            } else {
                dateEl.textContent = 'Upcoming showtimes this evening:';
            }
            dateEl.classList.add('justify-content-center');
            dateDiv.append(dateEl);
            userContainer.append(dateDiv);
            console.log(showtimes);
            // Var to store available theaters in area
            var theatersToday = showtimes[0].theaters;
            // For loop- manipulates each theater data and limits to 5 results
            for (let i = 0; i < 5; i++){
                // Store theater indo in variables and print to html
                var theaterName = theatersToday[i].name;
                console.log(theaterName);
                var theaterLink = theatersToday[i].link;
                console.log(theaterLink);
                var row = document.createElement('div');
                row.classList.add('row');
                var theater = document.createElement('h4');
                theater.textContent = theaterName;
                theater.classList.add('col-12');
                row.append(theater);
                userContainer.append(row);
                // Variable to store individual showtimes
                var showtimesToday = theatersToday[i].showing[0].time;
                console.log(showtimesToday);
                // Create html element
                var row2 = document.createElement('div');
                row2.classList.add('row', 'justify-content-center');
                // Iterate through showtimes, display in html buttons that link to the search results
                for (let j = 0; j < showtimesToday.length; j++){
                    var url = document.createElement('a');
                    url.classList.add('btn', 'btn-light', 'col-4', 'my-2', 'rounded');
                    url.setAttribute('href', theaterLink);
                    url.textContent = showtimesToday[j];
                    console.log(showtimesToday[j]);
                    row2.append(url);
                }
                // Add html element
                userContainer.append(row2);
            }
            var seeMoreBtn = document.createElement('button');
            seeMoreBtn.classList.add('btn', 'btn-link');
            seeMoreBtn.textContent = "See 5 More...";
            seeMoreBtn.on('click', function(){
            for (let i = 5; i < 10; i++){
                // Store theater indo in variables and print to html
                var theaterName = theatersToday[i].name;
                console.log(theaterName);
                var theaterLink = theatersToday[i].link;
                console.log(theaterLink);
                var row = document.createElement('div');
                row.classList.add('row');
                var theater = document.createElement('h4');
                theater.textContent = theaterName;
                theater.classList.add('col-12');
                row.append(theater);
                userContainer.append(row);
                // Variable to store individual showtimes
                var showtimesToday = theatersToday[i].showing[0].time;
                console.log(showtimesToday);
                // Create html element
                var row2 = document.createElement('div');
                row2.classList.add('row', 'justify-content-center');
                // Iterate through showtimes, display in html buttons that link to the search results
                for (let j = 0; j < showtimesToday.length; j++){
                    var url = document.createElement('a');
                    url.classList.add('btn', 'btn-light', 'col-4', 'my-2', 'rounded');
                    url.setAttribute('href', theaterLink);
                    url.textContent = showtimesToday[j];
                    console.log(showtimesToday[j]);
                    row2.append(url);
                }
            }})
        });
    }
    // CHANGE FETCH BUTTON
    // fetchButton.addEventListener('click', getTheaters);

    //"https://serpapi.com/search.json?q=Cocaine+Bear+theater&num=4&location=10038&api_key=2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e" 
});

// TRY 1
// .then(function (response) {
//     return response.json();
//     })
//     // function to manipulate the data
//     .then(function (data) {
//     console.log(data);
//     // retrieve showtimes attribute from response object
//     var showtimes = data.showtimes;
//     // filter results by date and theaters
//     var currentDate = showtimes[0].day + " ," + showtimes[0].date;
//     var theatersToday = showtimes[0].theaters;
//     // iterate through first 5 theaters
//     for (let i = 0; i < 5; i++){
//         // retreive name and link
//         var theaterName = theatersToday[i].name;
//         var theaterLink = theatersToday[i].link;
//         // create header html element for each theater
//         var theater = document.createElement('h3');
//         // ADD CLASS?
//         // append to container
//         userContainer.append(theater);
//         // in each theater, iterate through all showings
//         var showtimesToday = theatersToday[i].showing[0][0];
//         for (let j = 0; j < showtimesToday.length; j++){
//             // create html link element to append 
//             var url = document.createElement('a');
//             // ADD CLASS?
//             // give the html link element the href attribute that links
//             // to the theater's website
//             url.setAttribute('href', theaterLink);
//             url.textContent = showtimesToday[j];
//             // append to container
//             userContainer.append(url);
//         }
//     }
//     });
