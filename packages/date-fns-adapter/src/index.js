import { formatNames } from "@use-date-input/common";

import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import addWeeks from "date-fns/addWeeks";
import addYears from "date-fns/addYears";
import daysInMonth from "date-fns/getDaysInMonth";
import diffInDays from "date-fns/differenceInCalendarDays";
import diffInMonths from "date-fns/differenceInCalendarMonths";
import dayOfWeek from "date-fns/getDay";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import endOfYear from "date-fns/endOfYear";
import format from "date-fns/format";
import getYear from "date-fns/getYear";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import isValid from "date-fns/isValid";
import set from "date-fns/set";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import startOfYear from "date-fns/startOfYear";
import subtractDays from "date-fns/subDays";
import subtractMonths from "date-fns/subMonths";
import subtractWeeks from "date-fns/subWeeks";
import subtractYears from "date-fns/subYears";

const formats = {
  [formatNames.ARIA_DAY_LABEL]: "do MMMM yyyy",
  [formatNames.ARIA_START_LABEL]: date =>
    `Selected ${format(date, "do MMMM yyyy")} as start date`,
  [formatNames.ARIA_END_LABEL]: date =>
    `Selected ${format(date, "do MMMM yyyy")} as end date`,
  [formatNames.ISO]: "yyyy-MM-dd",
  [formatNames.HEADER]: "yyyy",
  [formatNames.DAY]: "d",
  [formatNames.DAY_OF_WEEK_ABBREVIATED]: "EEEEEE",
  [formatNames.DAY_OF_WEEK_FULL]: "EEEE",
  [formatNames.MONTH]: "M",
  [formatNames.MONTH_ABBREVIATED]: "MMM",
  [formatNames.MONTH_FULL]: "MMMM",
  [formatNames.YEAR]: "yyyy"
};

export const adapter = ({ weekOffset = 0 } = {}) => ({
  addDays,
  addMonths,
  addWeeks,
  addYears,
  createDate: (...dateArgs) => new Date(...dateArgs),
  daysInMonth,
  dayOfWeek,
  diffInDays,
  diffInMonths,
  endOfMonth,
  endOfWeek: date => endOfWeek(date, { weekStartsOn: weekOffset }),
  endOfYear,
  format,
  getDateFormat: name => formats[name],
  isAfter,
  isBefore,
  isBetween: (date, startDate, endDate) =>
    isSameDay(date, startDate) ||
    isSameDay(date, endDate) ||
    (isAfter(date, startDate) && isBefore(date, endDate)),
  isSameDay,
  isSameMonth,
  isValid: date => isValid(date) && getYear(date) >= 1000,
  set,
  startOfMonth,
  startOfWeek: date => startOfWeek(date, { weekStartsOn: weekOffset }),
  startOfYear,
  subtractDays,
  subtractMonths,
  subtractWeeks,
  subtractYears
});
