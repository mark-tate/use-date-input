import React from "react";
import { fireEvent, render } from "test-utils";
import { formatNames } from "@use-date-input/common";
import {
  resetMocks,
  setAdapter,
  setIsDayDisabled,
  setMouseCursorMock,
  setWeekOffset
} from "../../CalendarProvider";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import Month from "../Month";

jest.mock("../../CalendarProvider");

describe("given Month", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("for $api", ({ adapter, weekOffset }) => {
    let dateAPI;
    let month;
    beforeEach(() => {
      dateAPI = createDateAPI({ adapter, weekOffset });
      month = dateAPI.createDate("2019-01-01");
      setAdapter(adapter);
      setWeekOffset(weekOffset);
    });
    afterEach(() => {
      resetMocks();
    });

    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      render(<Month month={month} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders a month, including visible days of the week from the previous month", () => {
      const numOfWeekdaysVisible = 42;
      const { getAllByRole } = render(<Month month={month} />);
      const calendar = getAllByRole("gridcell");
      expect(calendar.length).toEqual(numOfWeekdaysVisible);
    });

    it("dates from the current month can be selected", () => {
      const { getByLabelText } = render(<Month month={month} />);
      const expectedLabel = dateAPI.toFormattedDate(
        month,
        formatNames.ARIA_DAY_LABEL
      );
      expect(getByLabelText(expectedLabel)).toBeEnabled();
    });

    it("dates from the current month can be disabled", () => {
      const disabledDay = dateAPI.createDate("2019-01-30");
      setIsDayDisabled(day => dateAPI.isSameDay(disabledDay, day));
      const { getByLabelText } = render(<Month month={month} />);
      const expectedLabel = dateAPI.toFormattedDate(
        disabledDay,
        formatNames.ARIA_DAY_LABEL
      );
      expect(getByLabelText(expectedLabel)).toBeEnabled();
    });

    it("dates from the previous month cannot be selected", () => {
      const previousMonthDay = dateAPI.createDate("2018-12-31");
      const { getByLabelText } = render(<Month month={month} />);
      const previousMonthLabel = dateAPI.toFormattedDate(
        previousMonthDay,
        formatNames.ARIA_DAY_LABEL
      );
      setMouseCursorMock.mockReset();
      fireEvent.mouseOver(getByLabelText(previousMonthLabel));
      expect(setMouseCursorMock).not.toHaveBeenCalled();
    });

    it("the week renders with the default offset", () => {
      const firstDayOfWeek = dateAPI.toFormattedDate(
        dateAPI.startOfWeek(month),
        formatNames.DAY_OF_WEEK_ABBREVIATED
      );
      const { getAllByText } = render(<Month month={month} />);
      const days = getAllByText(/M|T|W|F|S/);
      expect(days.length).toEqual(7);
      expect(days[0].textContent).toEqual(firstDayOfWeek);
    });

    it("the week can render with an offset", () => {
      setWeekOffset(1);
      const { startOfWeek: startOfOffsetWeek, toFormattedDate } = createDateAPI(
        {
          adapter,
          weekOffset: 1
        }
      );
      const firstDayOfWeek = toFormattedDate(
        startOfOffsetWeek(dateAPI.createDate("2019-01-01")),
        formatNames.DAY_OF_WEEK_ABBREVIATED
      );
      const { getAllByText } = render(<Month month={month} />);

      const days = getAllByText(/M|T|W|F|S/);
      expect(days.length).toEqual(7);
      expect(days[0].textContent).toEqual(firstDayOfWeek);
    });
  });
});
