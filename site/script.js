document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');


  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: '',
      left: 'title',
      right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay today prev,next'
    },


    eventSources: [
      // your event source
      {
        events: [ // put the array in the `events` property
          {
            id: 'event-1',
            title: 'Event 1 titel',
            start: '2024-05-01T08:30:00',
            end: '2024-05-01T13:30:00',
            color: 'green',     // an option!
            textColor: 'white', // an option!
            description: 'Tijd: 08:30 - 13:30. <br> Dit is de beschijving van event 1 lorem 111111111111111111111111111111111111111111111111111111',
          },
          {
            id: 'event-2',
            title: 'Event 2 titel',
            start: '2024-05-23T09:00:00',
            end: '2024-05-23T12:30:00',
            color: 'purple',     // an option!
            textColor: 'white', // an option!
            description: 'Tijd: 09:00 - 12:30. <br> Dit is de beschijving van event 2',
          },
          {
            id: 'event-3',
            title: 'Event 3 titel',
            start: '2024-05-23T12:30:00',
            end: '2024-05-23T14:00:00',
            color: 'blue',     // an option!
            textColor: 'white', // an option!
            description: 'Tijd: 12:30 - 15:00. <br> Dit is de beschijving van event 3'
          },
          {
            id: 'event-4',
            title: 'Event 4 titel',
            start: '2024-05-24T12:50:00',
            end: '2024-05-24T14:00:00',
            color: 'blue',     // an option!
            textColor: 'white', // an option!
            description: 'Tijd: 12:50 - 14:00. <br> Dit is de beschijving van event 4',
            myPersonalVariable: 'test'
          },
          {
            id: 'event-5',
            title: 'Event 5 titel',
            start: '2024-05-27T12:30:00',
            end: '2024-05-27T14:00:00',
            color: 'yellow',     // an option!
            textColor: 'white', // an option!
            description: 'Tijd: 12:30 - 14:00. <br> Dit is de beschijving van event 5'
          },
          {
            id: 'event-6',
            title: 'Event 6 titel',
            start: '2024-05-28T09:30:00',
            end: '2024-05-28T12:15:00',
            color: 'orange',     // an option!
            textColor: 'white', // an option!
            description: 'Tijd: 09:30 - 12:15. <br> Dit is de beschijving van event 6'
          }
        ],
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
      openCalendarItemModal(info.event);
    },
  });

  calendar.render();

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
  console.log(event);
  var eventModal = new bootstrap.Modal('#eventModal', {
    keyboard: false
  })
  eventModal.show();
  document.getElementById('event-titel').innerHTML = event.title;
  document.getElementById('event-beschrijving').innerHTML = event.extendedProps.description;

  console.log(event.id);
  console.log(event.title);
  console.log(event.start);
  console.log(event.end);
  console.log(event.url);
  console.log(event.backgroundColor);
  console.log(event.textColor);
  console.log(event.extendedProps.description);
  console.log(event.extendedProps.myPersonalVariable);

  // Event
  // event.id = id
  // event.title = title
  // event.start = start tijd
  // event.end = eind tijd
  // event.color = achtergrond kleur
  // event.textColor = text kleur
  // event.url = link
  // event.description = beschrijving
  // event extendedProps = custom properties
    //  event.ExtendedProps.myPersonalVariable = custom property

}


var modalWrap = null;
const showModal = () => {
  if (modalWrap !== null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Afspraak toevoegen aan de kalender</h5>
          </div>
          <div class="modal-body">
          <br>
            <label for="Datum"><b>Datum:</b></label>
            <br>
            <p>Voorbeeld: 2024-05-23</p>
            <input type="text" name="date" style="margin-bottom: 10px">
            <br>
            <label for="Tijd"><b>Tijd:</b></label>
            <p>Voorbeeld: 12:30:00</p>
            <input type="text" name="date" style="margin-bottom: 10px">
            <br>
            <label for="Tijd"><b>Beschrijving:</b></label>
            <p></p>
            <input type="text" name="date" style="margin-bottom: 20px;">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sluiten</button>
            <button type="button" class="btn btn-primary">Opslaan</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(modalWrap);

  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
};

document.querySelector('.btn-toevoegen').addEventListener('click', showModal);


