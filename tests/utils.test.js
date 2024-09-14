const { sortEventsByDate, validateTime } = require('../utils/util');

describe('sortEventsByDate', () => {
  it('should sort events by date and startTime', () => {
    const events = [
      { date: '2024-09-13', startTime: '14:00' },
      { date: '2024-09-13', startTime: '10:00' },
      { date: '2024-09-12', startTime: '09:00' }
    ];
    const sorted = sortEventsByDate(events);
    expect(sorted[0].date).toBe('2024-09-12');
    expect(sorted[1].startTime).toBe('10:00');
  });

  it('validateTime should check if endTime is not earlier than startTime', () => {
    const result1 = validateTime('09:00', '10:00');
    const result2 = validateTime('10:00', '09:00');
    expect(result1).toBe(true); // Valid case
    expect(result2).toBe(false); // Invalid case
  });
});


