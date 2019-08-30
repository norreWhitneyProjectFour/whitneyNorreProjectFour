//user will select specifc date from date picker
//make object array
eventsApp = {};

//store user input in a variable to make API call
eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events";

eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

eventsApp.userPickDate = '',
  eventsApp.userPickCity = '',
  eventsApp.userPickEvents = '',
  eventsApp.eventsArray = [],

  eventsApp.getEvents = (stateCode, date, segmentName) => {
    $.ajax({
      type: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&stateCode=${stateCode}&startDateTime=${date}T00:00:00Z&endDateTime=${date}T23:00:00Z&segmentName=${segmentName}`,
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
    $('#chooseYourCity').on('change', function () {
      eventsApp.userPickCity = $('#chooseYourCity').val();
    });
    //Gets the value of selected event
    $('#chooseYourEvent').on('change', function () {
      eventsApp.userPickEvents = $('#chooseYourEvent').val();
    });
  }

eventsApp.displayEvents = (result) => {
  $('.displayEvents').empty();
  eventsApp.eventsArray = []

  result._embedded.events.forEach(function (events) {
    eventsApp.eventsArray.push(events);
  })
  for (let i = 0; i < 3; i++) {

    const imageSize = eventsApp.eventsArray[i].images.find(image => image.width === 1024);

    // function getRandonEvents() {
    //   const randomEvents = Math.floor(Math.random() * eventsApp.eventsArray.length);
    //   return eventsApp.eventsArray[randomEvents];
    // }


    $('.displayEvents').append(`<div class="displayContents">
                                  <div class="displayContentsImage">
                                    <img class="displayContentsImage"src="${result._embedded.events[i].images[0].url} " alt="${result._embedded.events[i].name} "/>
                                  </div >
                                  <div class="displayContentsName">
                                    <h2>${eventsApp.eventsArray[i].name}</h2>
                                  </div>
                                  <div class="displayContentsVenue">
                                    <p>${result._embedded.events[i]._embedded.venues[0].name}</p>
                                  </div>
                                  <div class="displayContentsTime">
                                    <p>${result._embedded.events[i].dates.start.localTime}</p>
                                  </div>
                                  <div class="displayContentsTickets">
                                    <a href="${result._embedded.events[i].url}">get tickets</a>
                                  </div>
                                </div > `);

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
      eventsApp.getEvents(eventsApp.userPickCity, eventsApp.userPickDate, eventsApp.userPickEvents);
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