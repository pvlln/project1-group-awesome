$(function(){
    // TO DO: CHANGE OUTPUT CONTAINER ID/CLASS & VAR NAME-- DELETE FETCH BUTTON
    // output container
    var userContainer = $('#users');
    // fetch button
    var fetchButton = $('#fetch-button');


    // TO DO: INSERT CORRECT ID/CLASS FOR ZIP CODE INPUT BOX
    var zipInputEl = $('#zip-code');
    // TO DO: INSERT CORRECT ID/CLASS FOR ENTER BUTTON
    var theaterSearchButton = $('#theater-search-btn');
    // TO DO: INSERT CORRECT MOVIE NAME ELEMENT
    var movieName = 'Cocaine+Bear'; // Should be created previously

    function getTheaters(event) {
        // zipCode TBD, need to get from input box
        //  var zipCode = zipInputEl.value.trim();
        // TO DO: CHANGE THIS ZIP CODE VAR
        var zipCode = '10038';
        var title = movieName.trim();
        var SERPrequestUrl = 'https://serpapi.com/search.json?q=' + movieName + '+theater&location=' + zipCode + '&api_key=2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';
        var proxyRequestUrl = 'https://corsproxy.io/?https%3A%2F%2Fserpapi.com%2Fsearch.json%3Fq%3D' + movieName +'+theater%26location%3D' + zipCode + '%26api_key%3D2f6c71b88a868cdffac66297d67731a1673190c3bdac7ba49c1b7471ec52c92e';

            // serprequest
        fetch(proxyRequestUrl)
            // manipulate the response to receive in json format
            fetch(SERPrequestUrl)
            .then(function (response) {
              return response.json();
            })
            // function to manipulate data
            .then(function (data) {
              console.log(data);
              // variable to store showtimes data
              var showtimes = data.showtimes;
              // Add title to html
              var dateDiv = document.createElement('div');
              dateDiv.classList.add('row');
              var dateEl = document.createElement('h4');
              dateEl.textContent = 'Showtimes for today:';
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
              // ADD [SEE MORE] FUNCTIONALITY
            });
    }
    // CHANGE FETCH BUTTON
    fetchButton.addEventListener('click', getTheaters);

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