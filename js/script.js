//user will select specifc date from date picker
//make object array
eventsApp = {};

//store user input in a variable to make API call
eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events.json";

eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

eventsApp.userPickDate = '',
  eventsApp.userPickCity = '',
  eventsApp.userPickEvents = '',
  eventsApp.eventsArray = [],

  eventsApp.getEvents = (city, date, segmentName) => {
    $.ajax({
      type: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=KA2M6AWn63bg3pVc9OkXqcDPqV2x2Dbc&city=${city}&startDateTime=${date}T00:00:00Z&endDateTime=${date}T23:00:00Z&segmentName=${segmentName}`,
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
  eventsApp.getUserInput = () => {
    
    
    //Gets the value of selected city
    $('.dropdownCityContent').on('click', 'li', function (e) {
     e.stopPropagation();
      eventsApp.userPickCity = $(this).text();
     $('.dropbtn1').text(eventsApp.userPickCity);
     console.log("city click", eventsApp.userPickCity);
    });

    //Gets the value of selected event
  $('.dropdownEventContent').on('click', 'li', function (e) {
    e.stopPropagation();
    eventsApp.userPickEvents = $(this).text();
    $('.dropbtn2').text(eventsApp.userPickEvents);
    console.log("Events click", eventsApp.userPickEvents);
    });
  }


eventsApp.displayEvents = (result) => {
  $('.displayEvents').empty();
  result._embedded.events.forEach(function (events) {
    eventsApp.eventsArray.push(events);
  });

  function getRandomEvents() {
    const randomEvents = Math.floor(Math.random() * eventsApp.eventsArray.length);
    return eventsApp.eventsArray[randomEvents];
  }
  for (let i = 0; i < 3; i++) {

    const index = getRandomEvents();
    console.log("Show index", index);
    console.log("index.name", index.name);
    console.log("index._embedded.venues[0].name", index._embedded.venues[0].name);
    console.log("index.dates.start.localTime", index.dates.start.localTime);
    console.log(index.images[0].url);
    console.log(index.url);


    const imageSize = index.images.find(image => image.width === 1024);
  
      console.log(imageSize);

    $('.displayEvents')
      .append(`<div>
                    <h2>${index.name}</h2>
                    <p>${index._embedded.venues[0].name}</p>
                    <p>${index.dates.start.localTime}</p>
                    <img src="${imageSize.url}" alt=""/>
                    <a href="${index.url}">get tickets</a>
                </div>`);
  }
  eventsApp.eventsArray = [];
}

eventsApp.calendar = () => {
  $('.myCalendar').calendar({
    date: new Date(),
    autoSelect: false, // false by default
    select: function (date) {
  
      const formatDate = new Date(date);
      const dateString = new Date(formatDate.getTime() - (formatDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
     
      eventsApp.userPickDate = dateString;
     
      eventsApp.getEvents(eventsApp.userPickCity, eventsApp.userPickDate, eventsApp.userPickEvents);
    },
    toggle: function (y, m) {
  
    }
  })
}
//create document ready
$(document).ready(function () {
  eventsApp.getUserInput();
  eventsApp.calendar();

});


//store the API data in an array
//if event is happening display events using, if no events happening use .fail() to display "no events happening today"


//display values of the array name, venue, image, ticket purchase url