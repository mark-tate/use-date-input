import { formatNames } from "@use-date-input/common";

import { DateTime } from "luxon";

const formats = {
  [formatNames.ARIA_DAY_LABEL]: "DDDD",
  [formatNames.ARIA_START_LABEL]: date =>
    `Selected ${date.toFormat("DDDD")} as start date`,
  [formatNames.ARIA_END_LABEL]: date =>
    `Selected ${date.toFormat("DDDD")} as end date`,
  [formatNames.ISO]: "yyyy-MM-dd",
  [formatNames.HEADER]: "yyyy",
  [formatNames.DAY]: "d",
  [formatNames.DAY_OF_WEEK_ABBREVIATED]: "EEEEE",
  [formatNames.DAY_OF_WEEK_FULL]: "EEEE",
  [formatNames.MONTH]: "M",
  [formatNames.MONTH_ABBREVIATED]: "MMM",
  [formatNames.MONTH_FULL]: "MMMM",
  [formatNames.YEAR]: "yyyy"
};

const roundDown = value => {
  const roundingMethod = value < 0 ? Math.ceil : Math.floor;
  return roundingMethod(value);
};

const adaptDateAPI = ({ weekOffset } = {}) => ({
  addDays: (date, daysToAdd) => date.plus({ days: daysToAdd }),
  addMonths: (date, monthsToAdd) => date.plus({ months: monthsToAdd }),
  addWeeks: (date, weeksToAdd) => date.plus({ weeks: weeksToAdd }),
  addYears: (date, yearsToAdd) => date.plus({ years: yearsToAdd }),
  createDate: date => {
    return !date ? DateTime.local() : DateTime.fromISO(date);
  },
  dayOfWeek: date => date.weekday,
  daysInMonth: date => date.daysInMonth,
  diffInDays: (date, dateToCompare) =>
    roundDown(date.diff(dateToCompare, "day").days),
  diffInMonths: (date, dateToCompare) =>
    roundDown(date.diff(dateToCompare, "month").months),
  endOfMonth: date => date.endOf("month"),
  endOfWeek: date => {
    const isoWeekEnd = date.endOf("week");
    return isoWeekEnd.plus({ days: weekOffset });
  },
  endOfYear: date => date.endOf("year"),
  format: (date, formatString) => date.toFormat(formatString),
  getDateFormat: name => formats[name],
  isAfter: (date, dateToCompare) =>
    dateToCompare && date.startOf("day") > dateToCompare.startOf("day"),
  isBefore: (date, dateToCompare) =>
    dateToCompare && date.startOf("day") < dateToCompare.startOf("day"),
  isBetween: (date, startDate, endDate) =>
    startDate &&
    endDate &&
    date.startOf("day") >= startDate.startOf("day") &&
    date.startOf("day") <= endDate.startOf("day"),
  isSameDay: (date, dateToCompare) => {
    return date && dateToCompare && date.hasSame(dateToCompare, "day");
  },
  isSameMonth: (date, dateToCompare) =>
    date && dateToCompare && date.hasSame(dateToCompare, "month"),
  isValid: date => date.isValid && date.year >= 1000,
  set: (date, value) => {
    const { date: day, ...rest } = value;
    return date.set({ ...rest, day });
  },
  startOfMonth: date => date.startOf("month"),
  startOfWeek: date => {
    const isoWeekStart = date.startOf("week");
    return isoWeekStart.plus({ days: weekOffset });
  },
  startOfYear: date => date.startOf("year"),
  subtractDays: (date, daysToSubtract) => date.minus({ days: daysToSubtract }),
  subtractMonths: (date, monthsToSubtract) =>
    date.minus({ months: monthsToSubtract }),
  subtractWeeks: (date, weeksToSubtract) =>
    date.minus({ weeks: weeksToSubtract }),
  subtractYears: (date, yearsToSubtract) =>
    date.minus({ years: yearsToSubtract })
});

export default adaptDateAPI;
