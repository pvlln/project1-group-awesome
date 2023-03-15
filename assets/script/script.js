var searchBtn = document.querySelector("#searchBtn");
var movieInput = document.querySelector("#movieText");

// adds autocomplete functionality using jQuery UI; reads from searches in local storage
function displaySearches() {
    var searchArray = JSON.parse(localStorage.getItem("Movie Title")) || [];
    console.log(searchArray)

    $("#movieText").autocomplete({
        source: searchArray
    });
}

// runs above function when movie input box is clicked
movieInput.addEventListener("click", function () {
    displaySearches();
});


searchBtn.addEventListener("click", function () {
    // replaces number inputs with strings; replaces empty spaces with '+' for use in later fetch requests
    var movieText = document.querySelector("#movieText").value.trim();
    if (isNaN(movieText)) {
        movieText = movieText.toString();
    }
    var movieString = movieText.replace(/\s/g, "+");
    // adds search to local storage if it is not a duplicate search
    var recentSearches = JSON.parse(localStorage.getItem("Movie Title")) || [];

    if (!recentSearches.includes(movieText)) {
        recentSearches.unshift(movieText);
    }

    localStorage.setItem("Movie Title", JSON.stringify(recentSearches));
    console.log(recentSearches);

    // clears previous search cards and text input field when search button is clicked
    var container = document.querySelector(".container");
    container.innerHTML = "";

    document.querySelector("#movieText").value = "";
    // stores OMDB api fetch url in a variable. String of the search item with '+' replacing spaces is concatenated to the query parameters.
    var OMDBRequestUrl = "https://www.omdbapi.com/?apikey=695fdf11&s=" + movieString + "&type=movie";
    
    fetch(OMDBRequestUrl)

        .then(response => response.json())
        .then(data => {
            console.log(data)
            // creates rows for the movie card search results to be displayed in.
            for (var i = 0; i < 2; i++) {
                var row = document.createElement("div");
                row.classList.add("row", "row-cols-6", "my-4", "justify-content-center");

                container.appendChild(row);
                // creates the movie search result cards with data from OMDB.
                for (var i = 0; i < 8; i++) {  

                    var card = document.createElement("div");
                    card.classList.add("card", "my-4", "search-list");
                    card.setAttribute("data-image", data.Search[i].Poster);
                    card.setAttribute("data-bs-toggle", "modal");
                    card.setAttribute("data-bs-target", "#modal-view");

                    var cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
                    cardTitle.setAttribute("data-title", data.Search[i].Title);
                    cardTitle.textContent = data.Search[i].Title;

                    var cardSubtitle = document.createElement("h6");
                    cardSubtitle.classList.add("card-subtitle", "text-muted");
                    cardSubtitle.textContent = data.Search[i].Year;

                    var cardPoster = document.createElement("img");
                    cardPoster.src = data.Search[i].Poster === "N/A" ? "./assets/images/Image_not_available.png" : data.Search[i].Poster;
                    cardPoster.classList.add("card-poster");

                    card.appendChild(cardTitle);
                    card.appendChild(cardSubtitle);
                    card.appendChild(cardPoster);

                    row.appendChild(card);

                }
                // Opens modal when a card is clicked
                var searchListCards = document.querySelectorAll(".search-list")
                searchListCards.forEach(Element => Element.addEventListener("click",openModal))
            }
        });
});    

// Creates the modal using data attributes from selected card
function openModal(event){
    console.log(event.target.parentNode, this);

    console.log(event.target.getAttribute("class"));
    document.getElementById("movie-title-modal").textContent = this.firstElementChild.textContent;
    document.getElementById("movie-description-modal").textContent = this.lastElementChild.textContent;
    document.getElementById("movie-image-modal").setAttribute("src", this.getAttribute("data-image"));

    var movieTitle = document.querySelector('#movie-title-modal').textContent; 
    console.log(movieTitle);
    getMovieInfo(movieTitle);
}

var userContainer = document.querySelector('.modal-body');
var title = document.querySelector('#movie-title-modal').textContent;

