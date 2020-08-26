import { useEffect, useRef, useState } from "react";
import { CalendarProvider } from "./CalendarProvider";
import { useDebouncedCallback } from "use-debounce";
import CalendarWithFocusLock from "./CalendarWithFocusLock";
import dateRangeInputReducer, {
  dateRangeInputType,
  dateRangeInputActions
} from "./reducers/dateRangeInputReducer";
import calendarReducer from "./reducers/calendarReducer";
import callAll from "./callAll";
import composeRefs from "@seznam/compose-react-refs";

const INPUT_CHANGE_DEBOUNCE_MSECS = 250;

const defaultParse = value => new Date(value);

const reducers = [calendarReducer, dateRangeInputReducer];

const useDateRangeInput = (props = {}) => {
  const { actions, adapter, parse = defaultParse, theme, weekOffset } =
    props || {};
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const popperRef = useRef(null);
  const defaultActionsRef = useRef(null);
  const actionsRef = actions || defaultActionsRef;

  const [open, setOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState();
  const refocusInput = useRef(false);
  const inputHasFocusRef = useRef();
  const currentRangeRef = useRef([undefined, undefined]);

  useEffect(() => {
    if (!refocusInput.current) {
      return;
    }
    if (focusedInput === dateRangeInputType.startDate) {
      startDateInputRef.current.focus();
    } else if (focusedInput === dateRangeInputType.endDate) {
      endDateInputRef.current.focus();
    }
  }, [endDateInputRef, focusedInput, refocusInput, startDateInputRef]);

  const [handleStartDateInputChange] = useDebouncedCallback(
    function handleStartDateInputChange(event) {
      const newDate = parse(event.target.value);
      const { setStartDate, setVisibleFromDate, dateAPI } = actionsRef.current;
      const isValid = dateAPI.isValid(newDate);
      if (isValid && !dateAPI.isSameDay(newDate, currentRangeRef.current[0])) {
        setStartDate(newDate);
        setVisibleFromDate(newDate);
      } else if (!isValid) {
        setStartDate(undefined);
      }
    },
    INPUT_CHANGE_DEBOUNCE_MSECS
  );

  const [handleEndDateInputChange] = useDebouncedCallback(
    function handleEndDateInputChange(event) {
      const newDate = parse(event.target.value);
      const { setEndDate, setVisibleFromDate, dateAPI } = actionsRef.current;
      const isValid = dateAPI.isValid(newDate);
      if (isValid && !dateAPI.isSameDay(newDate, currentRangeRef.current[1])) {
        setEndDate(newDate);
        setVisibleFromDate(newDate);
      } else if (!isValid) {
        setEndDate(undefined);
      }
    },
    INPUT_CHANGE_DEBOUNCE_MSECS
  );

  const handleStateChange = (state, changes, prevousState) => {
    if (Object.prototype.hasOwnProperty.call(changes, "open")) {
      setOpen(changes.open);
      if (!changes.open) {
        refocusInput.current = true;
        setFocusedInput(changes.focusedInput || prevousState.focusedInput);
      }
    }
  };

  const handleClickOutside = () => {
    const { mouseClickOutside } = actionsRef.current;
    mouseClickOutside();
  };

  const handleEscapeKey = () => {
    const { setOpen } = actionsRef.current;
    setOpen(false);
  };

  const handleMouseDown = () => {
    const { setOpen } = actionsRef.current;
    if (!open) {
      setOpen(true);
    }
  };

  const handleStartDateInputFocus = () => {
    inputHasFocusRef.current = true;
    if (refocusInput.current) {
      refocusInput.current = false;
      return;
    }
    const { dispatch } = actionsRef.current;
    dispatch({ type: dateRangeInputActions.focusStartDate });
  };

  const handleStartDateInputBlur = event => {
    inputHasFocusRef.current = false;
    refocusInput.current = false;
    setFocusedInput(undefined);
    if (
      event.relatedTarget &&
      popperRef.current &&
      event.relatedTarget !== endDateInputRef.current &&
      !popperRef.current.contains(event.relatedTarget)
    ) {
      const { dispatch } = actionsRef.current;
      dispatch({ type: dateRangeInputActions.blurStartDate });
    }
  };

  const handleEndDateInputFocus = () => {
    inputHasFocusRef.current = true;
    if (refocusInput.current) {
      refocusInput.current = false;
      return;
    }
    const { dispatch } = actionsRef.current;
    dispatch({ type: dateRangeInputActions.focusEndDate });
  };

  const handleEndDateInputBlur = event => {
    inputHasFocusRef.current = false;
    refocusInput.current = false;
    setFocusedInput(undefined);
    if (
      event.relatedTarget &&
      popperRef.current &&
      event.relatedTarget !== startDateInputRef.current &&
      !popperRef.current.contains(event.relatedTarget)
    ) {
      const { dispatch } = actionsRef.current;
      dispatch({ type: dateRangeInputActions.blurEndDate });
    }
  };

  const handleKeyDown = event => {
    const { dispatch, setOpen } = actionsRef.current;
    if (event.key === "Tab" || event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      setOpen(true);
      dispatch({ type: dateRangeInputActions.focusLock, enable: true });
    }
  };

  const getStartDateProps = ({
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onMouseDown,
    ref,
    ...rest
  } = {}) => {
    const handleInputChange = event => {
      event.persist();
      handleStartDateInputChange(event);
    };
    return {
      onBlur: callAll(onBlur, handleStartDateInputBlur),
      onChange: callAll(handleInputChange, onChange),
      onFocus: callAll(onFocus, handleStartDateInputFocus),
      onKeyDown: callAll(onKeyDown, handleKeyDown),
      onMouseDown: callAll(onMouseDown, handleMouseDown),
      ref: composeRefs(startDateInputRef, ref),
      tabIndex: 0,
      ...rest
    };
  };

  const getEndDateProps = ({
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onMouseDown,
    ref,
    ...rest
  } = {}) => {
    const handleInputChange = event => {
      event.persist();
      handleEndDateInputChange(event);
    };
    return {
      onBlur: callAll(onBlur, handleEndDateInputBlur),
      onChange: callAll(handleInputChange, onChange),
      onFocus: callAll(onFocus, handleEndDateInputFocus),
      onKeyDown: callAll(onKeyDown, handleKeyDown),
      onMouseDown: callAll(onMouseDown, handleMouseDown),
      ref: composeRefs(endDateInputRef, ref),
      tabIndex: 0,
      ...rest
    };
  };

  const getCalendarProviderProps = ({
    onCalendarChange,
    onStateChange,
    ...rest
  } = {}) => {
    const handleCalendarChange = value => {
      currentRangeRef.current = value;
      if (!inputHasFocusRef.current && onCalendarChange) {
        onCalendarChange(value);
      }
    };
    return {
      actions: actionsRef,
      adapter,
      allowRange: true,
      initialEnableKeyboardNavigation: false,
      onCalendarChange: handleCalendarChange,
      onStateChange: callAll(onStateChange, handleStateChange),
      reducers,
      theme,
      weekOffset,
      ...rest
    };
  };

  const ignoreClickOutsideRefs = useRef([startDateInputRef, endDateInputRef]);

  const getPopperProps = ({
    anchorEl,
    onClickOutside,
    onEscapeKey,
    ref,
    ...rest
  } = {}) => ({
    open,
    anchorEl: anchorEl || startDateInputRef.current,
    ignoreClickOutsideRefs: ignoreClickOutsideRefs.current,
    onClickOutside: callAll(onClickOutside, handleClickOutside),
    onEscapeKey: callAll(onEscapeKey, handleEscapeKey),
    ref: composeRefs(popperRef, ref),
    ...rest
  });

  return {
    Calendar: CalendarWithFocusLock,
    CalendarProvider,
    getCalendarProviderProps,
    getStartDateProps,
    getEndDateProps,
    getPopperProps
  };
};

export default useDateRangeInput;
