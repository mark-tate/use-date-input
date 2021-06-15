import React from "react";
import { fireEvent, render } from "test-utils";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";
import {
  resetMocks,
  setAdapter,
  setEnableKeyboardNavigation,
  setEnableKeyboardNavigationMock,
  setIsDayDisabled,
  setKeyPressMock,
  setMouseCursor,
  setMouseCursorMock,
  setNumOfColumns,
  setNumOfVisibleMonths,
  setVisibleFromDate,
  setWeekOffset
} from "../../CalendarProvider";

import Root from "../Root";

jest.mock("../../CalendarProvider");

describe("given Root", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("for $api", ({ adapter, weekOffset }) => {
    let dateAPI;
    beforeEach(() => {
      dateAPI = createDateAPI({ adapter, weekOffset });
      setAdapter(adapter);
      setWeekOffset(weekOffset);
    });
    afterEach(() => {
      resetMocks();
    });

    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      render(<Root ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders the week in the correct default order", () => {
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(1);
      setNumOfVisibleMonths(1);
      const { getByTestId } = render(<Root />);
      const dowHeader = getByTestId("dow-header");
      expect(dowHeader.firstChild).toHaveAttribute("aria-label", "Sunday");
      expect(dowHeader.lastChild).toHaveAttribute("aria-label", "Saturday");
    });

    it("renders disabled dates", () => {
      const disabledDate = dateAPI.createDate("2019-08-20");
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(1);
      setNumOfVisibleMonths(1);
      const isDayDisabled = day => dateAPI.isSameDay(day, disabledDate);
      setIsDayDisabled(isDayDisabled);
      const { getAllByRole } = render(<Root />);
      const cells = getAllByRole("gridcell");
      expect(cells.length).toEqual(42);
      const previousMonthOffset = 28;
      for (let dayIndex = 0; dayIndex <= 3; dayIndex++) {
        const day = cells[dayIndex];
        expect(day.innerHTML).toEqual("" + (dayIndex + previousMonthOffset));
        setMouseCursorMock.mockReset();
        fireEvent.mouseOver(day);
        expect(setMouseCursorMock).not.toHaveBeenCalled();
      }
      for (let dayIndex = 4; dayIndex < 35; dayIndex++) {
        const day = cells[dayIndex];
        if (day.innerHTML === "20") {
          setMouseCursorMock.mockReset();
          fireEvent.mouseOver(day);
          expect(setMouseCursorMock).not.toHaveBeenCalled();
        } else {
          setMouseCursorMock.mockReset();
          fireEvent.mouseOver(day);
          expect(setMouseCursorMock).toHaveBeenCalled();
        }
      }
    });

    it("renders the visible months in columns and rows", () => {
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(3);
      setNumOfVisibleMonths(6);
      const { getAllByTestId, getByText } = render(<Root />);
      const rows = getAllByTestId("month-group-row");
      expect(rows.length).toEqual(2);
      expect(rows[0].children.length).toEqual(3);
      expect(rows[1].children.length).toEqual(3);
      expect(getByText("2019")).toBeInTheDocument();
      expect(getByText("August")).toBeInTheDocument();
      expect(getByText("September")).toBeInTheDocument();
      expect(getByText("October")).toBeInTheDocument();
      expect(getByText("November")).toBeInTheDocument();
      expect(getByText("December")).toBeInTheDocument();
      expect(getByText("January")).toBeInTheDocument();
    });

    it("enables keyboard navigation when focused", () => {
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(1);
      setNumOfVisibleMonths(1);
      setEnableKeyboardNavigation(false);
      const { getByText } = render(<Root />);
      const day = getByText("13");
      day.focus();
      expect(setEnableKeyboardNavigationMock).toHaveBeenLastCalledWith(true);
    });

    it("disabled keyboard navigation when blurred", () => {
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(1);
      setNumOfVisibleMonths(1);
      setEnableKeyboardNavigation(true);
      const { getByText } = render(<Root />);
      const day = getByText("13");
      day.focus();
      day.blur();
      expect(setEnableKeyboardNavigationMock).toHaveBeenLastCalledWith(false);
    });

    it("removes the mouse cursor on mouse out", () => {
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(1);
      setNumOfVisibleMonths(1);
      setMouseCursor(dateAPI.createDate("2019-08-13"));
      const { getByTestId } = render(<Root />);
      fireEvent.mouseLeave(getByTestId("calendar-root"));
      expect(setMouseCursorMock).toHaveBeenLastCalledWith(undefined);
    });

    it("sets the key pressed", () => {
      setVisibleFromDate(dateAPI.createDate("2019-08-01"));
      setNumOfColumns(1);
      setNumOfVisibleMonths(1);
      const { getByText } = render(<Root />);
      const day = getByText("13");
      fireEvent.keyDown(day, { key: "ArrowDown", code: 40 });
      expect(setKeyPressMock).toHaveBeenLastCalledWith({
        key: "ArrowDown",
        ctrlKey: false,
        shiftKey: false
      });
    });
  });
});
