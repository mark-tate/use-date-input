import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../createDateAPI";

import createCalendarModel from "../createCalendarModel";

describe("given createCalendarModel", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api and a date of 2019-08-28", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({ adapter, weekOffset });
    const { createDate, toFormattedDate } = dateAPI;
    const calendar = createCalendarModel(createDate("2019-08-28"), dateAPI);

    it("a model includes remaining days from the previous month", () => {
      expect(calendar.length).toEqual(5);
      expect(calendar[0].length).toEqual(7);
    });

    it("a model includes days for the last week in July", () => {
      expect(calendar[0].length).toEqual(7);
      expect(toFormattedDate(calendar[0][0])).toEqual("2019-07-28");
    });

    it("a model includes days for the first week in August", () => {
      expect(calendar[1].length).toEqual(7);
      expect(toFormattedDate(calendar[1][0])).toEqual("2019-08-04");
    });

    it("a model includes days for the second week in August", () => {
      expect(calendar[2].length).toEqual(7);
      expect(toFormattedDate(calendar[2][0])).toEqual("2019-08-11");
    });

    it("a model includes days for the third week in August", () => {
      expect(calendar[3].length).toEqual(7);
      expect(toFormattedDate(calendar[3][0])).toEqual("2019-08-18");
    });

    it("a model includes days for the last week in August", () => {
      expect(calendar[4].length).toEqual(7);
      expect(toFormattedDate(calendar[4][0])).toEqual("2019-08-25");
    });
  });
});
