
const DAYS = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
};

class DayFormatter {

  static dayOfWeek(day) {
    // take the day - 1 (for zero-index) mod 7 for day of week, plus 1 to restore index
    return (day - 1) % 7 + 1;
  }

  static groupConsecutiveDays(days) {
    if (days.length == 1) return [days];
    days = days.sort((a,b) => a - b);
    return days.reduce((acc, day, i) => {
      if (!Array.isArray(acc)) acc = [[acc]]; // initialize the accumulator

      let subArray = acc[acc.length - 1]; // get the last group of days
      let prevDay = subArray[subArray.length - 1];

      let nextFromLast = prevDay + 1;

      if (DayFormatter.dayOfWeek(nextFromLast) == DayFormatter.dayOfWeek(day)) { // if the previous day + 1 is equal to the current day...
        subArray.push(DayFormatter.dayOfWeek(day)); // ... add the day to the array
      } else {
        acc.push([DayFormatter.dayOfWeek(day)]); // ... create and initalize a new group
      }

      return acc; // return the array of groups;
    });
  }

  static groupedDaysToString(groups) {
    return groups.map(s => {
      let dayArray = s.map(d => DAYS[d]);
      if (dayArray.length > 2) {
        let firstDay = dayArray.shift();
        let lastDay = dayArray.pop();
        return [firstDay, lastDay].join(' - ');
      } else {
        return dayArray.join(', ');
      }
    }).join(', ');
  }

  static formatDayRange(days) {
    if (days.length == 1) return DAYS[days[0]];

    let groups = DayFormatter.groupConsecutiveDays(days);
    return DayFormatter.groupedDaysToString(groups);
  }

}

module.exports = DayFormatter;
