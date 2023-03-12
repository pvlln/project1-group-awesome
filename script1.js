var searchBtn = document.querySelector("#searchBtn");
var movieInput = document.querySelector("#movieText");

function displaySearches() {
    var searchArray = JSON.parse(localStorage.getItem("Movie Title")) || [];
    console.log(searchArray)
    
    $("#movieText").autocomplete({
        source: searchArray
    });
}

movieInput.addEventListener("click", function() {
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


    fetch("http://www.omdbapi.com/?apikey=6bb284e5&s=" + movieString + "&type=movie&plot=long&page=1")  

        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (var i = 0; i < 2; i++) {
                var row = document.createElement("div");
                row.classList.add("row", "my-4");
        
                container.appendChild(row);
                
                for (var i = 0; i < 8; i++) {
                    var modalContent = document.createElement("div")
                    modalContent.innerHTML = `
                    <div class="modal fade" id="movie-${data.Search[i].imdbID}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${data.Search[i].Title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
    <img src="${data.Search[i].Poster}" width="400" height="400"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
                    `

                    var modalButton = document.createElement("div");
                    modalButton.classList.add("modal-open")
                    modalButton.setAttribute("data-bs-target",`movie-${data.Search[i].imdbID}`)
                    modalButton.setAttribute("data-bs-toggle","modal")
                    var card = document.createElement("div");
                    card.classList.add("card", "col-3", "mb-4");
            
                    var cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
            
                    var cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
                    cardTitle.setAttribute("data-title", data.Search[i].Title);
                    cardTitle.textContent = data.Search[i].Title;
            
                    var cardSubtitle = document.createElement("h6");
                    cardSubtitle.classList.add("card-subtitle");
                    cardSubtitle.textContent = data.Search[i].Year;
            
                    var cardText = document.createElement("p");
                    cardText.classList.add("card-text");
                    cardText.textContent = data.Search[i].Plot;
            
                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardSubtitle);
                    cardBody.appendChild(cardText);
            
                    card.appendChild(cardBody);
                        modalButton.appendChild(card)
                        modalButton.appendChild(modalContent)
                    row.appendChild(modalButton);

                }
            }
        });
});    

const myModal = document.querySelectorAll('.modal-open')


myModal.forEach(element => element.addEventListener('shown.bs.modal', () => {
  var divID = this.getAttribute("data-bs-target")
  document.getElementById(divID).focus()
}))

$(document).on("click", ".container",function(event){
    console.log(event.target.parentNode);
    console.log(event.target.getAttribute("class"));

document.getElementById("movie-title-modal").innerHTML = "card-title";
document.getElementById("movie-title-modal").innerHTML = "";
document.getElementById("movie-title-modal").innerHTML = "";
document.getElementById("movie-title-modal").innerHTML = "";
document.getElementById("movie-title-modal").innerHTML = "";
document.getElementById("movie-title-modal").innerHTML = "";
    // $('body').append(
    //     '<div class="modal" tabindex="-1" role="dialog"><divclass="modal-dialg" role="document"> <div class="modal-content"><div class="modal-body"><p>Modal body text goes here.</p></div></div> </div> </div>'
    // )
    
})
