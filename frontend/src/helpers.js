export function updateDateTime(dateStr, timeStr) {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(":").map(Number);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const pad = (n) => n.toString().padStart(2, "0");

    const formattedDate = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date
        .getFullYear()
        .toString()
        .slice(2)}_${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
        )}`;

    return formattedDate;
};

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