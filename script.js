// TO DO: CHANGE OUTPUT CONTAINER ID/CLASS & VAR NAME-- DELETE FETCH BUTTON
// output container
var userContainer = document.getElementById('users');
// fetch button
var fetchButton = document.getElementById('fetch-button');


// TO DO: INSERT CORRECT ID/CLASS FOR ZIP CODE INPUT BOX
var zipInputEl = document.getElementById('zip-code');
// TO DO: INSERT CORRECT ID/CLASS FOR ENTER BUTTON
var theaterSearchButton = document.getElementById('theater-search-btn');
// TO DO: INSERT CORRECT MOVIE NAME ELEMENT
var movieName = 'Cocaine+Bear'; // Should be created previously

function getTheaters(event) {
  event.preventDefault();
    // zipCode TBD, need to get from input box
//  var zipCode = zipInputEl.value.trim();
  // TO DO: CHANGE THIS ZIP CODE VAR
  var zipCode = '10038';
  var title = movieName.trim();
  var SERPrequestUrl = 'https://serpapi.com/search.json?q=' + movieName + '+theater&location=' + zipCode + '&api_key=2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';

    // serprequest
  fetch(SERPrequestUrl)
    // manipulate the response to receive in json format
    .then(function (response) {
      return response.json();
    })
    // function to manipulate the data
    .then(function (data) {
      console.log(data);
      // retrieve showtimes attribute from response object
      var showtimes = data.showtimes;
      // filter results by date and theaters
      var currentDate = showtimes[0].day + " ," + showtimes[0].date;
      var theatersToday = showtimes[0].theaters;
      // iterate through first 5 theaters
      for (let i = 0; i < 5; i++){
          // retreive name and link
          var theaterName = theatersToday[i].name;
          var theaterLink = theatersToday[i].link;
          // create header html element for each theater
          var theater = document.createElement('h3');
          // ADD CLASS?
          // append to container
          userContainer.append(theater);
          // in each theater, iterate through all showings
          var showtimesToday = theatersToday[i].showing[0][0];
          for (let j = 0; j < showtimesToday.length; j++){
              // create html link element to append 
              var url = document.createElement('a');
              // ADD CLASS?
              // give the html link element the href attribute that links
              // to the theater's website
              url.setAttribute('href', theaterLink);
              url.textContent = showtimesToday[j];
              // append to container
              userContainer.append(url);
          }
      }
    });
}
// CHANGE FETCH BUTTON
fetchButton.addEventListener('click', getTheaters);

//"https://serpapi.com/search.json?q=Cocaine+Bear+theater&num=4&location=10038&api_key=2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e" 