function getMovieInfo (movie){
    var movieName = movie.replace(/\s/g, "+");
    userContainer.innerHTML = '';
    var proxyRequestUrl = 'https://corsproxy.io/?https%3A%2F%2Fserpapi.com%2Fsearch.json%3Fq%3D' + movieName +'%26google_domain%3Dgoogle.com%26location%3D10001%26api_key%3D17b39452db2fd97ba88e2f7a6bb9a5ecf5e52e4e633d9c698a180edb534d0a41';
    fetch(proxyRequestUrl).then(function (response) {
        return response.json();
    })
      // Function to manipulate data
    .then(function (data) {
        // Get the movie overview from the data
        var overview = data.knowledge_graph;
        // Create object that stores movie info
        console.log(data, overview);
        var movieInfo = {
            Type: overview.type,
            Description: overview.description,
            Director: overview.director,
            Cast: overview.cast,
        }
        console.log(movieInfo);
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
        movieType.textContent = movieInfo.Type;
        infoEl.append(movieType);
        rows.push(infoEl);
        for (let i=1; i<(Object.entries(movieInfo).length -1); i++){
            // Create row for titles
            var titleRow = createRowEl('justify-content-center', 'my-5');
            var bodyRow = createRowEl('justify-content-baseline');
            var newTitle = document.createElement('h5');
            newTitle.textContent = Object.keys(movieInfo)[i];
            //var newTitle = Object.keys(movieInfo)[i];
            titleRow.append(newTitle);
            var newBody = document.createElement('p');
            newBody.textContent = (movieInfo[Object.keys(movieInfo)[i]] ? Object.values(movieInfo)[i]: 'This information not available for this title');
            //var newBody = `<p>${Object.values(movieInfo)[i]}</p>`
            //var newBody = Object.values(movieInfo)[i];
            bodyRow.append(newBody);
            rows.push(titleRow, bodyRow);
        }
        var castTitleRow = createRowEl('justify-content-center', 'my-5');
        var castTitle = document.createElement('h5');
        castTitle.textContent = 'Cast: ';
        castTitleRow.append(castTitle);
        rows.push(castTitleRow);

        for (let i=0; i<movieInfo.Cast.length; i++){

            if (movieInfo.Cast[0]){
                var titleRow = createRowEl('justify-content-center', 'my-5');
                var bodyRow = createRowEl('justify-content-baseline');
                var newTitle = document.createElement('h5');
                newTitle.textContent = movieInfo.Cast[i].name;

                titleRow.append(newTitle);
                rows.push(titleRow);
            }
        }
        for (let i=0;i<rows.length;i++){
            movie.innerHTML += rows[i].innerHTML;
            movie.innerHTML += '<br>';
        }
        userContainer.append(movie);
        var zipPrompt = createRowEl('justify-content-center', 'my-5');
        zipPrompt.innerHTML = '<h3>Search for this title in theaters near you- <br><small class="text-muted">Enter your Zip Code below</small></h3>';
        userContainer.append(zipPrompt);
        var zipInputRow = createRowEl('justify-content-center', 'my-5');
        zipInputRow.innerHTML = '<input type="text" placeholder="Enter Zip Code" class="col-6" id="zipCode"></input>';
        zipInputRow.innerHTML += `<button class="col-4" id="zipSearchBtn">Search</button>`;
        userContainer.append(zipInputRow);

        var zipSearchBtn = document.querySelector('#zipSearchBtn')
        zipSearchBtn.addEventListener('click', getTheaters);
    })
}

function getTheaters() {
    var title = document.querySelector('#movie-title-modal').textContent;
    var zipCodeEl = document.querySelector('#zipCode');
    var zipCode = zipCodeEl.value.trim();
    var movieName = title.replace(/\s/g, "+");
    console.log(movieName, "THIS ONE");
    var SERPrequestUrl = 'https://serpapi.com/search.json?q=' + movieName + '+theater&location=' + zipCode + '&api_key=2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';
    var proxyRequestUrl = 'https://corsproxy.io/?https%3A%2F%2Fserpapi.com%2Fsearch.json%3Fq%3D' + movieName +'+theater%26location%3D' + zipCode + '%26api_key%3D17b39452db2fd97ba88e2f7a6bb9a5ecf5e52e4e633d9c698a180edb534d0a41';
   
    // Fetch request
    fetch(proxyRequestUrl)
    // Manipulate the response to receive in json format
    .then(function (response) {
        return response.json();
    })

        // Function to manipulate data
    .then(function (data) {
        console.log(data, "THIS IS THE DATA");
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