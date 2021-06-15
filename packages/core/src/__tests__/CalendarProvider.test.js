import React from "react";
import { act, render } from "@testing-library/react";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import createDateAPI from "../createDateAPI";

import {
  CalendarProvider,
  useCalendarDispatch,
  useCalendarComponent,
  useCalendarProps,
  useCalendarState
} from "../CalendarProvider";
import calendarReducer, { calendarActions } from "../reducers/calendarReducer";
import singleDateReducer from "../reducers/singleDateReducer";
import dateRangeReducer from "../reducers/dateRangeReducer";

const createDefaultReducers = (allowRange = false) => [
  calendarReducer,
  allowRange ? dateRangeReducer : singleDateReducer
];

describe("given CalendarProvider", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("with $api", ({ adapter, weekOffset }) => {
    const props = {
      adapter,
      reducers: createDefaultReducers(),
      weekOffset
    };

    const { createDate, toFormattedDate } = createDateAPI({
      adapter,
      weekOffset
    });

    it("creates an initial state when specified for a single date", () => {
      const TestSingleDateComponent = () => {
        const state = useCalendarState();
        expect(toFormattedDate(state.visibleFromDate)).toEqual("2020-12-01");
        expect(toFormattedDate(state.startDate)).toEqual("2020-12-10");
        expect(toFormattedDate(state.focusableDate)).toEqual("2020-12-10");
        expect(toFormattedDate(state.keyboardCursor)).toEqual("2020-12-10");
        expect(state.enableKeyboardNavigation).toEqual(true);
        expect(state.mouseCursor).toEqual(undefined);
        return null;
      };
      const initialStateProps = {
        initialEnableKeyboardNavigation: true,
        initialSelectedDate: createDate("2020-12-10"),
        initialVisibleFromMonth: createDate("2020-12-31")
      };
      render(
        <CalendarProvider
          {...initialStateProps}
          {...props}
          numOfVisibleMonths={2}
        >
          <TestSingleDateComponent />
        </CalendarProvider>
      );
    });

    it("creates an initial state when specified for a date range", () => {
      const TestRangeDateComponent = () => {
        const state = useCalendarState();
        expect(toFormattedDate(state.visibleFromDate)).toEqual("2020-12-01");
        expect(toFormattedDate(state.startDate)).toEqual("2020-12-10");
        expect(toFormattedDate(state.focusableDate)).toEqual("2020-12-10");
        expect(toFormattedDate(state.endDate)).toEqual("2020-12-17");
        expect(toFormattedDate(state.keyboardCursor)).toEqual("2020-12-10");
        expect(state.enableKeyboardNavigation).toEqual(true);
        expect(state.mouseCursor).toEqual(undefined);
        expect(state.isKeyboardCursorValid).toEqual(true);
        expect(state.isMouseCursorValid).toEqual(true);
        return null;
      };
      const initialStateProps = {
        initialEnableKeyboardNavigation: true,
        initialSelectedDate: [
          createDate("2020-12-10"),
          createDate("2020-12-17")
        ],
        initialVisibleFromMonth: createDate("2020-12-31")
      };
      render(
        <CalendarProvider
          {...initialStateProps}
          {...props}
          allowRange
          numOfVisibleMonths={2}
          reducers={[...createDefaultReducers(true)]}
        >
          <TestRangeDateComponent />
        </CalendarProvider>
      );
    });

    it("calls additional configured reducer", () => {
      const reducerState = {
        visibleFromDate: createDate("2020-12-10"),
        cursor: createDate("2020-12-10")
      };
      const reducerMock = jest.fn(state => ({ ...state, ...reducerState }));
      let navigateNext;
      const TestAPIComponent = () => {
        ({ navigateNext } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          reducers={[reducerMock, ...createDefaultReducers(true)]}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => navigateNext());
      expect(reducerMock).toHaveBeenCalledWith(
        expect.objectContaining({ visibleFromDate: expect.any(Object) }),
        expect.objectContaining({
          type: calendarActions.navigateNext
        }),
        expect.objectContaining({
          createDate: expect.any(Function)
        })
      );
    });

    it("calls onStateChange, when next month is selected", () => {
      const handleStateChange = jest.fn();
      let navigateNext;
      const TestAPIComponent = () => {
        ({ navigateNext } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => navigateNext());
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2021-01-01");
    });

    it("calls onStateChange, when previous month is selected", () => {
      const handleStateChange = jest.fn();
      let navigatePrevious;
      const TestAPIComponent = () => {
        ({ navigatePrevious } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => navigatePrevious());
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2020-11-01");
    });

    it("calls onStateChange, when keyboard cursor is set", () => {
      const handleStateChange = jest.fn();
      let setKeyboardCursor;
      const TestAPIComponent = () => {
        ({ setKeyboardCursor } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => setKeyboardCursor(createDate("2020-12-05")));
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].keyboardCursor)
      ).toEqual("2020-12-05");
    });

    it("calls onStateChange, when mouse cursor is set", () => {
      const handleStateChange = jest.fn();
      let setMouseCursor;
      const TestAPIComponent = () => {
        ({ setMouseCursor } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => setMouseCursor(createDate("2020-12-05")));
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].mouseCursor)
      ).toEqual("2020-12-05");
    });

    it("calls onStateChange, when calendar opens", () => {
      const handleStateChange = jest.fn();
      let setOpen;
      const TestAPIComponent = () => {
        ({ setOpen } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => setOpen(true));
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({ open: true }),
        { focusedDate: undefined, open: true },
        expect.any(Object)
      );
    });

    it("calls onStateChange, when month grid focusing changes", () => {
      const handleStateChange = jest.fn();
      let setEnableKeyboardNavigation;
      const TestAPIComponent = () => {
        ({ setEnableKeyboardNavigation } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => setEnableKeyboardNavigation(true));
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({ enableKeyboardNavigation: true }),
        { enableKeyboardNavigation: true },
        expect.any(Object)
      );
    });

    it("calls onStateChange, when mouse clicks outside", () => {
      const handleStateChange = jest.fn();
      let mouseClickOutside;
      const TestAPIComponent = () => {
        ({ mouseClickOutside } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => mouseClickOutside(true));
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(handleStateChange).toHaveBeenCalledWith(
        expect.objectContaining({ open: false }),
        expect.objectContaining({ open: false }),
        expect.any(Object)
      );
    });

    it("calls onStateChange, when a key is pressed", () => {
      const handleStateChange = jest.fn();
      let setEnableKeyboardNavigation;
      let setKeyPress;
      let setKeyboardCursor;
      const TestAPIComponent = () => {
        ({
          setEnableKeyboardNavigation,
          setKeyboardCursor,
          setKeyPress
        } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2019-08-01")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => {
        setKeyboardCursor(createDate("2019-08-01"));
        setEnableKeyboardNavigation(true);
        setKeyPress({
          key: "PageDown",
          shiftKey: true
        });
      });
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2020-08-01");
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].keyboardCursor)
      ).toEqual("2020-08-01");
    });

    it("calls onStateChange, when setVisibleFromDate is called", () => {
      const handleStateChange = jest.fn();
      let setVisibleFromDate;
      const TestAPIComponent = () => {
        ({ setVisibleFromDate } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2020-12-10")}
          onStateChange={handleStateChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => setVisibleFromDate(createDate("2020-11-01")));
      expect(handleStateChange.mock.calls.length).toEqual(1);
      expect(
        toFormattedDate(handleStateChange.mock.calls[0][0].visibleFromDate)
      ).toEqual("2020-11-01");
    });

    it("calls onChange, when a single date is selected", () => {
      const handleChange = jest.fn();
      let selectDate;
      const TestAPIComponent = () => {
        ({ selectDate } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2019-08-01")}
          onCalendarChange={handleChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => selectDate(createDate("2019-08-12")));
      expect(handleChange.mock.calls.length).toEqual(1);
      expect(toFormattedDate(handleChange.mock.calls[0][0])).toEqual(
        "2019-08-12"
      );
    });

    it("does not call onChange, when the date is undefined", () => {
      const handleChange = jest.fn();
      let selectDate;
      const TestAPIComponent = () => {
        ({ selectDate } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          initialVisibleFromMonth={createDate("2019-08-01")}
          onCalendarChange={handleChange}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => selectDate(undefined));
      expect(handleChange.mock.calls.length).toEqual(0);
    });

    it("calls onCalendarChange, when a date range is selected", () => {
      const handleChange = jest.fn();
      let selectDate;
      const TestAPIComponent = () => {
        ({ selectDate } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          allowRange
          initialVisibleFromMonth={createDate("2019-08-01")}
          onCalendarChange={handleChange}
          reducers={[...createDefaultReducers(true)]}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => {
        selectDate(createDate("2019-08-12"));
        selectDate(createDate("2019-08-14"));
      });
      expect(handleChange.mock.calls.length).toEqual(1);
      expect(toFormattedDate(handleChange.mock.calls[0][0][0])).toEqual(
        "2019-08-12"
      );
      expect(toFormattedDate(handleChange.mock.calls[0][0][1])).toEqual(
        "2019-08-14"
      );
    });

    it("calls onCalendarChange, when a date range is un-defined", () => {
      const handleChange = jest.fn();
      let selectDate;
      const TestAPIComponent = () => {
        ({ selectDate } = useCalendarDispatch());
        return null;
      };
      render(
        <CalendarProvider
          {...props}
          allowRange
          initialVisibleFromMonth={createDate("2019-08-01")}
          onCalendarChange={handleChange}
          reducers={[...createDefaultReducers(true)]}
        >
          <TestAPIComponent />
        </CalendarProvider>
      );
      act(() => {
        selectDate(createDate("2019-08-12"));
      });
      act(() => {
        selectDate(undefined);
      });
      expect(handleChange.mock.calls.length).toEqual(1);
      expect(toFormattedDate(handleChange.mock.calls[0][0][0])).toEqual(
        "2019-08-12"
      );
      expect(handleChange.mock.calls[0][0][1]).toEqual(undefined);
      handleChange.mockReset();
      act(() => {
        selectDate(undefined);
      });
      act(() => {
        selectDate(createDate("2019-08-13"));
      });
      expect(handleChange.mock.calls.length).toEqual(1);
      expect(toFormattedDate(handleChange.mock.calls[0][0][0])).toEqual(
        "2019-08-13"
      );
      expect(handleChange.mock.calls[0][0][1]).toEqual(undefined);
      handleChange.mockReset();
      act(() => {
        selectDate(undefined);
      });
      act(() => {
        selectDate(undefined);
      });
      expect(handleChange.mock.calls.length).toEqual(0);
    });

    it("returns the calendar props", () => {
      const TestPropsComponent = () => {
        const props = useCalendarProps();
        expect(props.testProp).toEqual(123);
        return null;
      };
      render(
        <CalendarProvider testProp={123} {...props}>
          <TestPropsComponent />
        </CalendarProvider>
      );
    });

    it("returns the custom calendar component overrides", () => {
      const mockComponents = {
        AnimatedGroup: "Mock Animated Group",
        Root: "Mock Root",
        Day: "Mock Day",
        Header: "Mock Header",
        Month: "Mock Month",
        MonthGroup: "Mock Month Group",
        Week: "Mock Week",
        WeekHeader: "Mock WeekHeader"
      };
      const TestCalendarComponents = () => {
        const components = useCalendarComponent();
        expect(components).toEqual(mockComponents);
        return null;
      };
      render(
        <CalendarProvider components={mockComponents} {...props}>
          <TestCalendarComponents />
        </CalendarProvider>
      );
    });

    it("returns the imperative actions API", () => {
      const actions = React.createRef();
      render(
        <CalendarProvider actions={actions} {...props}>
          {null}
        </CalendarProvider>
      );
      expect(actions.current).toEqual(
        expect.objectContaining({
          dateAPI: expect.objectContaining({
            createDate: expect.any(Function)
          }),
          dispatch: expect.any(Function),
          mouseClickOutside: expect.any(Function),
          navigateNext: expect.any(Function),
          navigatePrevious: expect.any(Function),
          selectDate: expect.any(Function),
          setAnimating: expect.any(Function),
          setEnableKeyboardNavigation: expect.any(Function),
          setKeyboardCursor: expect.any(Function),
          setMouseCursor: expect.any(Function),
          setEndDate: expect.any(Function),
          setStartDate: expect.any(Function),
          setOpen: expect.any(Function),
          setKeyPress: expect.any(Function),
          setVisibleFromDate: expect.any(Function)
        })
      );
    });
  });
});
