import { formatNames } from "@use-date-input/common";

const createDateAPI = ({
  adapter,
  isDayDisabled,
  numOfVisibleMonths = 1,
  weekOffset = 0
} = {}) => {
  if (!adapter) {
    throw new Error("createDateAPI called without an adapter");
  }
  const adaptedDateAPI = adapter({ weekOffset });
  const {
    addDays,
    addMonths,
    createDate,
    dayOfWeek,
    endOfMonth,
    endOfWeek,
    format,
    getDateFormat,
    subtractDays,
    startOfWeek
  } = adaptedDateAPI;
  return {
    getLastVisibleDate: startVisibleDate =>
      endOfMonth(addMonths(startVisibleDate, numOfVisibleMonths - 1)),
    getNumberVisibleMonths: () => numOfVisibleMonths,
    getFirstDayOfWeek: () => {
      const firstDOW = startOfWeek(createDate());
      return dayOfWeek(firstDOW);
    },
    getLastDayOfWeek: () => {
      const lastDOW = endOfWeek(createDate());
      return dayOfWeek(lastDOW);
    },
    isDayDisabled,
    nextEnabledDate: date => {
      let nextEnabledDate = date;
      while (isDayDisabled(nextEnabledDate)) {
        nextEnabledDate = addDays(nextEnabledDate, 1);
      }
      return nextEnabledDate;
    },
    previousEnabledDate: date => {
      let prevEnabledDate = date;
      while (isDayDisabled(prevEnabledDate)) {
        prevEnabledDate = subtractDays(prevEnabledDate, 1);
      }
      return prevEnabledDate;
    },
    toFormattedDate: (date, formatName = formatNames.ISO) => {
      const formatter = getDateFormat(formatName);
      return typeof formatter === "function"
        ? formatter(date)
        : format(date, formatter);
    },
    ...adaptedDateAPI
  };
};

export default createDateAPI;
