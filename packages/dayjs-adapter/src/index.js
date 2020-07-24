import { formatNames } from "@use-date-input/common";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

const formats = {
  [formatNames.ARIA_DAY_LABEL]: "dddd Do MMMM YYYY",
  [formatNames.ARIA_START_LABEL]: date =>
    `Selected ${date.format("dddd Do MMMM YYYY")} as start date`,
  [formatNames.ARIA_END_LABEL]: date =>
    `Selected ${date.format("dddd Do MMMM YYYY")} as end date`,
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

const adaptDateAPI = ({ weekOffset = 0 } = {}) => ({
  addDays: (date, daysToAdd) => date.add(daysToAdd, "days"),
  addMonths: (date, daysToAdd) => date.add(daysToAdd, "months"),
  addWeeks: (date, daysToAdd) => date.add(daysToAdd, "weeks"),
  addYears: (date, daysToAdd) => date.add(daysToAdd, "years"),
  createDate: (...dateArgs) => dayjs(...dateArgs),
  daysInMonth: date => date.daysInMonth(),
  dayOfWeek: date => date.day(),
  diffInDays: (date, dateToCompare) => date.diff(dateToCompare, "day"),
  diffInMonths: (date, dateToCompare) => date.diff(dateToCompare, "month"),
  endOfMonth: date => date.endOf("month"),
  endOfWeek: date => {
    const weekEnd = date.endOf("week");
    return weekEnd.add(weekOffset, "days");
  },
  endOfYear: date => date.endOf("year"),
  format: (date, formatString) => date.format(formatString),
  getDateFormat: name => formats[name],
  isAfter: (date, dateToCompare) =>
    date && dateToCompare && date.isSameOrAfter(dateToCompare, "day"),
  isBefore: (date, dateToCompare) =>
    date && dateToCompare && date.isSameOrBefore(dateToCompare, "day"),
  isBetween: (date, startDate, endDate) =>
    date &&
    startDate &&
    endDate &&
    date.isBetween(startDate, endDate, null, "[]"),
  isSameDay: (date, dateToCompare) =>
    date && dateToCompare && date.isSame(dateToCompare, "day"),
  isSameMonth: (date, dateToCompare) =>
    date && dateToCompare && date.isSame(dateToCompare, "month"),
  isValid: date => date && date.isValid(date) && date.year() >= 1000,
  set: (date, value) => {
    return Object.keys(value).reduce((accumulatedDate, key) => {
      accumulatedDate = accumulatedDate.set(key, value[key]);
      return accumulatedDate;
    }, date);
  },
  startOfMonth: date => date.startOf("month"),
  startOfWeek: date => {
    const weekStart = date.startOf("week");
    return weekStart.add(weekOffset, "days");
  },
  startOfYear: date => date.startOf("year"),
  subtractDays: (date, daysToSubtract) => date.subtract(daysToSubtract, "days"),
  subtractMonths: (date, daysToSubtract) =>
    date.subtract(daysToSubtract, "months"),
  subtractWeeks: (date, daysToSubtract) =>
    date.subtract(daysToSubtract, "weeks"),
  subtractYears: (date, daysToSubtract) =>
    date.subtract(daysToSubtract, "years")
});

export default adaptDateAPI;
