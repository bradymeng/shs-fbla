// calendar.js
const eventsData = {
    "2025-01-15": {
        event: "FBLA Meeting",
        timeStart: "3:30 PM",
        timeEnd: "4:30 PM",
        info: "Discuss upcoming competitions and networking opportunities."
    },
    "2025-01-20": {
        event: "Deadline for Competitive Events Registration",
        timeStart: "11:59 PM",
        timeEnd: "11:59 PM",
        info: "Make sure to submit all required documents before midnight!"
    },
    "2025-02-10": {
        event: "Regional Competition",
        timeStart: "8:00 AM",
        timeEnd: "5:00 PM",
        info: "Held at XYZ Convention Center. Bring all required materials."
    },
    "2025-03-05": {
        event: "FBLA Networking Event",
        timeStart: "6:00 PM",
        timeEnd: "9:00 PM",
        info: "Meet professionals and alumni in the business field."
    },
    "2025-03-28": {
        event: "FBLA state",
        timeStart: "6:00 AM",
        timeEnd: "1:00 AM",
        info: "State competition lock in man"
    }
};

let currentDate = new Date();

function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Set the month/year in the header
    const monthYear = document.getElementById('month-year');
    monthYear.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const daysInMonth = lastDate.getDate();

    const calendarBody = document.querySelector('#calendar tbody');
    calendarBody.innerHTML = ''; // Clear previous days

    let date = 1;
    for (let i = 0; i < 6; i++) { // 6 rows (weeks)
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) { // 7 days (Sunday to Saturday)
            const cell = document.createElement('td');
            if (i === 0 && j < firstDay.getDay()) {
                // Empty cells before the start of the month
                row.appendChild(cell);
            } else if (date <= daysInMonth) {
                const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                cell.innerText = date;
                cell.classList.add("calendar-day");

                // Highlight days with events
                if (eventsData[fullDate]) {
                    cell.classList.add("event-day");
                }

                cell.addEventListener('click', () => showEvents(fullDate)); // Show events when a day is clicked
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
        if (date > daysInMonth) break;
    }

    // Render important dates at the bottom
    renderImportantDates();
}

// Show events for a selected date
function showEvents(date) {
    const selectedDateElement = document.getElementById('selected-date');
    selectedDateElement.innerText = date;

    const eventList = document.getElementById('events');
    eventList.innerHTML = ''; // Clear previous events

    if (eventsData[date]) {
        const eventInfo = eventsData[date];
        eventList.innerHTML = `
            <h4>${eventInfo.event}</h4>
            <p><strong>Time:</strong> ${eventInfo.timeStart} - ${eventInfo.timeEnd}</p>
            <p><strong>Details:</strong> ${eventInfo.info}</p>
        `;
    } else {
        eventList.innerHTML = "<p>No events for this day.</p>";
    }
}

// Display important dates below the calendar
function renderImportantDates() {
    const importantDatesContainer = document.getElementById("important-dates");
    importantDatesContainer.innerHTML = "<h3>Important Dates</h3>";

    Object.keys(eventsData).forEach(date => {
        const event = eventsData[date];
        const eventItem = document.createElement("p");
        eventItem.innerHTML = `<strong>${date}:</strong> ${event.event} (${event.timeStart} - ${event.timeEnd})`;
        importantDatesContainer.appendChild(eventItem);
    });
}

// Event listeners for navigation buttons
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();


