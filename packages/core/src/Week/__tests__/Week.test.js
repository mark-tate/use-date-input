import React from "react";
import { fireEvent, render } from "test-utils";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import {
  resetMocks,
  selectDateMock,
  setAdapter,
  setAnimating,
  setFocusableDate,
  setFocusedDate,
  setIsDayDisabled,
  setIsMouseCursorValid,
  setMouseCursorMock,
  setWeekOffset
} from "../../CalendarProvider";
import createDateAPI from "../../createDateAPI";

import Week from "../Week";

jest.mock("../../CalendarProvider");

describe("given Week", () => {
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
      render(<Week days={[]} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders a week by default", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} />);
      expect(getByText("10")).toBeInTheDocument();
      expect(getByText("11")).toBeInTheDocument();
      expect(getByText("12")).toBeInTheDocument();
      expect(getByText("12")).toBeInTheDocument();
      expect(getByText("14")).toBeInTheDocument();
      expect(getByText("15")).toBeInTheDocument();
      expect(getByText("16")).toBeInTheDocument();
    });

    it("enabled dates can be selected with mouse", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      setIsMouseCursorValid(true);
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      fireEvent.click(getByText(/11/));
      const selectedDate = selectDateMock.mock.calls[0][0];
      expect(
        dateAPI.isSameDay(selectedDate, dateAPI.createDate("2019-01-11"))
      ).toEqual(true);
    });

    it("disabled dates cannot be selected", () => {
      selectDateMock.mockClear();
      const startDay = dateAPI.createDate("2019-01-10");
      setIsDayDisabled(day =>
        dateAPI.isSameDay(day, dateAPI.createDate("2019-01-13"))
      );
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      fireEvent.click(getByText(/13/));
      expect(selectDateMock).not.toHaveBeenCalled();
    });

    it("can focus a date", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      const focusedDate = dateAPI.createDate("2019-01-12");
      setFocusedDate(focusedDate);
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      const focusedElement = document.activeElement;
      expect(focusedElement).toEqual(getByText(/12/));
    });

    it("cannot focus disabled dates", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      const focusedDate = dateAPI.createDate("2019-01-12");
      setFocusedDate(focusedDate);
      setIsDayDisabled(day => dateAPI.isSameDay(day, focusedDate));
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      const focusedElement = document.activeElement;
      expect(focusedElement).not.toEqual(getByText(/12/));
    });

    it("cannot set focusable disabled dates", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      const focusableDate = dateAPI.createDate("2019-01-12");
      setFocusableDate(focusableDate);
      setIsDayDisabled(day => dateAPI.isSameDay(day, focusableDate));
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      expect(getByText(/12/)).not.toHaveAttribute("tabindex");
      setMouseCursorMock.mockReset();
      fireEvent.mouseOver(getByText(/12/));
      expect(setMouseCursorMock).not.toHaveBeenCalled();
    });

    it("cannot change focusable date until animation is complete", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      const focusableDate = dateAPI.createDate("2019-01-12");
      setFocusableDate(focusableDate);
      setAnimating(true);
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText, rerender } = render(
        <Week days={days} parentMonth={startDay} />
      );
      expect(getByText(/12/)).toHaveAttribute("tabindex", undefined);
      rerender(<Week days={days} parentMonth={startDay} />);
      expect(getByText(/12/)).toHaveAttribute("tabindex", "0");
    });

    it("cannot change focused date until animation is complete", () => {
      const startDay = dateAPI.createDate("2019-01-10");
      const focusedDate = dateAPI.createDate("2019-01-12");
      setFocusedDate(focusedDate);
      setAnimating(true);
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText, rerender } = render(
        <Week days={days} parentMonth={startDay} />
      );
      expect(getByText(/12/)).toHaveAttribute("tabindex", undefined);
      rerender(<Week days={days} parentMonth={startDay} />);
      expect(getByText(/12/)).toHaveAttribute("tabindex", "-1");
    });

    it("the mouse cursor is updated", () => {
      setMouseCursorMock.mockClear();
      const startDay = dateAPI.createDate("2019-01-10");
      const cursorDay = dateAPI.createDate("2019-01-13");
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      fireEvent.mouseOver(getByText(/13/));
      expect(
        dateAPI.toFormattedDate(setMouseCursorMock.mock.calls[0][0])
      ).toEqual(dateAPI.toFormattedDate(cursorDay));
    });

    it("the mouse cursor is not updated for disabled days", () => {
      setMouseCursorMock.mockClear();
      const startDay = dateAPI.createDate("2019-01-10");
      setIsDayDisabled(day =>
        dateAPI.isSameDay(day, dateAPI.createDate("2019-01-12"))
      );
      const days = [...Array(7)].map((day, index) =>
        dateAPI.addDays(startDay, index)
      );
      const { getByText } = render(<Week days={days} parentMonth={startDay} />);
      fireEvent.mouseOver(getByText(/12/));
      expect(setMouseCursorMock).not.toHaveBeenCalled();
    });
  });
});
