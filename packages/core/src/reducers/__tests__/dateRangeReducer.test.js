import { calendarActions } from "../calendarReducer";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import dateRangeReducer from "../dateRangeReducer";

describe("given dateRangeReducer", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({ adapter, weekOffset });
    const { createDate, toFormattedDate } = dateAPI;
    it("create the changes after a start date is set", () => {
      const action = {
        type: calendarActions.setStartDate,
        date: createDate("2019-02-20")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
    });

    it("create the changes after an end date is set", () => {
      const action = {
        type: calendarActions.setEndDate,
        date: createDate("2019-02-20")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.endDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
    });

    it("can select a start date", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-21")
      };
      const state = {
        isMouseCursorValid: true,
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-21");
      expect(changes.endDate).not.toBeDefined();
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-21");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-21");
      expect(changes.mouseCursor).not.toBeDefined();
    });

    it("cannot select a start date, when the range is invalid", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-21")
      };
      const state = {
        isMouseCursorValid: false,
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(changes.startDate).toEqual(undefined);
      expect(changes.endDate).not.toBeDefined();
    });

    it("can select an end date", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-25")
      };
      const state = {
        isMouseCursorValid: true,
        visibleFromDate: createDate("2019-02-01"),
        startDate: createDate("2019-02-21")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-21");
      expect(toFormattedDate(changes.endDate)).toEqual("2019-02-25");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-25");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-25");
      expect(changes.mouseCursor).not.toBeDefined();
    });

    it("cannot select an end date, when the range is invalid", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-25")
      };
      const state = {
        isMouseCursorValid: false,
        visibleFromDate: createDate("2019-02-01"),
        startDate: createDate("2019-02-21")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-21");
      expect(changes.endDate).not.toBeDefined();
    });

    it("can move the start date", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-20")
      };
      const state = {
        isMouseCursorValid: true,
        visibleFromDate: createDate("2019-02-01"),
        startDate: createDate("2019-02-21")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(changes.endDate).not.toBeDefined();
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-20");
      expect(changes.mouseCursor).not.toBeDefined();
    });

    it("can select a start date, when the enter key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "Enter" } };
      const state = {
        isKeyboardCursorValid: true,
        keyboardCursor: createDate("2019-02-21"),
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-21");
      expect(changes.endDate).not.toBeDefined();
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-21");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-21");
      expect(changes.mouseCursor).not.toBeDefined();
    });

    it("can select an end date, when the enter key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "Enter" } };
      const state = {
        isKeyboardCursorValid: true,
        keyboardCursor: createDate("2019-02-25"),
        visibleFromDate: createDate("2019-02-01"),
        startDate: createDate("2019-02-21")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-21");
      expect(toFormattedDate(changes.endDate)).toEqual("2019-02-25");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-25");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-25");
      expect(changes.mouseCursor).not.toBeDefined();
    });

    it("can move the start date, when the enter key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "Enter" } };
      const state = {
        isKeyboardCursorValid: true,
        keyboardCursor: createDate("2019-02-20"),
        visibleFromDate: createDate("2019-02-01"),
        startDate: createDate("2019-02-21")
      };
      const changes = dateRangeReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(changes.endDate).not.toBeDefined();
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-20");
      expect(changes.mouseCursor).not.toBeDefined();
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
