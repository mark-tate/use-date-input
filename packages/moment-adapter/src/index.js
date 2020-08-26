import { formatNames } from "@use-date-input/common";

import moment from "moment";

const formats = {
  [formatNames.ARIA_DAY_LABEL]: "Do MMMM YYYY",
  [formatNames.ARIA_START_LABEL]: date =>
    `Selected ${date.format("Do MMMM YYYY")} as start date`,
  [formatNames.ARIA_END_LABEL]: date =>
    `Selected ${date.format("Do MMMM YYYY")} as end date`,
  [formatNames.ISO]: "YYYY-MM-DD",
  [formatNames.HEADER]: "YYYY",
  [formatNames.DAY]: "D",
  [formatNames.DAY_OF_WEEK_ABBREVIATED]: "dd",
  [formatNames.DAY_OF_WEEK_FULL]: "dddd",
  [formatNames.MONTH]: "M",
  [formatNames.MONTH_ABBREVIATED]: "MMM",
  [formatNames.MONTH_FULL]: "MMMM",
  [formatNames.YEAR]: "YYYY"
};

export const adapter = ({ weekOffset = 0 } = {}) => ({
  addDays: (date, daysToAdd) => date.clone().add(daysToAdd, "days"),
  addMonths: (date, daysToAdd) => date.clone().add(daysToAdd, "months"),
  addWeeks: (date, daysToAdd) => date.clone().add(daysToAdd, "weeks"),
  addYears: (date, daysToAdd) => date.clone().add(daysToAdd, "years"),
  createDate: (...dateArgs) => moment(...dateArgs),
  daysInMonth: date => date.daysInMonth(),
  dayOfWeek: date => date.day(),
  diffInDays: (date, dateToCompare) => date.diff(dateToCompare, "day"),
  diffInMonths: (date, dateToCompare) => date.diff(dateToCompare, "month"),
  endOfMonth: date => date.clone().endOf("month"),
  endOfWeek: date => {
    const weekEnd = date.clone().endOf("week");
    return weekEnd.add(weekOffset, "days");
  },
  endOfYear: date => date.clone().endOf("year"),
  format: (date, formatString) => date.format(formatString),
  getDateFormat: name => formats[name],
  isAfter: (date, dateToCompare) =>
    date && dateToCompare && date.isAfter(dateToCompare, "day"),
  isBefore: (date, dateToCompare) =>
    date && dateToCompare && date.isBefore(dateToCompare, "day"),
  isBetween: (date, startDate, endDate) =>
    date &&
    startDate &&
    endDate &&
    date.isBetween(startDate, endDate, null, "[]"),
  isSameDay: (date, dateToCompare) =>
    date && dateToCompare && date && date.isSame(dateToCompare, "day"),
  isSameMonth: (date, dateToCompare) =>
    date && dateToCompare && date.isSame(dateToCompare, "month"),
  isValid: date => date && date.isValid() && date.year() >= 1000,
  set: (date, value) => date.set(value),
  startOfMonth: date => date.clone().startOf("month"),
  startOfWeek: date => {
    const weekStart = date.clone().startOf("week");
    return weekStart.clone().add(weekOffset, "days");
  },
  startOfYear: date => date.clone().startOf("year"),
  subtractDays: (date, daysToSubtract) =>
    date.clone().subtract(daysToSubtract, "days"),
  subtractMonths: (date, daysToSubtract) =>
    date.clone().subtract(daysToSubtract, "months"),
  subtractWeeks: (date, daysToSubtract) =>
    date.clone().subtract(daysToSubtract, "weeks"),
  subtractYears: (date, daysToSubtract) =>
    date.clone().subtract(daysToSubtract, "years")
});
