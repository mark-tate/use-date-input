import { calendarActions } from "../calendarReducer";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import dateInputReducer, { dateInputActions } from "../dateInputReducer";

describe("given dateInputReducer", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({ adapter, weekOffset });
    const { createDate, toFormattedDate } = dateAPI;

    it("closes the calendar", () => {
      const action = {
        type: calendarActions.setOpen,
        open: false
      };
      const state = {};
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.open).toEqual(false);
      expect(changes.focusLock).toEqual(false);
    });

    it("opens the calendar", () => {
      const action = {
        type: calendarActions.setOpen,
        open: true
      };
      const state = {
        startDate: createDate("2019-02-08")
      };
      const changes = dateInputReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-08");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-08");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-02-01");
      expect(changes.open).toEqual(true);
      expect(changes.focusLock).toEqual(false);
    });

    it("locks the focus", () => {
      const action = {
        type: dateInputActions.focusLock,
        enable: true
      };
      const state = {};
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.focusLock).toEqual(true);
    });

    it("removes the focus lock on mouse outside", () => {
      const action = {
        type: calendarActions.mouseClickOutside
      };
      const state = {};
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.focusLock).toEqual(false);
    });

    it("focuses the input", () => {
      const action = {
        type: dateInputActions.focusInput
      };
      const state = {};
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.open).toEqual(true);
    });

    it("blurs the input", () => {
      const action = {
        type: dateInputActions.blurInput
      };
      const state = {};
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.open).toEqual(false);
    });

    it("closes the calendar when a date is selected", () => {
      const action = {
        type: calendarActions.selectDate,
        date: createDate("2019-02-21")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.open).toEqual(false);
      expect(changes.enableKeyboardNavigation).toEqual(false);
      expect(changes.focusedDate).toEqual(undefined);
      expect(changes.focusLock).toEqual(false);
    });

    it("closes the calendar, when a date is selected with the enter key", () => {
      const action = { type: calendarActions.keyPress, key: { key: "Enter" } };
      const state = {
        keyboardCursor: createDate("2019-02-21"),
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = dateInputReducer(state, action, dateAPI);
      expect(changes.open).toEqual(false);
      expect(changes.enableKeyboardNavigation).toEqual(false);
      expect(changes.focusedDate).toEqual(undefined);
      expect(changes.focusLock).toEqual(false);
    });
  });
});
