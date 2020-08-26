import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import { Popper } from "@use-date-input/popper";
import createDateAPI from "../createDateAPI";
import { parse } from "date-fns";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import moment from "moment";
import { dateRangeInputType } from "../reducers/dateRangeInputReducer";

import useDateRangeInput from "../useDateRangeInput";

jest.useFakeTimers();

describe("given useDateRangeInput", () => {
  describe.each`
    api           | adapter           | weekOffset | parse
    ${"date-fns"} | ${dateFnsAdapter} | ${0}       | ${value => parse(value, "dd/MM/yyyy", new Date())}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}       | ${value => dayjs(value, "DD/MM/YYYY")}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}      | ${value => DateTime.fromFormat(value, "dd/MM/yyyy")}
    ${"moment"}   | ${momentAdapter}  | ${0}       | ${value => moment(value, "DD/MM/YYYY")}
  `("with $api", ({ adapter, parse, weekOffset }) => {
    let getByText, getByTestId, queryAllByRole, queryByTestId;
    const { toFormattedDate } = createDateAPI({ adapter, weekOffset });
    const handleStartDateInputChange = jest.fn();
    const handleEndDateInputChange = jest.fn();
    const handleCalendarChange = jest.fn();
    const handleStateChange = jest.fn();
    beforeEach(() => {
      const RangeDatePicker = () => {
        const {
          Calendar,
          CalendarProvider,
          getCalendarProviderProps,
          getStartDateProps,
          getEndDateProps,
          getPopperProps
        } = useDateRangeInput({
          adapter,
          parse,
          weekOffset
        });
        return (
          <>
            <input
              data-testid="start-date-input"
              {...getStartDateProps({ onChange: handleStartDateInputChange })}
            />
            <input
              data-testid="end-date-input"
              {...getEndDateProps({ onChange: handleEndDateInputChange })}
            />
            <CalendarProvider
              {...getCalendarProviderProps({
                initialVisibleFromMonth: parse("01/03/2020"),
                onCalendarChange: handleCalendarChange,
                onStateChange: handleStateChange
              })}
            >
              <Popper {...getPopperProps()}>
                <Calendar />
              </Popper>
            </CalendarProvider>
          </>
        );
      };
      ({ getByTestId, getByText, queryAllByRole, queryByTestId } = render(
        <RangeDatePicker />
      ));
    });
    afterEach(() => {
      handleStartDateInputChange.mockReset();
      handleEndDateInputChange.mockReset();
      handleCalendarChange.mockReset();
      handleStateChange.mockReset();
    });

    it("the input renders initially, without a calendar", () => {
      expect(queryByTestId(/calendar-root/)).toBeNull();
    });

    it("keyboared navigation occurs when the start date grid is focused", () => {
      const dateInput = getByTestId(/start-date-input/);
      act(() => dateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      handleStateChange.mockReset();
      fireEvent.keyDown(dateInput, { key: "ArrowDown", keyCode: 40 });
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          focusLock: true
        }),
        expect.objectContaining({
          focusLock: true
        }),
        expect.any(Object)
      );
      handleStateChange.mockReset();
      fireEvent.focus(queryAllByRole("gridcell")[0]);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          enableKeyboardNavigation: true
        }),
        expect.objectContaining({
          enableKeyboardNavigation: true
        }),
        expect.objectContaining({
          enableKeyboardNavigation: false
        })
      );
    });

    it("keyboared navigation occurs when the end date grid is focused", () => {
      const dateInput = getByTestId(/start-date-input/);
      act(() => dateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      fireEvent.keyDown(dateInput, { key: "ArrowDown", keyCode: 40 });
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          enableKeyboardNavigation: false
        }),
        expect.objectContaining({
          open: true
        }),
        expect.any(Object)
      );
      fireEvent.focus(queryAllByRole("gridcell")[0]);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          enableKeyboardNavigation: true
        }),
        expect.objectContaining({
          enableKeyboardNavigation: true
        }),
        expect.any(Object)
      );
    });

    it("the calender opens and closes with input focus", () => {
      const startDateInput = getByTestId(/start-date-input/);
      const endDateInput = getByTestId(/end-date-input/);
      act(() => startDateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true,
          focusedInput: dateRangeInputType.startDate
        }),
        expect.objectContaining({
          open: true,
          focusedInput: dateRangeInputType.startDate
        }),
        expect.any(Object)
      );
      handleStateChange.mockReset();
      act(() => startDateInput.blur());
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: false,
          focusedInput: undefined
        }),
        expect.objectContaining({
          open: false,
          focusedInput: undefined
        }),
        expect.objectContaining({
          open: true,
          focusedInput: dateRangeInputType.startDate
        })
      );
      handleStateChange.mockReset();
      act(() => endDateInput.focus());
      expect(handleStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: true,
          focusedInput: dateRangeInputType.endDate
        }),
        expect.objectContaining({
          open: true,
          focusedInput: dateRangeInputType.endDate
        }),
        expect.objectContaining({
          open: false,
          focusedInput: undefined
        })
      );
      handleStateChange.mockReset();
      act(() => endDateInput.blur());
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          focusedInput: undefined,
          open: false
        }),
        expect.objectContaining({
          focusedInput: undefined,
          open: false
        }),
        expect.objectContaining({
          open: true,
          focusedInput: dateRangeInputType.endDate
        })
      );
    });

    it("the onStartDateInputChange method is called when the input changes with a valid date", () => {
      const dateInput = getByTestId(/start-date-input/);
      fireEvent.focus(dateInput);
      handleStateChange.mockReset();
      fireEvent.change(dateInput, { target: { value: "14/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleStartDateInputChange.mock.calls[0][0].target.value).toEqual(
        "14/01/2019"
      );
      expect(handleCalendarChange).not.toHaveBeenCalled();
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].startDate)
      ).toEqual("2019-01-14");
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-01-01");
    });

    it("the onStateChange method is called when the input changes with a valid date", () => {
      const startDateInput = getByTestId(/start-date-input/);
      fireEvent.focus(startDateInput);
      fireEvent.change(startDateInput, { target: { value: "14/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleStartDateInputChange.mock.calls[0][0].target.value).toEqual(
        "14/01/2019"
      );
      const endDateInput = getByTestId(/end-date-input/);
      endDateInput.focus();
      handleStateChange.mockReset();
      fireEvent.change(endDateInput, { target: { value: "16/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleEndDateInputChange.mock.calls[0][0].target.value).toEqual(
        "16/01/2019"
      );
      expect(
        toFormattedDate(handleStateChange.mock.calls[1][0].startDate)
      ).toEqual("2019-01-14");
      expect(
        toFormattedDate(handleStateChange.mock.calls[1][0].endDate)
      ).toEqual("2019-01-16");
      expect(
        toFormattedDate(handleStateChange.mock.calls[1][0].visibleFromDate)
      ).toEqual("2019-01-01");
    });

    it("the onStateChange method is called when the input changes with an invalid date", () => {
      const dateInput = getByTestId(/start-date-input/);
      fireEvent.focus(dateInput);
      fireEvent.change(dateInput, { target: { value: "14/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      handleStateChange.mockReset();
      handleStartDateInputChange.mockReset();
      fireEvent.change(dateInput, { target: { value: "xx/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleStartDateInputChange.mock.calls[0][0].target.value).toEqual(
        "xx/01/2019"
      );
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: undefined
        }),
        expect.objectContaining({
          startDate: undefined
        }),
        expect.any(Object)
      );
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-01-01");
    });

    it("the onEndDateInputChange method is called when the input changes with a valid date", () => {
      const dateInput = getByTestId(/end-date-input/);
      fireEvent.focus(dateInput);
      handleStateChange.mockReset();
      fireEvent.change(dateInput, { target: { value: "14/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleEndDateInputChange.mock.calls[0][0].target.value).toEqual(
        "14/01/2019"
      );
      expect(handleCalendarChange).not.toHaveBeenCalled();
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].endDate)
      ).toEqual("2019-01-14");
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-01-01");
    });

    it("the onEndDateInputChange method is called when the input changes with an invalid date", () => {
      const startDateInput = getByTestId(/start-date-input/);
      fireEvent.change(startDateInput, { target: { value: "12/01/2019" } });
      const endDateInput = getByTestId(/end-date-input/);
      fireEvent.change(endDateInput, { target: { value: "14/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      handleStateChange.mockReset();
      handleEndDateInputChange.mockReset();
      fireEvent.change(endDateInput, { target: { value: "xx/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleEndDateInputChange.mock.calls[0][0].target.value).toEqual(
        "xx/01/2019"
      );
      expect(handleStateChange.mock.calls[0][0].endDate).toEqual(undefined);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-01-01");
    });

    it("the onCalendarChange method is called when the calendar changes", () => {
      const dateInput = getByTestId(/start-date-input/);
      act(() => dateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      const startDate = getByText(/22/);
      fireEvent.keyDown(dateInput, { key: "ArrowDown", keyCode: 40 });
      fireEvent.click(startDate);
      expect(toFormattedDate(handleCalendarChange.mock.calls[0][0][0])).toEqual(
        "2020-03-22"
      );
      expect(handleCalendarChange.mock.calls[0][0][1]).toEqual(undefined);
      const endDate = getByText(/24/);
      fireEvent.click(endDate);
      expect(toFormattedDate(handleCalendarChange.mock.calls[1][0][0])).toEqual(
        "2020-03-22"
      );
      expect(toFormattedDate(handleCalendarChange.mock.calls[1][0][1])).toEqual(
        "2020-03-24"
      );
    });

    it("the calendar is closed when a date range is selected", () => {
      const dateInput = getByTestId(/start-date-input/);
      act(() => dateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      handleStateChange.mockReset();
      fireEvent.click(getByText(/22/));
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true
        }),
        expect.any(Object),
        expect.any(Object)
      );
      act(() => getByText(/24/).focus());
      handleStateChange.mockReset();
      fireEvent.click(getByText(/24/));
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: false
        }),
        expect.any(Object)
      );
      expect(queryByTestId(/calendar-root/)).toBeNull();
    });

    it("the calendar is closed when the mouse is clicked outside", () => {
      const dateInput = getByTestId(/start-date-input/);
      act(() => dateInput.focus());
      expect(handleStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: true
        }),
        expect.objectContaining({
          open: true
        }),
        expect.any(Object)
      );
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      handleStateChange.mockReset();
      fireEvent.mouseDown(document.body);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: false
        }),
        expect.any(Object)
      );
    });

    it("the calendar is opened on mouse down within start date input", () => {
      const dateInput = getByTestId(/start-date-input/);
      fireEvent.focus(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      const startDay = getByText(/22/);
      fireEvent.click(startDay);
      const endDay = getByText(/23/);
      fireEvent.click(endDay);
      fireEvent.mouseDown(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
    });

    it("the calendar is opened on mouse down within end date input", () => {
      const dateInput = getByTestId(/end-date-input/);
      fireEvent.focus(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      const startDay = getByText(/22/);
      fireEvent.click(startDay);
      const endDay = getByText(/23/);
      fireEvent.click(endDay);
      expect(queryByTestId(/calendar-root/)).toBeNull();
      fireEvent.mouseDown(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
    });
  });
});
