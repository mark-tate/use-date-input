import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useCalendarState, useCalendarProps } from "../CalendarProvider";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../createDateAPI";

import Calendar from "../Calendar";
import calendarReducer from "../reducers/calendarReducer";
import singleDateReducer from "../reducers/singleDateReducer";
const defaultReducers = [calendarReducer, singleDateReducer];

jest.useFakeTimers();

describe("given Calendar", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const props = { adapter, weekOffset };
    const { createDate, toFormattedDate } = createDateAPI({
      adapter,
      weekOffset
    });
    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      render(<Calendar adapter={adapter} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders the calendar with the initial state of a single date", () => {
      const reducer = jest.fn(state => state);
      const MockSingleDateRoot = () => {
        const {
          numOfColumns,
          numOfVisibleMonths,
          allowRange,
          clickOutsideWhiteList,
          initialSelectedDate,
          initialVisibleFromMonth
        } = useCalendarProps();
        expect(numOfColumns).toEqual(3);
        expect(numOfVisibleMonths).toEqual(6);
        expect(allowRange).toEqual(false);
        expect(clickOutsideWhiteList).toEqual(["some ref"]);
        expect(toFormattedDate(initialVisibleFromMonth)).toEqual("2019-08-01");
        expect(toFormattedDate(initialSelectedDate)).toEqual("2019-08-20");

        const {
          keyboardCursor,
          startDate,
          endDate,
          visibleFromDate
        } = useCalendarState();
        expect(toFormattedDate(keyboardCursor)).toEqual("2019-08-20");
        expect(endDate).not.toBeDefined();
        expect(toFormattedDate(startDate)).toEqual("2019-08-20");
        expect(toFormattedDate(visibleFromDate)).toEqual("2019-08-01");
        expect(reducer).not.toHaveBeenCalled();
        return <div />;
      };

      render(
        <Calendar
          clickOutsideWhiteList={["some ref"]}
          components={{ Root: MockSingleDateRoot }}
          initialSelectedDate={createDate("2019-08-20")}
          initialVisibleFromMonth={createDate("2019-08-01")}
          numOfColumns={3}
          numOfVisibleMonths={6}
          reducers={[...defaultReducers, reducer]}
          {...props}
        />
      );
    });

    it("renders the calendar with the initial state of a date range", () => {
      const reducer = jest.fn(state => state);
      const MockDateRangeRoot = () => {
        const {
          clickOutsideWhiteList,
          numOfColumns,
          numOfVisibleMonths,
          allowRange,
          initialSelectedDate,
          initialVisibleFromMonth
        } = useCalendarProps();
        expect(clickOutsideWhiteList).toEqual(["some ref"]);
        expect(numOfColumns).toEqual(3);
        expect(numOfVisibleMonths).toEqual(6);
        expect(allowRange).toEqual(true);
        expect(toFormattedDate(initialVisibleFromMonth)).toEqual("2019-08-01");
        expect(toFormattedDate(initialSelectedDate[0])).toEqual("2019-08-20");
        expect(toFormattedDate(initialSelectedDate[1])).toEqual("2019-08-27");

        const {
          keyboardCursor,
          startDate,
          endDate,
          visibleFromDate
        } = useCalendarState();
        expect(toFormattedDate(keyboardCursor)).toEqual("2019-08-20");
        expect(toFormattedDate(endDate)).toEqual("2019-08-27");
        expect(toFormattedDate(startDate)).toEqual("2019-08-20");
        expect(toFormattedDate(visibleFromDate)).toEqual("2019-08-01");
        expect(reducer).not.toHaveBeenCalled();
        return <div />;
      };
      render(
        <Calendar
          clickOutsideWhiteList={["some ref"]}
          components={{ Root: MockDateRangeRoot }}
          allowRange
          initialSelectedDate={[
            createDate("2019-08-20"),
            createDate("2019-08-27")
          ]}
          initialVisibleFromMonth={createDate("2019-08-01")}
          numOfColumns={3}
          numOfVisibleMonths={6}
          reducers={[...defaultReducers, reducer]}
          {...props}
        />
      );
    });

    it("renders the previous month, when PREV is clicked", () => {
      const reducer = jest.fn(state => state);
      const handleStateChange = jest.fn();
      const { getAllByRole, getByText, getByLabelText } = render(
        <Calendar
          initialVisibleFromMonth={createDate("2019-08-01")}
          onStateChange={handleStateChange}
          reducers={[...defaultReducers, reducer]}
          {...props}
        />
      );
      fireEvent.click(getByLabelText(/move to previous month/));
      expect(getByText("July")).toBeInTheDocument();
      expect(getByText("2019")).toBeInTheDocument();
      const cells = getAllByRole("gridcell");
      expect(cells[0].innerHTML).toEqual("30");
      expect(cells[34].innerHTML).toEqual("3");
      expect(reducer).toHaveBeenCalled();
      expect((handleStateChange.mock.calls.length = 1));
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-07-01");
    });

    it("renders the next month, when NEXT is clicked", () => {
      const reducer = jest.fn(state => state);
      const handleStateChange = jest.fn();
      const { getAllByRole, getByText, getByLabelText } = render(
        <Calendar
          initialVisibleFromMonth={createDate("2019-08-01")}
          onStateChange={handleStateChange}
          reducers={[...defaultReducers, reducer]}
          {...props}
        />
      );
      fireEvent.click(getByLabelText(/move to next month/));
      expect(getByText("September")).toBeInTheDocument();
      expect(getByText("2019")).toBeInTheDocument();
      const cells = getAllByRole("gridcell");
      expect(cells[0].innerHTML).toEqual("1");
      expect(cells[34].innerHTML).toEqual("5");
      expect(reducer).toHaveBeenCalled();
      expect((handleStateChange.mock.calls.length = 1));
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-09-01");
    });

    it("calls onStateChange, when the state is changed", () => {
      const handleStateChange = jest.fn();
      const { getByText } = render(
        <Calendar
          initialVisibleFromMonth={createDate("2019-08-01")}
          onStateChange={handleStateChange}
          {...props}
        />
      );
      fireEvent.mouseOver(getByText("12"));
      expect((handleStateChange.mock.calls.length = 1));
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].mouseCursor)
      ).toEqual("2019-08-12");
    });

    it("calls onCalendarChange, when a single date is selected", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Calendar
          initialVisibleFromMonth={createDate("2019-08-01")}
          onCalendarChange={handleChange}
          {...props}
        />
      );
      fireEvent.click(getByText("12"));
      expect((handleChange.mock.calls.length = 1));
      expect(toFormattedDate(handleChange.mock.calls[0][0])).toEqual(
        "2019-08-12"
      );
    });

    it("calls onCalendarChange, when a date range is selected", () => {
      const handleChange = jest.fn();
      const { getByText } = render(
        <Calendar
          initialVisibleFromMonth={createDate("2019-08-01")}
          allowRange
          onCalendarChange={handleChange}
          {...props}
        />
      );
      fireEvent.click(getByText("12"));
      expect((handleChange.mock.calls.length = 1));
      expect(toFormattedDate(handleChange.mock.calls[0][0][0])).toEqual(
        "2019-08-12"
      );
      expect(handleChange.mock.calls[0][0][1]).toEqual(undefined);
      fireEvent.click(getByText("20"));
      expect((handleChange.mock.calls.length = 2));
      expect(toFormattedDate(handleChange.mock.calls[1][0][0])).toEqual(
        "2019-08-12"
      );
      expect(toFormattedDate(handleChange.mock.calls[1][0][1])).toEqual(
        "2019-08-20"
      );
    });
  });
});
