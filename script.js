var searchBtn = document.querySelector("#searchBtn");
var movieText = document.querySelector("#movieText").textContent;

searchBtn.click(function () {
    var movieString = movieText.replace(/\s/g, "+");
    console.log(movieString);

        
})

