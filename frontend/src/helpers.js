export function updateDateTime(dateObj, timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);

    const date = new Date(dateObj);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
}
export function formatDateForDisplay(datetimeStr) {
    const [datePart, timePart] = datetimeStr.split("_");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    const date = new Date(2000 + year, month - 1, day, hour, minute, second);
    const options = { weekday: 'long' }; // e.g., "Thursday"
    const weekday = date.toLocaleDateString('en-US', options);

    return `${weekday}, ${datePart}`;
}

export function formatTimeForDisplay(datetimeStr) {
    const [_, timePart] = datetimeStr.split("_");
    const [hour, minute] = timePart.split(":").map(Number);

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export function formatDateFromDateObject(date) {

    const dateObj = new Date(date);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2); // get last 2 digits

    return `${day}/${month}/${year}`;
}

export function formatTimeFromDateObject(date) {

    const dateObj = new Date(date);

    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`20${year}`, month - 1, day);
};

export const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    console.log(time12h)
    hours = Number(hours);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return `${hours}:${minutes}`;
};

export const EVENT_TYPES = ["Merger", "Dividends", "New Capital", "Hire"];

export const GROUP_MAPPING = EVENT_TYPES.reduce((acc, type, index) => {
    acc[type] = index + 1;
    return acc;
  }, {});
  
export const GROUPS = EVENT_TYPES.map((type, index) => ({
    id: index + 1,
    title: type
  }));