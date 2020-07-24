import React, {
  useContext,
  useDebugValue,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from "react";
import PropTypes from "prop-types";
import calendarReducer, { calendarActions } from "./reducers/calendarReducer";
import singleDateReducer from "./reducers/singleDateReducer";
import dateRangeReducer from "./reducers/dateRangeReducer";
import createDateAPI from "./createDateAPI";

const CalendarContext = React.createContext({});
const CalendarStateContext = React.createContext({});

const defaultIsDayDisabled = () => false;
const defaultIsRangeValid = () => true;

const createDefaultReducers = allowRange => [
  calendarReducer,
  allowRange ? dateRangeReducer : singleDateReducer
];

const defaultInit = ({
  dateAPI,
  allowRange = false,
  initialEnableKeyboardNavigation = false,
  initialSelectedDate,
  initialVisibleFromMonth
}) => {
  const today = dateAPI.createDate();
  const { startOfMonth } = dateAPI;
  const visibleFromDate = startOfMonth(
    initialVisibleFromMonth || initialSelectedDate || today
  );
  let startDate;
  let endDate;
  let focusableDate;
  if (allowRange) {
    [startDate, endDate] = initialSelectedDate || [];
    focusableDate = startDate || endDate || visibleFromDate;
  } else {
    startDate = initialSelectedDate;
    focusableDate = startDate || visibleFromDate;
  }
  return {
    keyboardCursor: startDate || visibleFromDate,
    endDate,
    focusableDate,
    enableKeyboardNavigation: initialEnableKeyboardNavigation,
    isKeyboardCursorValid: true,
    isMouseCursorValid: true,
    mouseCursor: undefined,
    startDate,
    visibleFromDate
  };
};

const createdCombinedReducer = (reducers, props) => (state, reducerAction) => {
  // ENABLE to see new actions - console.log(state, reducerAction);
  return reducers.reduce(
    (newState, reducer) => reducer(newState, reducerAction, props),
    state
  );
};

const useEnhancedReducer = props => {
  const {
    allowRange = false,
    dateAPI,
    initialEnableKeyboardNavigation,
    isRangeValid = defaultIsRangeValid,
    initialSelectedDate,
    initialVisibleFromMonth,
    reducers,
    onCalendarChange,
    onStateChange
  } = props;
  useDebugValue("useEnhancedReducer");
  const previousStateRef = useRef();
  const nextStateRef = useRef();

  useEffect(() => {
    if (!previousStateRef.current) {
      previousStateRef.current = nextStateRef.current;
      return;
    }
    const nextStateKeys = Object.keys(nextStateRef.current);
    const changes = nextStateKeys.reduce((accumulatedChanges, stateKey) => {
      if (
        !Object.prototype.hasOwnProperty.call(
          previousStateRef.current,
          stateKey
        ) ||
        !Object.is(previousStateRef.current[stateKey], state[stateKey])
      ) {
        return { ...accumulatedChanges, [stateKey]: state[stateKey] };
      }
      return accumulatedChanges;
    }, {});
    const hasChanges = Object.keys(changes).length;
    if (onStateChange && hasChanges) {
      onStateChange(nextStateRef.current, changes, previousStateRef.current);
    }

    if (onCalendarChange && hasChanges) {
      const hasChangedStartDate =
        Object.prototype.hasOwnProperty.call(changes, "startDate") &&
        !!changes.startDate;
      const hasChangedEndDate =
        Object.prototype.hasOwnProperty.call(changes, "endDate") &&
        !!changes.endDate;
      if (!allowRange && hasChangedStartDate) {
        onCalendarChange(changes.startDate);
      } else if (hasChangedStartDate || hasChangedEndDate) {
        const nextStartDate = hasChangedStartDate
          ? changes.startDate
          : state.startDate;
        const nextEndDate = hasChangedEndDate ? changes.endDate : state.endDate;
        onCalendarChange([nextStartDate, nextEndDate]);
      }
    }
    previousStateRef.current = nextStateRef.current;
    nextStateRef.current = undefined;
  });

  const combinedReducer = useMemo(() => {
    const reducersToCombine = reducers || createDefaultReducers(allowRange);
    return createdCombinedReducer(reducersToCombine, {
      ...dateAPI,
      isRangeValid
    });
  }, [allowRange, isRangeValid, reducers, dateAPI]);

  const [state, dispatch] = useReducer(
    combinedReducer,
    {
      dateAPI,
      allowRange,
      initialEnableKeyboardNavigation,
      initialSelectedDate,
      initialVisibleFromMonth
    },
    defaultInit
  );
  nextStateRef.current = state;
  return [state, dispatch];
};

function createDispatchAPI(dispatch) {
  const setAnimating = animating =>
    dispatch({ type: calendarActions.setAnimating, animating });
  const setEnableKeyboardNavigation = enable =>
    dispatch({ type: calendarActions.setEnableKeyboardNavigation, enable });
  const setKeyPress = key =>
    dispatch({ type: calendarActions.keyPress, key: { ...key } });
  const setMouseCursor = date =>
    dispatch({ type: calendarActions.setMouseCursor, date });
  const setKeyboardCursor = date =>
    dispatch({ type: calendarActions.setKeyboardCursor, date });
  const setStartDate = date =>
    dispatch({ type: calendarActions.setStartDate, date });
  const setEndDate = date =>
    dispatch({ type: calendarActions.setEndDate, date });
  const selectDate = date =>
    dispatch({ type: calendarActions.selectDate, date });
  const setOpen = open => dispatch({ type: calendarActions.setOpen, open });
  const setVisibleFromDate = date =>
    dispatch({ type: calendarActions.setVisibleFromDate, date });
  const mouseClickOutside = () =>
    dispatch({ type: calendarActions.mouseClickOutside });
  const navigatePrevious = () =>
    dispatch({ type: calendarActions.navigatePrevious });
  const navigateNext = () => dispatch({ type: calendarActions.navigateNext });
  return {
    dispatch,
    mouseClickOutside,
    navigateNext,
    navigatePrevious,
    selectDate,
    setAnimating,
    setEnableKeyboardNavigation,
    setKeyboardCursor,
    setMouseCursor,
    setEndDate,
    setStartDate,
    setOpen,
    setKeyPress,
    setVisibleFromDate
  };
}

function CalendarProvider(props) {
  const {
    actions,
    adapter,
    children,
    components,
    isDayDisabled = defaultIsDayDisabled,
    numOfVisibleMonths,
    weekOffset
  } = props;
  const dateAPI = useMemo(
    () =>
      createDateAPI({
        adapter,
        isDayDisabled,
        numOfVisibleMonths,
        weekOffset
      }),
    [adapter, isDayDisabled, numOfVisibleMonths, weekOffset]
  );
  const [state, dispatch] = useEnhancedReducer({
    ...props,
    dateAPI
  });
  const dispatchAPI = useMemo(() => createDispatchAPI(dispatch), [dispatch]);
  React.useImperativeHandle(actions, () => ({ ...dispatchAPI, dateAPI }), [
    dateAPI,
    dispatchAPI
  ]);
  const value = useMemo(
    () => ({
      dateAPI,
      components,
      dispatchAPI,
      props
    }),
    [components, dateAPI, dispatchAPI, props]
  );

  return (
    <CalendarContext.Provider value={value}>
      <CalendarStateContext.Provider value={state}>
        {children}
      </CalendarStateContext.Provider>
    </CalendarContext.Provider>
  );
}
CalendarProvider.defaultProps = {
  allowRange: false,
  clickOutsideWhiteList: [],
  components: {},
  numOfColumns: 1,
  numOfVisibleMonths: 1
};
CalendarProvider.propTypes = {
  /** Imperative actions API */
  actions: PropTypes.object,
  /** Date API adapter */
  adapter: PropTypes.func,
  /** Allow date range */
  allowRange: PropTypes.bool,
  /** Calendar children */
  children: PropTypes.node,
  /** Custom Component overrides */
  components: PropTypes.shape({
    AnimatedGroup: PropTypes.elementType,
    Root: PropTypes.elementType,
    Day: PropTypes.elementType,
    DayOfWeek: PropTypes.elementType,
    Header: PropTypes.elementType,
    Month: PropTypes.elementType,
    MonthGroup: PropTypes.elementType,
    Week: PropTypes.elementType,
    WeekHeader: PropTypes.elementType
  }),
  initialEnableKeyboardNavigation: PropTypes.bool,
  initialSelectedDate: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  initialVisibleFromMonth: PropTypes.object,
  /** Day is disabled callback */
  isDayDisabled: PropTypes.func,
  /** Date range is valid callback */
  isRangeValid: PropTypes.func,
  /** Number of visible months */
  numOfVisibleMonths: PropTypes.number,
  /** Selected date change handler */
  onCalendarChange: PropTypes.func,
  /** State change handler */
  onStateChange: PropTypes.func,
  /** Reducer, to externalize control of state */
  reducer: PropTypes.func,
  /** Start of week offset from date API's default */
  weekOffset: PropTypes.number
};

function useCalendarComponent() {
  useDebugValue("useCalendarComponent");
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarComponent must be used within a CalendarProvider"
    );
  }
  return context.components;
}

function useCalendarDispatch() {
  useDebugValue("useCalendarDispatch");
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarDispatch must be used within a CalendarProvider"
    );
  }
  return context.dispatchAPI;
}

function useCalendarProps() {
  useDebugValue("useCalendarProps");
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendarProps must be used within a CalendarProvider");
  }
  return context.props;
}

function useCalendarState() {
  useDebugValue("useCalendarState");
  const context = React.useContext(CalendarStateContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarState must be used within a CalendarStateProvider"
    );
  }
  return context;
}

function useDateAPI() {
  useDebugValue("useDateAPI");
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useDateAPI must be used within a CalendarProvider");
  }
  return context.dateAPI;
}
function useHasCalendarProvider() {
  useDebugValue("useHasCalendarProvider");
  const context = React.useContext(CalendarContext);
  return context.props !== undefined;
}

export {
  CalendarProvider,
  useDateAPI,
  useCalendarComponent,
  useCalendarDispatch,
  useCalendarProps,
  useCalendarState,
  useHasCalendarProvider
};
