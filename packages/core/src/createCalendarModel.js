const chunk = (values, chunkSize = 1) => {
  const valueCopy = [...values];
  const result = [];
  while (valueCopy.length) result.push(valueCopy.splice(0, chunkSize));
  return result;
};

export default function createCalendarModel(
  date,
  {
    addDays,
    dayOfWeek,
    daysInMonth,
    diffInDays,
    endOfWeek,
    getFirstDayOfWeek,
    startOfMonth,
    subtractDays,
    startOfWeek
  }
) {
  const monthStart = startOfMonth(date);
  const weekStart = startOfWeek(monthStart);
  let prevMonthDays = [];
  if (dayOfWeek(monthStart) !== getFirstDayOfWeek()) {
    const prevMonthDaysOffset = diffInDays(weekStart, monthStart);
    if (prevMonthDaysOffset < 0) {
      const prevMonthDaysLength = prevMonthDaysOffset * -1;
      prevMonthDays = [...new Array(prevMonthDaysLength)].map((value, day) =>
        subtractDays(monthStart, prevMonthDaysLength - day)
      );
    }
  }
  const currentMonthDays = [
    ...new Array(daysInMonth(monthStart))
  ].map((value, day) => addDays(monthStart, day));
  let lastWeekInMonth = endOfWeek(
    currentMonthDays[currentMonthDays.length - 1]
  );
  let nextMonthDays = [];
  const lastWeekInMonthLength = diffInDays(
    lastWeekInMonth,
    currentMonthDays[currentMonthDays.length - 1]
  );

  if (lastWeekInMonthLength > 0) {
    nextMonthDays = [...new Array(lastWeekInMonthLength)].map((value, day) =>
      addDays(currentMonthDays[currentMonthDays.length - 1], day + 1)
    );
  }
  return chunk([...prevMonthDays, ...currentMonthDays, ...nextMonthDays], 7);
}
