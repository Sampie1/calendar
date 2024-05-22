document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: '',
      left: 'title',
      right: 'addEventButton, dayGridYear,dayGridMonth,timeGridWeek,timeGridDay today prev,next'
    },
    customButtons: {
      addEventButton: {
        text: 'Afspraak toevoegen',
        click: function () {
          var dateStr = prompt('Voer datum in. Voorbeeld: YYYY-MM-DD');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time

          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: 'Afspraak',
              start: date,
              allDay: false
            });
            alert('Great. Now, update your database...');
          } else {
            alert('Ongeldige datum');
          }
        }
      }
    },
    eventSources: [

      // your event source
      {
        events: [ // put the array in the `events` property
          {
            title: 'event1',
            start: '2010-01-01'
          },
          {
            title: 'event2',
            start: '2010-01-05',
            end: '2024-05-23'
          },
          {
            title: 'event3',
            start: '2010-01-09T12:30:00',
          }
        ],
        color: 'black',     // an option!
        textColor: 'yellow' // an option!
      }
    ],
    locale: 'nl',

    // make user choosable
    weekends: false,
    weekNumbers: true,
    showNonCurrentDates: false,
    navLinks: true,
    nowIndicator: true,
    dayMaxEventRows: 5,

    // end user choosable

    selectable: true,
    editable: true,

    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '08:00',
      endTime: '18:00',
    },
    views: {
      dayGridYear: {
        titleFormat: {
          year: 'numeric'
        },
      },
      dayGridMonth: {
        titleFormat: {
          year: 'numeric',
          month: 'long'
        },
      },
      dayGridWeek: {
        titleFormat: {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
      },
      dayGridDay: {
        titleFormat: {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
      },
      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
    },

    eventClick: function (info) {
      info.jsEvent.preventDefault();
      console.log(info.event);
      openCalendarItemModal(info.event);
    },
  });

  calendar.render();

  console.log(calendar.getEvents());
});

function formatIsoDate(isoStringStart, isoStringEnd) {
  var dateStart = isoStringStart.slice(0, 10).split('-').reverse().join('-');
  var timeStart = isoStringStart.slice(11, 16);

  var dateEnd = isoStringEnd.slice(0, 10).split('-').reverse().join('-');
  var timeEnd = isoStringEnd.slice(11, 16);

  if (dateStart === dateEnd) {
    return dateStart + ' ' + timeStart + ' - ' + timeEnd;
  }

  return dateStart + ' ' + timeStart + ' - ' + dateEnd + ' ' + timeEnd;
}

function openCalendarItemModal(event) {
  $('#calendar-item-title').text(event.title);
  $('#calendar-item-description').text(event.extendedProps.description);
  $('#calendar-item-location').text(event.extendedProps.location);

  $.ajax({
    url: event.url,
    type: 'GET',
    success: function (response) {
      $('#calender-item-container').html(response);
    }
  });

  // set URL
  $('#calendar-item-url').attr('href', event.url);

  $.magnificPopup.open({
    items: {
      src: '#calendar-item-modal',
      type: 'inline'
    },
  });
}
