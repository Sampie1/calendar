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
            title: 'event1',
            start: '2024-05-24T08:30:00',
            end: '2024-05-24T13:30:00',
            color: 'green',     // an option!
            textColor: 'white' // an option!
          },
          {
            id: 'event-2',
            title: 'event2',
            start: '2024-05-23T09:00:00',
            end: '2024-05-23T12:30:00',
            color: 'purple',     // an option!
            textColor: 'white' // an option!
          },
          {
            id: 'event-3',
            title: 'event3',
            start: '2024-05-23T12:50:00',
            end: '2024-05-23T14:00:00',
            color: 'blue',     // an option!
            textColor: 'white' // an option!
          },
          {
            id: 'event-4',
            title: 'event4',
            start: '2024-05-01T12:50:00',
            end: '2024-05-01T14:00:00',
            color: 'blue',     // an option!
            textColor: 'white' // an option!
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
  console.log(event);
  var eventModal = new bootstrap.Modal('#eventModal', {
    keyboard: false
  })
  eventModal.show();
  document.getElementById('event-titel').innerHTML = 'event titel';
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
        <div class="modal-content" style="text-align: center;">
          <div class="modal-header">
            <h5 class="modal-title">Afspraak toevoegen aan de kalender</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div style="background-color:#fff; class="modal-body">
            <label for="Datum"><b>Voer datum in:</b></label>
            <br>
            <p>Voorbeeld: 2024-05-23</p>
            <input type="text" name="date" style="margin-bottom: 10px">
          </div>
          <div class="modal-footer" style="background-color:#fff;">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="background-color: #fff; color: black;">Close</button>
            <button type="button" class="btn btn-primary" style="background-color: #9c0082;">Save changes</button>
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


