// calendar.js
const eventsData = {
    "2025-01-15": ["FBLA Meeting", "Deadline for Competitive Events Registration"],
    "2025-02-10": ["Regional Competition"],
    "2025-03-05": ["FBLA Networking Event"]
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
                cell.addEventListener('click', () => showEvents(fullDate)); // Show events when a day is clicked
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
        if (date > daysInMonth) break;
    }
}

// Show events for a selected date
function showEvents(date) {
    const selectedDateElement = document.getElementById('selected-date');
    selectedDateElement.innerText = date;

    const eventList = document.getElementById('events');
    eventList.innerHTML = ''; // Clear previous events

    if (eventsData[date]) {
        eventsData[date].forEach(event => {
            const li = document.createElement('li');
            li.innerText = event;
            eventList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.innerText = "No events for this day.";
        eventList.appendChild(li);
    }
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
