//user will select specifc date from date picker
//make object array
eventsApp = {};

//store user input in a variable to make API call
eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events";

eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

eventsApp.userPickDate = '',
  eventsApp.userPickCity = '',
  eventsApp.eventsArray = [],

  eventsApp.getEvents = (city, date) => {
    $.ajax({
      type: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&city=${city}&startDateTime=${date}T00:00:00Z&endDateTime=${date}T23:00:00Z`,
      async: true,
      dataType: "json",

      success: function (res) {
        console.log(res);
        eventsApp.displayEvents(res);
        // Parse the response.
        // Do other things.
      },
      error: function (xhr, status, err) {
        console.log("NO EVENTS!!");
        // This time, we do not end up here!
      }
    });
  },
  eventsApp.getUserPickCity = () => {
    //Gets the value of selected city
    $('select').on('change', function () {
      eventsApp.userPickCity = $('select').val();
    });

  }
eventsApp.displayEvents = (result) => {
  $('.displayEvents').empty();
  for (let i = 0; i < 3; i++) {

    $('.displayEvents').append(`<div>
                                    <h2>${result._embedded.events[i].name}</h2>
                                    <p>${result._embedded.events[i]._embedded.venues[0].name}</p>
                                    <p>${result._embedded.events[i].dates.start.localTime}</p>
                                    <img src="${result._embedded.events[i].images[4].url}" alt=""/>
                                    <a href="${result._embedded.events[i].url}">get tickets</a>
                                    </div>`);

  }

}

eventsApp.calendar = () => {
  $('.myCalendar').calendar({
    date: new Date(),
    autoSelect: false, // false by default
    select: function (date) {
      console.log('SELECT', date)
      const formatDate = new Date(date);
      const dateString = new Date(formatDate.getTime() - (formatDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
      console.log("Format date", dateString);
      eventsApp.userPickDate = dateString;
      eventsApp.getEvents(eventsApp.userPickCity, eventsApp.userPickDate);
    },
    toggle: function (y, m) {
      console.log('TOGGLE', y, m)
    }
  })
}
//create document ready
$(document).ready(function () {
  eventsApp.getUserPickCity();
  eventsApp.calendar();

});


//store the API data in an array
//if event is happening display events using, if no events happening use .fail() to display "no events happening today"


//display values of the array name, venue, image, ticket purchase url