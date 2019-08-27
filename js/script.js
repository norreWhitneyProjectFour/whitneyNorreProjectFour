//user will select specifc date from date picker
//make object array
eventsApp = {};

//store user input in a variable to make API call
eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events";

eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

eventsApp.getEvents = () => {
  // $.ajax({
  //   url: eventsApp.url,
  //   method: 'GET',
  //   datatype: 'json',
  //   data: {
  //     key: eventsApp.apiKey,
  //     city: 'Toronto',
  //     startDateTime: '2019-09-13'
  //   }
  // }).then((res) => {
  //   console.log("IT WORKED!");
  // })

  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&city=toronto&startDateTime=2019-08-29T00:00:00Z&endDateTime=2019-08-29T23:00:00Z",
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

//create document ready
$(document).ready(function () {
  eventsApp.getEvents();
});

//store the API data in an array
//if event is happening display events using, if no events happening use .fail() to display "no events happening today"


//display values of the array name, venue, image, ticket purchase url