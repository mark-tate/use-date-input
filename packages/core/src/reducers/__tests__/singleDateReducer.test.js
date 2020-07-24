import { calendarActions } from "../calendarReducer";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import singleDateReducer from "../singleDateReducer";
import dateRangeReducer from "../dateRangeReducer";

describe("given singleDateReducer", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({
      adapter,
      numOfVisibleMonths: 4,
      weekOffset
    });
    const { createDate, toFormattedDate } = dateAPI;
    it("create the changes after a start date is set", () => {
      const action = {
        type: calendarActions.setStartDate,
        date: createDate("2019-02-20")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = singleDateReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
    });
    it("create the changes after a date is selected", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-20")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = singleDateReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-20");
      expect(changes.mouseCursor).toEqual(undefined);
    });
    it("create the changes after Enter key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "Enter" } };
      const state = {
        keyboardCursor: createDate("2019-02-20"),
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = singleDateReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-20");
      expect(changes.mouseCursor).toEqual(undefined);
    });

    it("resets the focused date when keyboard navigation is disabled", () => {
      const action = {
        type: calendarActions.setEnableKeyboardNavigation,
        enable: false
      };
      const state = {
        focusedDate: createDate("2019-02-01")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(changes.focusedDate).toEqual(undefined);
    });
  });
});
