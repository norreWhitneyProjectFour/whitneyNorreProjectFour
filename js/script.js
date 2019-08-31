//Object array
eventsApp = {};

eventsApp.url = "https://app.ticketmaster.com/discovery/v2/events.json";
eventsApp.apiKey = "ftYfSGG92vqF6hHoXIE25YwqEXwj0jhe";

eventsApp.userPickDate = '',
eventsApp.userPickCity = '',
eventsApp.userPickEvents = '',

eventsApp.eventsArray = [],

//Function to make API call to Ticketmaster
eventsApp.getEvents = () => {
  $.ajax({
    method: "GET",
    url: eventsApp.url,
    dataType: "json",
    data: {
      apikey: eventsApp.apiKey,
      startDateTime: `${eventsApp.userPickDate}T00:00:00Z`,
      endDateTime: `${eventsApp.userPickDate}T23:00:00Z`,
      city: eventsApp.userPickCity,
      segmentName: eventsApp.userPickEvents
    }
  }).then ((res) => {
    console.log("Then result", res);
      eventsApp.displayEvents(res._embedded.events);
    });
},

//Function to get user selection of city and date     
eventsApp.getUserInput = () => {
  //Gets the value of selected city
  $('.dropdownCityContent').on('click', 'li', function (e) {
    e.stopPropagation();
    eventsApp.userPickCity = $(this).text();
    $('.dropbtn1').text(eventsApp.userPickCity);
    console.log("Pick city", eventsApp.userPickCity);
  });

  //Gets the value of selected event
  $('.dropdownEventContent').on('click', 'li', function (e) {
    e.stopPropagation();
    eventsApp.userPickEvents = $(this).text();
    $('.dropbtn2').text(eventsApp.userPickEvents);
    console.log("Events click", eventsApp.userPickEvents);
    });
   eventsApp.calendar();
},

//Function to display the events 
eventsApp.displayEvents = (result) => {
  $('.displayEvents').empty();
  console.log("Display events");
  result.forEach(function (events) {
    eventsApp.eventsArray.push(events);
  });

  function getRandomEvents() {
    const randomEvents = Math.floor(Math.random() * eventsApp.eventsArray.length);
    return eventsApp.eventsArray[randomEvents];
  }
  
  for (let i = 0; i < 3; i++) {
    const index = getRandomEvents();
    const imageSize = index.images.find(image => image.width === 1024);
    console.log("inside loop", i);
    console.log("random number", index);
    $('.displayEvents')
      .append(`<div>
                    <img src="${imageSize.url}" alt=""/>
                    <h2>${index.name}</h2>
                    <p>${index._embedded.venues[0].name}</p>
                    <p>${index.dates.start.localTime}</p>
                    
                    <a href="${index.url}">get tickets</a>
                </div>`);
  }
  eventsApp.eventsArray = [];
},

//Function to display the calendar plugin 
eventsApp.calendar = () => {
  $('.myCalendar').empty();  
    $('.myCalendar').calendar({
      date: new Date(),
      autoSelect: false, // false by default
      select: function (date) {
        //Change of date format to yyyy-mm-dd
        const formatDate = new Date(date);
        const dateString = new Date(formatDate.getTime() - (formatDate.getTimezoneOffset() * 60000))
          .toISOString()
          .split("T")[0];
        console.log("inside calendar");
        if (eventsApp.userPickCity === '' && eventsApp.userPickEvents === '') {
          alert("Pick a city and event")
        } else if (eventsApp.userPickCity === '') {
          alert('Pick a city');
        } else if (eventsApp.userPickEvents === '') {
          alert('Pick an event');
        } else {

          eventsApp.userPickDate = dateString;
          eventsApp.getEvents();
        }
        
      },
      toggle: function (y, m) { }
    })
},

  
eventsApp.init = () => {
  console.log("Init");
  
  $('.myCalendar').calendar();

  eventsApp.getUserInput();
  
}
//Start of doc ready
$(document).ready(function () {
  eventsApp.init();

});

