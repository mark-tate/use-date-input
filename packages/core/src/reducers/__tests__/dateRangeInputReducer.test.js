import { calendarActions } from "../calendarReducer";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import dateRangeInputReducer, {
  dateRangeInputActions,
  dateRangeInputType
} from "../dateRangeInputReducer";

describe("given dateRangeInputReducer", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({ adapter, weekOffset });
    const { createDate, toFormattedDate } = dateAPI;

    it("removes the focus lock when closing", () => {
      const action = {
        type: calendarActions.setOpen,
        open: false
      };
      const state = {};
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(changes).toEqual({ open: false, focusLock: false });
    });

    it("sets the focusable date on open to the start date", () => {
      const action = {
        type: calendarActions.setOpen,
        open: true
      };
      const state = {
        startDate: createDate("2019-02-20"),
        endDate: createDate("2019-02-21"),
        focusedInput: dateRangeInputType.startDate
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-02-01");
      expect(changes.focusLock).toEqual(false);
    });

    it("sets the focusable date on open to the end date", () => {
      const action = {
        type: calendarActions.setOpen,
        open: true
      };
      const state = {
        startDate: createDate("2019-02-20"),
        endDate: createDate("2019-02-21"),
        focusedInput: dateRangeInputType.endDate
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-21");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-21");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-02-01");
      expect(changes.focusLock).toEqual(false);
    });

    it("sets the start date via the input", () => {
      const action = {
        type: calendarActions.setStartDate,
        date: createDate("2019-02-20")
      };
      const state = {};
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(changes.enableKeyboardNavigation).toEqual(false);
    });

    it("sets the end date via the input", () => {
      const action = {
        type: calendarActions.setEndDate,
        date: createDate("2019-02-20")
      };
      const state = {};
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.endDate)).toEqual("2019-02-20");
      expect(changes.enableKeyboardNavigation).toEqual(false);
    });

    it("can focus the start date, if required", () => {
      const action = {
        type: dateRangeInputActions.focusStartDate
      };
      const state = {
        focusedInput: dateRangeInputType.endDate,
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(changes.enableKeyboardNavigation).toEqual(false);
      expect(changes.focusedInput).toEqual(dateRangeInputType.startDate);
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-02-01");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-01");
      expect(changes.open).toEqual(true);
    });

    it("can focus the end date, if required", () => {
      const action = {
        type: dateRangeInputActions.focusEndDate
      };
      const state = {
        focusedInput: dateRangeInputType.startDate,
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(changes.enableKeyboardNavigation).toEqual(false);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-02-01");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-01");
      expect(changes.open).toEqual(true);
    });

    it("can select the start date, when focused", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-20")
      };
      const state = {
        focusedInput: dateRangeInputType.startDate
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-20");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-20");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(changes.focusLock).toEqual(false);
    });

    it("can select the end date, when focused", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-26")
      };
      const state = {
        startDate: createDate("2019-02-20"),
        focusedInput: dateRangeInputType.endDate
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.endDate)).toEqual("2019-02-26");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-26");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-26");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.open).toEqual(false);
      expect(changes.focusLock).toEqual(false);
    });

    it("can re-select the start date, when the start date is un-changed", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-26")
      };
      const state = {
        focusedInput: dateRangeInputType.startDate,
        startDate: createDate("2019-02-26"),
        endDate: createDate("2019-02-27")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-26");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-26");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
    });

    it("can move the start date", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-01-27")
      };
      const state = {
        focusedInput: dateRangeInputType.startDate,
        startDate: createDate("2019-01-26"),
        endDate: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-01-27");
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-27");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-27");
      expect(changes.mouseCursor).toEqual(undefined);
    });

    it("can move the end date", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-01-27")
      };
      const state = {
        focusedInput: dateRangeInputType.endDate,
        startDate: createDate("2019-01-25"),
        endDate: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.endDate)).toEqual("2019-01-27");
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-27");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-27");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.open).toEqual(false);
    });

    it("can re-select the end date, when the end date is un-changed", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-25")
      };
      const state = {
        focusedInput: dateRangeInputType.endDate,
        startDate: createDate("2019-02-24"),
        endDate: createDate("2019-02-25")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-25");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-25");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(changes.open).toEqual(false);
      expect(changes.focusLock).toEqual(false);
    });

    it("can move the start date to before the current start date, when start date is focused", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-01-24")
      };
      const state = {
        focusedInput: dateRangeInputType.startDate,
        startDate: createDate("2019-01-25"),
        endDate: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-01-24");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-24");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-24");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
    });

    it("can move the start date to after the current end date, when start date is focused", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-01-29")
      };
      const state = {
        focusedInput: dateRangeInputType.startDate,
        startDate: createDate("2019-01-25"),
        endDate: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-01-29");
      expect(changes.endDate).toEqual(undefined);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-29");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-29");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
    });

    it("can move the start date, when the end date is focused", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-01-23")
      };
      const state = {
        focusedInput: dateRangeInputType.endDate,
        startDate: createDate("2019-01-25"),
        endDate: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-01-23");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-23");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-23");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.endDate).not.toBeDefined();
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
    });

    it("can move the end date, when the end date is focused", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-01-31")
      };
      const state = {
        focusedInput: dateRangeInputType.endDate,
        startDate: createDate("2019-01-25"),
        endDate: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.endDate)).toEqual("2019-01-31");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-31");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-31");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(changes.open).toEqual(false);
      expect(changes.focusLock).toEqual(false);
    });

    it("can select a start date, when the enter key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "Enter" }
      };
      const state = {
        focusedInput: dateRangeInputType.startDate,
        startDate: createDate("2019-01-25"),
        keyboardCursor: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.startDate)).toEqual("2019-01-28");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-28");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-28");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
    });

    it("can select an end date, when the enter key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "Enter" }
      };
      const state = {
        focusedInput: dateRangeInputType.endDate,
        startDate: createDate("2019-01-25"),
        keyboardCursor: createDate("2019-01-28")
      };
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.endDate)).toEqual("2019-01-28");
      expect(toFormattedDate(changes.startDate)).toEqual("2019-01-25");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-28");
      expect(changes.focusedDate).toEqual(undefined);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-28");
      expect(changes.mouseCursor).toEqual(undefined);
      expect(changes.focusedInput).toEqual(dateRangeInputType.endDate);
      expect(changes.open).toEqual(false);
      expect(changes.focusLock).toEqual(false);
    });

    it("closes when the mouse is clicked outside", () => {
      const action = {
        type: calendarActions.mouseClickOutside,
        open: false
      };
      const state = {};
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(changes.focusedInput).toEqual(undefined);
      expect(changes.open).toEqual(false);
      expect(changes.focusLock).toEqual(false);
    });

    it("closes when the start date loses focus", () => {
      const action = {
        type: dateRangeInputActions.blurStartDate
      };
      const state = {};
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(changes.focusedInput).toEqual(undefined);
      expect(changes.open).toEqual(false);
    });

    it("closes when the end date loses focus", () => {
      const action = {
        type: dateRangeInputActions.blurEndDate
      };
      const state = {};
      const changes = dateRangeInputReducer(state, action, dateAPI);
      expect(changes.focusedInput).toEqual(undefined);
      expect(changes.open).toEqual(false);
    });
  });
});
