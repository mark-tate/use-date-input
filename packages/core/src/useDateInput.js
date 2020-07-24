import { useEffect, useRef, useState } from "react";
import dateInputReducer, {
  dateInputActions
} from "./reducers/dateInputReducer";
import calendarReducer from "./reducers/calendarReducer";
import { CalendarProvider } from "./CalendarProvider";
import { useDebouncedCallback } from "use-debounce";
import callAll from "./callAll";
import CalendarWithFocusLock from "./CalendarWithFocusLock";
import composeRefs from "@seznam/compose-react-refs";

const reducers = [calendarReducer, dateInputReducer];

const defaultParse = value => new Date(value);

const INPUT_CHANGE_DEBOUNCE_MSECS = 250;

const useDateInput = props => {
  const { adapter, actions, parse = defaultParse, theme, weekOffset } =
    props || {};
  const inputRef = useRef(null);
  const popperRef = useRef(null);
  const defaultActionsRef = useRef(null);
  const actionsRef = actions || defaultActionsRef;
  const [open, setOpen] = useState(false);
  const refocusInputRef = useRef(false);
  const inputHasFocusRef = useRef();
  const lastInputValue = useRef();

  useEffect(() => {
    if (refocusInputRef.current) {
      inputRef.current.focus();
    }
  });

  const [handleInputDateChange] = useDebouncedCallback(
    function handleInputDateChange(inputDate) {
      const newDate = parse(inputDate);
      const { setStartDate, setVisibleFromDate, dateAPI } = actionsRef.current;
      const isValid = dateAPI.isValid(newDate);
      if (isValid && !dateAPI.isSameDay(newDate, lastInputValue.current)) {
        setStartDate(newDate);
        setVisibleFromDate(newDate);
      } else if (!isValid) {
        lastInputValue.current = undefined;
        setStartDate(undefined);
      }
    },
    INPUT_CHANGE_DEBOUNCE_MSECS
  );

  const handleStateChange = (state, changes) => {
    if (Object.prototype.hasOwnProperty.call(changes, "open")) {
      if (!changes.open) {
        refocusInputRef.current = true;
      }
      setOpen(changes.open);
    }
  };

  const handleClickOutside = () => {
    const { mouseClickOutside } = actionsRef.current;
    mouseClickOutside();
  };

  const handleMouseDown = () => {
    const { setOpen } = actionsRef.current;
    if (!open) {
      setOpen(true);
    }
  };

  const handleInputFocus = () => {
    inputHasFocusRef.current = true;
    if (refocusInputRef.current) {
      refocusInputRef.current = false;
      return;
    }
    const { dispatch } = actionsRef.current;
    dispatch({ type: dateInputActions.focusInput });
  };

  const handleInputBlur = event => {
    inputHasFocusRef.current = false;
    refocusInputRef.current = false;
    if (
      event.relatedTarget &&
      popperRef.current &&
      !popperRef.current.contains(event.relatedTarget)
    ) {
      const { dispatch } = actionsRef.current;
      dispatch({ type: dateInputActions.blurInput });
    }
  };

  const handleKeyDown = event => {
    const { dispatch, setOpen } = actionsRef.current;
    if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      setOpen(true);
      dispatch({ type: dateInputActions.focusLock, enable: true });
    }
  };

  const getInputProps = ({
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
      const { value } = event.target;
      handleInputDateChange(value);
    };
    return {
      onBlur: callAll(onBlur, handleInputBlur),
      onChange: callAll(handleInputChange, onChange),
      onFocus: callAll(onFocus, handleInputFocus),
      onKeyDown: callAll(onKeyDown, handleKeyDown),
      onMouseDown: callAll(onMouseDown, handleMouseDown),
      ref: composeRefs(inputRef, ref),
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
      lastInputValue.current = value;
      if (!inputHasFocusRef.current && onCalendarChange) {
        onCalendarChange(value);
      }
    };
    return {
      actions: actionsRef,
      adapter,
      initialEnableKeyboardNavigation: false,
      onCalendarChange: handleCalendarChange,
      onStateChange: callAll(onStateChange, handleStateChange),
      reducers,
      theme,
      weekOffset,
      ...rest
    };
  };

  const clickOutsideWhiteListRef = useRef([inputRef]);

  const getPopperProps = ({ anchorEl, onClickOutside, ref, ...rest } = {}) => ({
    open,
    anchorEl: anchorEl || inputRef.current,
    clickOutsideWhiteList: clickOutsideWhiteListRef.current,
    onClickOutside: callAll(onClickOutside, handleClickOutside),
    ref: composeRefs(popperRef, ref),
    ...rest
  });

  return {
    Calendar: CalendarWithFocusLock,
    CalendarProvider,
    getCalendarProviderProps,
    getInputProps,
    getPopperProps
  };
};

export default useDateInput;
