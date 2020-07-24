import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import calendarReducer, { calendarActions } from "../calendarReducer";

describe("given calendarReducer", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({
      adapter,
      isDayDisabled: () => false,
      numOfVisibleMonths: 4,
      weekOffset
    });
    const { createDate, toFormattedDate } = dateAPI;
    it("set the state animating", () => {
      const action = {
        type: calendarActions.setAnimating,
        animating: true
      };
      const state = {
        animating: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual({
        animating: true
      });
    });
    it("create the new cursor state on set mouse cursor", () => {
      const action = {
        type: calendarActions.setMouseCursor,
        date: createDate("2019-02-20")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual(
        expect.objectContaining({
          activeCursor: "mouse",
          mouseCursor: action.date
        })
      );
    });
    it("create the new cursor state on set keyboard cursor", () => {
      const action = {
        type: calendarActions.setKeyboardCursor,
        date: createDate("2019-02-20")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual(
        expect.objectContaining({
          activeCursor: "keyboard",
          keyboardCursor: action.date
        })
      );
    });
    it("create the new state after navigatePrevious key is pressed", () => {
      const action = { type: calendarActions.navigatePrevious };
      const state = {
        focusableDate: createDate("2019-02-20"),
        keyboardCursor: createDate("2019-02-20"),
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes.activeCursor).toEqual("keyboard");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-20");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-01-01");
    });

    it("create the new state after navigateNext button is pressed", () => {
      const action = { type: calendarActions.navigateNext };
      const state = {
        focusableDate: createDate("2019-02-20"),
        keyboardCursor: createDate("2019-02-20"),
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes.activeCursor).toEqual("keyboard");
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-03-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-03-20");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-03-01");
    });
    it("create the new state after set visible from date", () => {
      const action = {
        type: calendarActions.setVisibleFromDate,
        date: createDate("2019-03-01")
      };
      const state = {
        visibleFromDate: createDate("2019-02-01")
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-03-01");
    });

    it("can open the calendar", () => {
      const action = {
        type: calendarActions.setOpen,
        open: true
      };
      const state = {
        visibleFromDate: "some date"
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual(
        expect.objectContaining({
          open: true,
          focusableDate: "some date"
        })
      );
    });

    it("can close the calendar", () => {
      const action = {
        type: calendarActions.setOpen,
        open: false
      };
      const state = {};
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual({
        animating: false,
        open: false,
        focusedDate: undefined,
        enableKeyboardNavigation: false
      });
    });

    it("can mouse click outside", () => {
      const action = {
        type: calendarActions.mouseClickOutside
      };
      const state = {};
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual({
        animating: false,
        focusableDate: undefined,
        focusedDate: undefined,
        enableKeyboardNavigation: false,
        open: false
      });
    });

    it("can enable focusing on a date", () => {
      const action = {
        type: calendarActions.setFocusableDate,
        date: "some date"
      };
      const state = {};
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual({
        focusableDate: "some date"
      });
    });

    it("can disable focusing on a date", () => {
      const action = {
        type: calendarActions.setFocusableDate,
        date: "some date"
      };
      const state = {};
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual({
        focusableDate: "some date"
      });
    });

    it("can focus on a date", () => {
      const action = {
        type: calendarActions.focusDate,
        date: "some date"
      };
      const state = {};
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual({
        focusedDate: "some date"
      });
    });

    it("can enable keyboard navigation when not animating", () => {
      const action = {
        type: calendarActions.setEnableKeyboardNavigation,
        enable: true
      };
      const state = {
        animating: false
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(changes).toEqual(
        expect.objectContaining({
          enableKeyboardNavigation: true
        })
      );
    });

    it("create the changes after ArrowUp key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "ArrowUp" }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-13");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-13");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-13");
    });

    it("create the changes after ArrowDown key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "ArrowDown" }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-27");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-27");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-27");
    });

    it("create the changes after ArrowLeft key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "ArrowLeft" }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-19");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-19");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-19");
    });

    it("create the changes after ArrowRight key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "ArrowRight" }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-21");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-21");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-21");
    });

    it("create the changes after Home key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "Home" } };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-01");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-01");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-01");
    });

    it("create the changes after Ctrl+Home key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: {
          key: "Home",
          ctrlKey: true
        }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-01");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-01");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-01-01");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2019-01-01");
    });

    it("create the changes after End key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "End" } };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-02-28");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-02-28");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-02-28");
    });

    it("create the changes after Ctrl+End key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: {
          key: "End",
          ctrlKey: true
        }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-12-31");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-12-31");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-12-31");
    });

    it("create the changes after PageUp key is pressed", () => {
      const action = { type: calendarActions.keyPress, key: { key: "PageUp" } };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-01-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-01-20");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-01-20");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2018-10-01");
    });

    it("create the changes after Shift+PageUp key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "PageUp", shiftKey: true }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2018-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2018-02-20");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2018-02-20");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2018-02-01");
    });

    it("create the changes after PageDown key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "PageDown" }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2019-03-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2019-03-20");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2019-03-20");
    });

    it("create the changes after Shift+PageDown key is pressed", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "PageDown", shiftKey: true }
      };
      const state = {
        visibleFromDate: createDate("2019-02-01"),
        keyboardCursor: createDate("2019-02-20"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2020-02-20");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2020-02-20");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2020-02-20");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2020-02-01");
    });

    it("update the visible range when cursor is moved to the next visible date", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "ArrowRight" }
      };
      const state = {
        visibleFromDate: createDate("2019-09-01"),
        keyboardCursor: createDate("2019-12-31"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2020-01-01");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2020-01-01");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2020-01-01");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2020-01-01");
    });

    it("update the visible range when cursor is moved to the previous visible date", () => {
      const action = {
        type: calendarActions.keyPress,
        key: { key: "ArrowLeft" }
      };
      const state = {
        visibleFromDate: createDate("2019-01-01"),
        keyboardCursor: createDate("2019-01-01"),
        enableKeyboardNavigation: true
      };
      const changes = calendarReducer(state, action, dateAPI);
      expect(toFormattedDate(changes.keyboardCursor)).toEqual("2018-12-31");
      expect(toFormattedDate(changes.focusableDate)).toEqual("2018-12-31");
      expect(toFormattedDate(changes.focusedDate)).toEqual("2018-12-31");
      expect(toFormattedDate(changes.visibleFromDate)).toEqual("2018-09-01");
    });
  });
});
