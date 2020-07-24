export const calendarActions = {
  focusDate: "FOCUS_DATE",
  keyPress: "KEY_PRESS",
  mouseClickOutside: "MOUSE_CLICK_OUTSIDE",
  navigatePrevious: "NAVIGATE_PREV",
  navigateNext: "NAVIGATE_NEXT",
  selectDate: "SELECT_DATE",
  setAnimating: "ANIMATING",
  setEnableKeyboardNavigation: "SET_KEYBOARD_NAV",
  setEndDate: "SET_END_DATE",
  setFocusableDate: "SET_FOCUSABLE_DATE",
  setKeyboardCursor: "SET_KEYBOARD_CURSOR",
  setMouseCursor: "SET_MOUSE_CURSOR",
  setStartDate: "SET_START_DATE",
  setOpen: "SET_OPEN",
  setVisibleFromDate: "SET_VISIBLE_FROM_DATE"
};

export const cursorType = {
  keyboard: "keyboard",
  mouse: "mouse"
};

const calendarReducer = (
  state,
  action,
  {
    addDays,
    addMonths,
    addWeeks,
    addYears,
    getLastVisibleDate,
    getNumberVisibleMonths,
    isAfter,
    isBefore,
    endOfMonth,
    endOfYear,
    nextEnabledDate,
    previousEnabledDate,
    startOfMonth,
    startOfYear,
    subtractDays,
    subtractMonths,
    subtractWeeks,
    subtractYears
  }
) => {
  if (action.type === calendarActions.setOpen) {
    if (!action.open) {
      return {
        ...state,
        animating: false,
        enableKeyboardNavigation: false,
        open: false
      };
    }
    return {
      ...state,
      focusableDate: state.visibleFromDate,
      focusedDate: undefined,
      open: true
    };
  } else if (action.type === calendarActions.setAnimating) {
    return {
      ...state,
      animating: action.animating
    };
  } else if (action.type === calendarActions.setMouseCursor) {
    return {
      ...state,
      activeCursor: cursorType.mouse,
      mouseCursor: action.date
    };
  } else if (action.type === calendarActions.setKeyboardCursor) {
    return {
      ...state,
      activeCursor: cursorType.keyboard,
      keyboardCursor: action.date
    };
  } else if (action.type === calendarActions.navigatePrevious) {
    const previousFocusedDate = subtractMonths(state.focusableDate, 1);
    const previousStartDate = subtractMonths(state.visibleFromDate, 1);
    return {
      ...state,
      activeCursor: cursorType.keyboard,
      focusableDate: previousFocusedDate,
      keyboardCursor: previousFocusedDate,
      visibleFromDate: startOfMonth(previousStartDate)
    };
  } else if (action.type === calendarActions.navigateNext) {
    const nextFocusedDate = addMonths(state.focusableDate, 1);
    const nextStartDate = addMonths(state.visibleFromDate, 1);
    return {
      ...state,
      activeCursor: cursorType.keyboard,
      focusableDate: nextFocusedDate,
      keyboardCursor: nextFocusedDate,
      visibleFromDate: startOfMonth(nextStartDate)
    };
  } else if (action.type === calendarActions.setVisibleFromDate) {
    return {
      ...state,
      visibleFromDate: startOfMonth(action.date)
    };
  } else if (action.type === calendarActions.setFocusableDate) {
    return {
      ...state,
      focusableDate: action.date
    };
  } else if (action.type === calendarActions.focusDate) {
    return {
      ...state,
      focusedDate: action.date
    };
  } else if (action.type === calendarActions.mouseClickOutside) {
    return {
      ...state,
      animating: false,
      enableKeyboardNavigation: false,
      focusableDate: undefined,
      focusedDate: undefined,
      open: false
    };
  } else if (action.type === calendarActions.setEnableKeyboardNavigation) {
    return {
      ...state,
      enableKeyboardNavigation: action.enable
    };
  } else if (action.type === calendarActions.keyPress) {
    const { key, ctrlKey, shiftKey } = action.key;
    let nextCursor;
    let nextVisibleFromDate;
    if (key === "Home") {
      if (ctrlKey) {
        const yearValue = startOfYear(state.keyboardCursor);
        nextVisibleFromDate = { visibleFromDate: yearValue };
        nextCursor = yearValue;
      } else {
        nextCursor = startOfMonth(state.keyboardCursor);
      }
    } else if (key === "End") {
      if (ctrlKey) {
        const yearValue = endOfYear(state.keyboardCursor);
        nextVisibleFromDate = { visibleFromDate: yearValue };
        nextCursor = yearValue;
      } else {
        nextCursor = endOfMonth(state.keyboardCursor);
      }
    } else if (key === "PageUp" && shiftKey) {
      nextCursor = subtractYears(state.keyboardCursor, 1);
      nextVisibleFromDate = {
        visibleFromDate: subtractYears(state.visibleFromDate, 1)
      };
    } else if (key === "PageUp") {
      nextCursor = subtractMonths(state.keyboardCursor, 1);
    } else if (key === "PageDown" && shiftKey) {
      nextCursor = addYears(state.keyboardCursor, 1);
      nextVisibleFromDate = {
        visibleFromDate: addYears(state.visibleFromDate, 1)
      };
    } else if (key === "PageDown") {
      nextCursor = addMonths(state.keyboardCursor, 1);
    } else if (key === "ArrowUp") {
      nextCursor = subtractWeeks(state.keyboardCursor, 1);
    } else if (key === "ArrowDown") {
      nextCursor = addWeeks(state.keyboardCursor, 1);
    } else if (key === "ArrowLeft") {
      nextCursor = subtractDays(state.keyboardCursor, 1);
    } else if (key === "ArrowRight") {
      nextCursor = addDays(state.keyboardCursor, 1);
    }
    if (!nextCursor) {
      return state;
    }
    const isPastDate = isBefore(nextCursor, state.keyboardCursor);
    nextCursor = isPastDate
      ? previousEnabledDate(nextCursor)
      : nextEnabledDate(nextCursor);
    if (
      !nextVisibleFromDate &&
      isAfter(nextCursor, getLastVisibleDate(state.visibleFromDate))
    ) {
      nextVisibleFromDate = {
        visibleFromDate: addMonths(
          state.visibleFromDate,
          getNumberVisibleMonths()
        )
      };
    } else if (
      !nextVisibleFromDate &&
      isBefore(nextCursor, state.visibleFromDate)
    ) {
      nextVisibleFromDate = {
        visibleFromDate: subtractMonths(
          state.visibleFromDate,
          getNumberVisibleMonths()
        )
      };
    }
    return {
      ...state,
      keyboardCursor: nextCursor,
      activeCursor: cursorType.keyboard,
      focusedDate: nextCursor,
      focusableDate: nextCursor,
      ...nextVisibleFromDate
    };
  }
  return state;
};

export default calendarReducer;
