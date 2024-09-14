function sortEventsByDate(events) {
  return events.sort((a, b) => {
    if (a.date === b.date) {
      return a.startTime.localeCompare(b.startTime);
    }
    return a.date.localeCompare(b.date);
  });
}

function validateTime(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}:00`)
  const end = new Date(`1970-01-01T${endTime}:00`)
  if (end < start) {
    return false;
  }
  return true;
}
module.exports = { sortEventsByDate, validateTime };