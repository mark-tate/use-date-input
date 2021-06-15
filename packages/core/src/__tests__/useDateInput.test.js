import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import { Popper } from "@use-date-input/popper";
import { parse } from "date-fns";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import moment from "moment";
import createDateAPI from "../createDateAPI";

import useDateInput from "../useDateInput";

jest.useFakeTimers();

describe("given useDateInput", () => {
  describe.each`
    api           | adapter           | weekOffset | parse
    ${"date-fns"} | ${dateFnsAdapter} | ${0}       | ${value => parse(value, "dd/MM/yyyy", new Date())}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}       | ${value => dayjs(value, "DD/MM/YYYY")}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}      | ${value => DateTime.fromFormat(value, "dd/MM/yyyy")}
    ${"moment"}   | ${momentAdapter}  | ${0}       | ${value => moment(value, "DD/MM/YYYY")}
  `("with $api", ({ adapter, parse, weekOffset }) => {
    let getByText, getByTestId, queryByTestId, queryAllByRole;
    const { toFormattedDate } = createDateAPI({ adapter, weekOffset });
    const handleInputChange = jest.fn();
    const handleCalendarChange = jest.fn();
    const handleStateChange = jest.fn();
    beforeEach(() => {
      const SingleDatePicker = () => {
        const {
          Calendar,
          CalendarProvider,
          getCalendarProviderProps,
          getInputProps,
          getPopperProps
        } = useDateInput({
          adapter,
          parse,
          weekOffset
        });
        return (
          <>
            <input
              data-testid="date-input"
              {...getInputProps({ onChange: handleInputChange })}
            />
            <CalendarProvider
              {...getCalendarProviderProps({
                initialVisibleFromMonth: parse("01/02/2020"),
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
        <SingleDatePicker />
      ));
    });

    afterEach(() => {
      handleInputChange.mockReset();
      handleCalendarChange.mockReset();
      handleStateChange.mockReset();
    });

    it("the input renders initially, without a calendar", () => {
      expect(queryByTestId(/calendar-root/)).toBeNull();
    });

    it("keyboard navigation occurs when the grid is focused", () => {
      const dateInput = getByTestId(/date-input/);
      fireEvent.focus(dateInput);
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

    it("the calender opens and closes", () => {
      const dateInput = getByTestId(/date-input/);
      act(() => dateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true
        }),
        expect.objectContaining({
          open: true
        }),
        expect.any(Object)
      );
      act(() => dateInput.blur());
      expect(handleStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: true
        })
      );
    });

    it("the onInputChanges method is called when the input changes with a valid date", () => {
      const dateInput = getByTestId(/date-input/);
      fireEvent.focus(dateInput);
      handleStateChange.mockReset();
      fireEvent.change(dateInput, { target: { value: "14/01/2019" } });
      expect(handleStateChange).not.toHaveBeenCalled();
      act(() => {
        jest.runAllTimers();
      });
      expect(handleInputChange.mock.calls[0][0].target.value).toEqual(
        "14/01/2019"
      );
      expect(handleCalendarChange).not.toHaveBeenCalled();
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: expect.any(Object),
          visibleFromDate: expect.any(Object)
        }),
        expect.objectContaining({
          startDate: expect.any(Object),
          visibleFromDate: expect.any(Object)
        }),
        expect.any(Object)
      );
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].startDate)
      ).toEqual("2019-01-14");
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2019-01-01");
    });

    it("the onInputChanges method is called when the input changes with an invalid date", () => {
      const dateInput = getByTestId(/date-input/);
      fireEvent.focus(dateInput);
      handleStateChange.mockReset();
      fireEvent.change(dateInput, { target: { value: "14/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      handleStateChange.mockReset();
      handleInputChange.mockReset();
      handleCalendarChange.mockReset();
      fireEvent.change(dateInput, { target: { value: "xx/01/2019" } });
      act(() => {
        jest.runAllTimers();
      });
      expect(handleInputChange.mock.calls[0][0].target.value).toEqual(
        "xx/01/2019"
      );
      expect(handleCalendarChange).not.toHaveBeenCalled();
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: undefined
        }),
        expect.objectContaining({
          startDate: undefined
        }),
        expect.any(Object)
      );
    });

    it("the onCalendarChange method is called when the calendar changes", () => {
      const dateInput = getByTestId(/date-input/);
      act(() => dateInput.focus());
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      const testDay = getByText(/22/);
      fireEvent.keyDown(dateInput, { key: "ArrowDown", keyCode: 40 });
      fireEvent.click(testDay);
      expect(toFormattedDate(handleCalendarChange.mock.calls[0][0])).toEqual(
        "2020-02-22"
      );
    });

    it("the calendar is closed when a date is selected", () => {
      const dateInput = getByTestId(/date-input/);
      fireEvent.focus(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      const testDay = getByText(/23/);
      handleStateChange.mockReset();
      fireEvent.click(testDay);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: false
        }),
        expect.any(Object)
      );
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].startDate)
      ).toEqual("2020-02-23");
      expect(queryByTestId(/calendar-root/)).toBeNull();
    });

    it("the calendar is closed when the mouse is clicked outside", () => {
      const dateInput = getByTestId(/date-input/);
      fireEvent.focus(dateInput);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true
        }),
        expect.objectContaining({
          open: true
        }),
        expect.any(Object)
      );
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: false
        }),
        expect.objectContaining({
          open: true
        })
      );
      expect(queryByTestId(/calendar-root/)).toBeNull();
    });

    it("the calendar is opened on mouse down", () => {
      const dateInput = getByTestId(/date-input/);
      fireEvent.focus(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
      const testDay = getByText(/22/);
      fireEvent.click(testDay);
      expect(queryByTestId(/calendar-root/)).toBeNull();
      fireEvent.mouseDown(dateInput);
      expect(getByTestId(/calendar-root/)).toBeInTheDocument();
    });
  });
});
