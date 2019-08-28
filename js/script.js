//user will select specifc date from date picker
//make object array
eventsApp = {};

//store user input in a variable to make API call
eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events";

eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

<<<<<<< HEAD
eventsApp.userPickDate = '';
eventsApp.userPickCity = '';
eventsApp.eventsArray = [];

eventsApp.getEvents = (city, date) => {
  $.ajax({
    type: "GET",
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&city=${city}&startDateTime=${date}T00:00:00Z&endDateTime=${date}T23:00:00Z`,
=======
eventsApp.date = "2019-08-29T23:00:00Z";

eventsApp.getEvents = (date) => {

  //store an AJAX request in a variable called eventsApp.getEvents, we are storing a promise in a variable:
  $.ajax({
    type: "GET",
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&city=toronto&startDateTime=2019-08-29T00:00:00Z&endDateTime=${date}`,
>>>>>>> 337b4d536cd2f6600276885ddd0ad67848424529
    async: true,
    dataType: "json",
    
    success: function (res) {
      console.log(res);
      eventsApp.displayEvents(res);
      // Parse the response.
      // Do other things.
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
    }
  });
}
eventsApp.getUserInput = () => {
  //Gets the value of selected city
  $('select').on('change', function () {
    eventsApp.userPickCity = $('select').val();
  });
  //Gets value of selected date
  $('input').on('change', function() {
    eventsApp.userPickDate = $('input').val();
    eventsApp.getEvents(eventsApp.userPickCity, eventsApp.userPickDate);
  });
  
}
eventsApp.displayEvents = (result) => {
  for(let i = 0; i <= 3; i++) {
    console.log(result._embedded.events[i].name);
    // console.log(eventsArray);
  }
  
  //   if (piece.hasImage) {
  //     const htmlToPost = (`<div class="piece">
  //               <h2>${piece.title}</h2>
  //               <p class="artist">${piece.principalOrFirstMaker}</p>
  //               <img src="${piece.webImage.url}" alt="${piece.longTitle}"></div>`);

<<<<<<< HEAD
  //     $('#artwork').append(htmlToPost);
  //   }
  // });
}
//Function to display info on hovered text
eventsApp.hoverInfo = () => {
  $('.hover').on('mouseover', function (){
    const hover = $('.hover').text();
    console.log(hover);
  })
}
//create document ready
$(document).ready(function () {
  eventsApp.getUserInput();
  eventsApp.hoverInfo();
=======
// wait for the document to be ready
$(document).ready(function () {
  eventsApp.getEvents(eventsApp.date);
>>>>>>> 337b4d536cd2f6600276885ddd0ad67848424529
});


//store the API data in an array
//if event is happening display events using, if no events happening use .fail() to display "no events happening today"


//display values of the array name, venue, image, ticket purchase url