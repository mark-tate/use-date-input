import { formatNames } from "@use-date-input/common";

import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import { parse } from "date-fns";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import moment from "moment";
import createDateAPI from "../createDateAPI";

describe("given adapter", () => {
  describe.each`
    api           | adapter           | weekOffset | monthIndexStartsAt | parse
    ${"date-fns"} | ${dateFnsAdapter} | ${0}       | ${0}               | ${value => parse(value, "dd/MM/yyyy", new Date())}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}       | ${0}               | ${value => dayjs(value, "DD/MM/YYYY")}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}      | ${1}               | ${value => DateTime.fromFormat(value, "dd/MM/yyyy")}
    ${"moment"}   | ${momentAdapter}  | ${0}       | ${0}               | ${value => moment(value, "DD/MM/YYYY")}
  `("for $api", ({ adapter, weekOffset, monthIndexStartsAt, parse }) => {
    const dateAPI = createDateAPI({ adapter, weekOffset });

    it("can create a new date by default", () => {
      expect(dateAPI.createDate()).toBeDefined();
    });

    it("can create a specific date from an ISO date", () => {
      const testDate = dateAPI.createDate("2020-12-20");
      expect(dateAPI.toFormattedDate(testDate, formatNames.ISO)).toEqual(
        "2020-12-20"
      );
    });

    it("can add days", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let incrementedDate = dateAPI.addDays(testDate, 1);
      expect(dateAPI.toFormattedDate(incrementedDate, formatNames.ISO)).toEqual(
        "2020-12-02"
      );
    });

    it("can subtract days", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let decrementedDate = dateAPI.subtractDays(testDate, 1);
      expect(dateAPI.toFormattedDate(decrementedDate, formatNames.ISO)).toEqual(
        "2020-11-30"
      );
    });

    it("can add weeks", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let incrementedDate = dateAPI.addWeeks(testDate, 1);
      expect(dateAPI.toFormattedDate(incrementedDate, formatNames.ISO)).toEqual(
        "2020-12-08"
      );
    });

    it("can subtract weeks", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let decrementedDate = dateAPI.subtractWeeks(testDate, 1);
      expect(dateAPI.toFormattedDate(decrementedDate, formatNames.ISO)).toEqual(
        "2020-11-24"
      );
    });

    it("can add months", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let incrementedDate = dateAPI.addMonths(testDate, 1);
      expect(dateAPI.toFormattedDate(incrementedDate, formatNames.ISO)).toEqual(
        "2021-01-01"
      );
    });

    it("can subtract months", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let decrementedDate = dateAPI.subtractMonths(testDate, 1);
      expect(dateAPI.toFormattedDate(decrementedDate, formatNames.ISO)).toEqual(
        "2020-11-01"
      );
    });

    it("can add years", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let incrementedDate = dateAPI.addYears(testDate, 1);
      expect(dateAPI.toFormattedDate(incrementedDate, formatNames.ISO)).toEqual(
        "2021-12-01"
      );
    });

    it("can subtract years", () => {
      let testDate = dateAPI.createDate("2020-12-01");
      let decrementedDate = dateAPI.subtractYears(testDate, 1);
      expect(dateAPI.toFormattedDate(decrementedDate, formatNames.ISO)).toEqual(
        "2019-12-01"
      );
    });

    it("can return the start of the week", () => {
      let testDate = dateAPI.createDate("2020-01-01");
      let startOfWeek = dateAPI.startOfWeek(testDate);
      expect(dateAPI.toFormattedDate(startOfWeek, formatNames.ISO)).toEqual(
        "2019-12-29"
      );
    });

    it("can return the start of the month", () => {
      let testDate = dateAPI.createDate("2020-01-20");
      let startOfMonth = dateAPI.startOfMonth(testDate);
      expect(dateAPI.toFormattedDate(startOfMonth, formatNames.ISO)).toEqual(
        "2020-01-01"
      );
    });

    it("can return the start of the year", () => {
      let testDate = dateAPI.createDate("2020-06-20");
      let startOfYear = dateAPI.startOfYear(testDate);
      expect(dateAPI.toFormattedDate(startOfYear, formatNames.ISO)).toEqual(
        "2020-01-01"
      );
    });

    it("can return the end of the week", () => {
      let testDate = dateAPI.createDate("2020-01-01");
      let endOfWeek = dateAPI.endOfWeek(testDate);
      expect(dateAPI.toFormattedDate(endOfWeek, formatNames.ISO)).toEqual(
        "2020-01-04"
      );
    });

    it("can return the end of the month", () => {
      let testDate = dateAPI.createDate("2020-01-20");
      let endOfMonth = dateAPI.endOfMonth(testDate);
      expect(dateAPI.toFormattedDate(endOfMonth, formatNames.ISO)).toEqual(
        "2020-01-31"
      );
    });

    it("can return the end of the year", () => {
      let testDate = dateAPI.createDate("2020-06-20");
      let endOfYear = dateAPI.endOfYear(testDate);
      expect(dateAPI.toFormattedDate(endOfYear, formatNames.ISO)).toEqual(
        "2020-12-31"
      );
    });

    it("can return the number of days in the month", () => {
      let testDate = dateAPI.createDate("2019-02-01");
      expect(dateAPI.daysInMonth(testDate)).toEqual(28);
    });

    it("can return the number of days in the month for a leap year", () => {
      let testDate = dateAPI.createDate("2020-02-01");
      expect(dateAPI.daysInMonth(testDate)).toEqual(29);
    });

    it("can determine when dates are the same day", () => {
      let sourceDate = dateAPI.createDate("2020-02-01");
      let tgtDate = dateAPI.createDate("2020-02-01");
      let otherDate = dateAPI.createDate("2020-01-02");
      expect(dateAPI.isSameDay(sourceDate, tgtDate)).toEqual(true);
      expect(dateAPI.isSameDay(sourceDate, otherDate)).toEqual(false);
    });

    it("can determine when dates are the same month", () => {
      let sourceDate = dateAPI.createDate("2020-02-01");
      let tgtDate = dateAPI.createDate("2020-02-01");
      let otherDate = dateAPI.createDate("2020-01-02");
      expect(dateAPI.isSameMonth(sourceDate, tgtDate)).toEqual(true);
      expect(dateAPI.isSameMonth(sourceDate, otherDate)).toEqual(false);
    });

    it("can determine when a date is before another date", () => {
      let beforeDate = dateAPI.createDate("2020-02-01");
      let afterDate = dateAPI.createDate("2020-02-02");
      expect(dateAPI.isBefore(beforeDate, afterDate)).toEqual(true);
      expect(dateAPI.isBefore(afterDate, beforeDate)).toEqual(false);
    });

    it("can determine when a date is after another date", () => {
      let beforeDate = dateAPI.createDate("2020-02-01");
      let afterDate = dateAPI.createDate("2020-02-02");
      expect(dateAPI.isAfter(afterDate, beforeDate)).toEqual(true);
      expect(dateAPI.isAfter(beforeDate, afterDate)).toEqual(false);
    });

    it("can determine when a date is between other dates", () => {
      let tgtDate = dateAPI.createDate("2020-02-20");
      let startDate = dateAPI.createDate("2020-02-01");
      let endDate = dateAPI.createDate("2020-02-21");
      let otherDate = dateAPI.createDate("2020-01-02");
      expect(dateAPI.isBetween(tgtDate, startDate, endDate)).toEqual(true);
      expect(dateAPI.isBetween(startDate, startDate, endDate)).toEqual(true);
      expect(dateAPI.isBetween(endDate, startDate, endDate)).toEqual(true);
      expect(dateAPI.isBetween(otherDate, startDate, endDate)).toEqual(false);
    });

    it("can diff in days", () => {
      let startDate = dateAPI.createDate("2020-02-01");
      let endDate = dateAPI.createDate("2020-02-21");
      expect(dateAPI.diffInDays(startDate, endDate)).toEqual(-20);
    });

    it("can diff in months", () => {
      let startDate = dateAPI.createDate("2020-02-01");
      let endDate = dateAPI.createDate("2021-02-21");
      expect(dateAPI.diffInMonths(startDate, endDate)).toEqual(-12);
    });

    it("can set values", () => {
      let updatedDate = dateAPI.set(dateAPI.createDate("2020-02-01"), {
        date: 5
      });
      expect(dateAPI.toFormattedDate(updatedDate, formatNames.ISO)).toEqual(
        "2020-02-05"
      );

      updatedDate = dateAPI.set(dateAPI.createDate("2020-02-01"), { month: 3 });
      const expectedMonth =
        monthIndexStartsAt === 0 ? "2020-04-01" : "2020-03-01";
      expect(dateAPI.toFormattedDate(updatedDate, formatNames.ISO)).toEqual(
        expectedMonth
      );

      updatedDate = dateAPI.set(dateAPI.createDate("2020-02-01"), {
        year: 2021
      });
      expect(dateAPI.toFormattedDate(updatedDate, formatNames.ISO)).toEqual(
        "2021-02-01"
      );
    });

    it("can validate dates", () => {
      const validDate = dateAPI.createDate("2020-02-01");
      expect(dateAPI.isValid(validDate)).toEqual(true);
      const invalidDate = parse("xx-12-2020");
      expect(dateAPI.isValid(invalidDate)).toEqual(false);
      const invalidYear = parse("01-12-999");
      expect(dateAPI.isValid(invalidYear)).toEqual(false);
    });
  });
});
