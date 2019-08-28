//user will select specifc date from date picker
//make object array
eventsApp = {};

//store user input in a variable to make API call
eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events";

eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

eventsApp.date = "2019-08-29T23:00:00Z";

eventsApp.getEvents = (date) => {

  //store an AJAX request in a variable called eventsApp.getEvents, we are storing a promise in a variable:
  $.ajax({
    type: "GET",
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&city=toronto&startDateTime=2019-08-29T00:00:00Z&endDateTime=${date}`,
    async: true,
    dataType: "json",
    success: function (res) {
      console.log(res);
      // Parse the response.
      // Do other things.
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
    }
  });
}

// wait for the document to be ready
$(document).ready(function () {
  eventsApp.getEvents(eventsApp.date);
});

//store the API data in an array
//if event is happening display events using, if no events happening use .fail() to display "no events happening today"


//display values of the array name, venue, image, ticket purchase url