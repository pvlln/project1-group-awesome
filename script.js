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
            console.log(data)

            for (var i = 0; i < 2; i++) {
                var row = document.createElement("div");
                row.classList.add("row", "my-4");
                // row.setAttribute("id", `row-${index}`)

                container.appendChild(row);

                for (var i = 0; i < 8; i++) {  
                    // var src = data.Search[i].Poster === "N/A" ? "./assets/images/Image_not_available.png" : data.Search[i].Poster;                
                    // var card = `
                    //     <div class="card col-2 my-4 search-list" data-image="${data.Search[i].Poster}">
                    //         <h5 class="card-title" data-title="${data.Search[i].Title}"> ${data.Search[i].Title} </h5>
                    //         <h6 class="card-subtitle text-muted">${data.Search[i].Year}</h6>
                    //         <img src=${src} class="card-poster"/>
                    //     </div>
                    // `
                    // data-bs-toggle="modal" data-bs-target="#modal-view"
                    var card = document.createElement("div");
                    card.classList.add("card", "col-2", "my-4", "search-list");
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
                    // $(`#row-${index}`).append(card);

                }
                var searchListCards = document.querySelectorAll(".search-list")
                searchListCards.forEach(Element => Element.addEventListener("click",openModal))
            }
        });
});    



function openModal(event){
    console.log(event);
    console.log(event.target.parentNode);
    console.log(event.target.getAttribute("class"));

document.getElementById("movie-title-modal").innerText = this.firstElementChild.textContent;
document.getElementById("movie-description-modal").innerText = this.lastElementChild.textContent;
document.getElementById("movie-image-modal").setAttribute("src", this.getAttribute("data-image"));
document.getElementById("imdb").innerText = this.getAttribute("data-imdb");
// document.getElementById("movie-title-modal").innerHTML = "";
// document.getElementById("movie-title-modal").innerHTML = "";
 
}

