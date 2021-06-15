import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";

import createDateAPI from "../createDateAPI";

describe.only("given createDateAPI", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api and a date of 2019-08-28", ({ adapter, weekOffset }) => {
    let startDate;
    const isDayDisabled = date => adapter().isSameMonth(startDate, date);
    const dateAPI = createDateAPI({
      adapter,
      isDayDisabled,
      weekOffset,
      numOfVisibleMonths: 6
    });
    const { createDate, toFormattedDate } = dateAPI;
    startDate = createDate("2019-01-01");

    it("getLastVisibleDate returns the last visible date", () => {
      expect(toFormattedDate(dateAPI.getLastVisibleDate(startDate))).toEqual(
        "2019-06-30"
      );
    });
    it("getNumberVisibleMonths returns the number of visible months", () => {
      expect(dateAPI.getNumberVisibleMonths()).toEqual(6);
    });
    it("nextEnabledDate returns the next enabled date", () => {
      expect(toFormattedDate(dateAPI.nextEnabledDate(startDate))).toEqual(
        "2019-02-01"
      );
    });
    it("previousEnabledDate returns the previous enabled date", () => {
      expect(toFormattedDate(dateAPI.previousEnabledDate(startDate))).toEqual(
        "2018-12-31"
      );
    });
  });
});
