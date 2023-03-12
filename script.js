var searchBtn = document.querySelector("#searchBtn");
var movieInput = document.querySelector("#movieText");

function displaySearches() {
    var searchArray = JSON.parse(localStorage.getItem("Movie Title")) || [];
    console.log(searchArray)

    $("#movieText").autocomplete({
        source: searchArray
    });
}

movieInput.addEventListener("click", function () {
    displaySearches();
});


searchBtn.addEventListener("click", function () {
    var movieText = document.querySelector("#movieText").value;
    var movieString = movieText.replace(/\s/g, "+");

    var recentSearches = JSON.parse(localStorage.getItem("Movie Title")) || [];

    if (!recentSearches.includes(movieText)) {
        recentSearches.unshift(movieText);
    }

    localStorage.setItem("Movie Title", JSON.stringify(recentSearches));
    console.log(recentSearches);

    var container = document.querySelector(".container");
    container.innerHTML = "";

    document.querySelector("#movieText").value = "";

    var OMDBRequestUrl = "http://www.omdbapi.com/?apikey=695fdf11&s=" + movieString + "&type=movie";
    
    fetch(OMDBRequestUrl)

        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (var i = 0; i < 2; i++) {
                var row = document.createElement("div");
                row.classList.add("row", "my-4");

                container.appendChild(row);

                for (var i = 0; i < 8; i++) {
                    var card = document.createElement("div");
                    card.classList.add("card", "col-2", "mb-4");

                    var cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
                    cardTitle.textContent = data.Search[i].Title;

                    var cardSubtitle = document.createElement("h6");
                    cardSubtitle.classList.add("card-subtitle", "text-muted");
                    cardSubtitle.textContent = data.Search[i].Year;

                    var cardPoster = document.createElement("img");
                    cardPoster.src = data.Search[i].Poster;
                    cardPoster.classList.add("card-poster");

                    card.appendChild(cardTitle);
                    card.appendChild(cardSubtitle);
                    card.appendChild(cardPoster);

                    row.appendChild(card);
                }
            }
        });
});
