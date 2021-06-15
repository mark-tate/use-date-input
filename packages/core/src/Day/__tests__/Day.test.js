import React from "react";
import { fireEvent, render } from "test-utils";
import { formatNames } from "@use-date-input/common";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import Day from "../Day";

jest.mock("../../CalendarProvider");

describe("given Day", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("for $api", ({ adapter, weekOffset }) => {
    const dateAPI = createDateAPI({ adapter, weekOffset });
    const { createDate, toFormattedDate } = dateAPI;

    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      const day = createDate("2019-01-10");
      render(
        <Day day={day} ref={ref} toFormattedDate={dateAPI.toFormattedDate} />
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("renders a Day", () => {
      const day = createDate("2019-01-10");
      const { getByText } = render(
        <Day day={day} toFormattedDate={dateAPI.toFormattedDate} />
      );
      expect(getByText("10")).toBeInTheDocument();
    });

    it("valid date ranges can be selected", () => {
      const day = createDate("2019-01-10");
      const onSelectDate = jest.fn();
      const { getByText } = render(
        <Day
          day={day}
          isMouseCursorValid
          onSelectDate={onSelectDate}
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      fireEvent.click(getByText(/10/));
      expect(onSelectDate).toHaveBeenCalledWith(day);
    });

    it("invalid date ranges cannot be selected", () => {
      const day = createDate("2019-01-10");
      const onSelectDate = jest.fn();
      const { getByText } = render(
        <Day
          day={day}
          onSelectDate={onSelectDate}
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      fireEvent.click(getByText(/10/));
      expect(onSelectDate).not.toHaveBeenCalledWith(day);
    });

    it("disabled dates cannot be selected", () => {
      const day = createDate("2019-01-10");
      const onSelectDate = jest.fn();
      const { getByText } = render(
        <Day
          day={day}
          disabled
          onSelectDate={onSelectDate}
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      fireEvent.click(getByText(/10/));
      expect(onSelectDate).not.toHaveBeenCalled();
    });

    it("start dates have the correct aria-label", () => {
      const day = createDate("2019-01-10");
      const { getByLabelText } = render(
        <Day
          day={day}
          disabled
          isStartDate
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      const ariaLabel = toFormattedDate(day, formatNames.ARIA_START_LABEL);
      expect(getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it("end dates have the correct aria-label", () => {
      const day = createDate("2019-01-10");
      const { getByLabelText } = render(
        <Day
          day={day}
          disabled
          isEndDate
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      const ariaLabel = toFormattedDate(day, formatNames.ARIA_END_LABEL);
      expect(getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it("the mouse cursor is updated on mouse over", () => {
      const day = createDate("2019-01-10");
      const onMouseOverDate = jest.fn();
      const { getByText } = render(
        <Day
          day={day}
          onMouseOverDate={onMouseOverDate}
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      fireEvent.mouseOver(getByText(/10/));
      expect(onMouseOverDate).toHaveBeenCalledWith(day);
    });

    it("the mouse cursor is updated on mouse out", () => {
      const day = createDate("2019-01-10");
      const onMouseOutDate = jest.fn();
      const { getByText } = render(
        <Day
          day={day}
          onMouseOutDate={onMouseOutDate}
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      fireEvent.mouseOver(getByText(/10/));
      fireEvent.mouseOut(getByText(/10/));
      expect(onMouseOutDate).toHaveBeenCalledWith(day);
    });

    it("the mouse cursor is not updated on disabled dates", () => {
      const day = createDate("2019-01-10");
      const onMouseOverDate = jest.fn();
      const { getByText } = render(
        <Day
          day={day}
          disabled
          onMouseOverDate={onMouseOverDate}
          toFormattedDate={dateAPI.toFormattedDate}
        />
      );
      fireEvent.mouseOver(getByText(/10/));
      expect(onMouseOverDate).not.toHaveBeenCalled();
    });

    it("will focus a date by the isFocused prop", () => {
      const day = createDate("2019-01-10");
      const { getByText } = render(
        <Day
          day={day}
          isFocused
          toFormattedDate={dateAPI.toFormattedDate}
          tabIndex={0}
        />
      );
      expect(getByText(/10/)).toHaveFocus();
    });
  });
});
