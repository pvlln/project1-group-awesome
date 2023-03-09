var searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", function () {
    var movieText = document.querySelector("#movieText").value;
    var movieString = movieText.replace(/\s/g, "+");
    console.log(movieString);

    var container = document.querySelector(".container");
    container.innerHTML = "";

    fetch("http://www.omdbapi.com/?apikey=6bb284e5&s=" + movieString + "&type=movie&plot=long&page=1")  

        .then(response => response.json())
        .then(data => {
            
            for (var i = 0; i < 2; i++) {
                var row = document.createElement("div");
                row.classList.add("row", "my-4");
        
                container.appendChild(row);
                
                for (var i = 0; i < 8; i++) {
                    var card = document.createElement("div");
                    card.classList.add("card", "col-3", "mb-4");
            
                    var cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
            
                    var cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
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
    
                    row.appendChild(card);
                }
            }
            

        });
});
