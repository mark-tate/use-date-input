import { calendarActions } from "./calendarReducer";

export const dateRangeInputType = {
  startDate: "START_DATE",
  endDate: "END_DATE"
};
export const dateRangeInputActions = {
  blurStartDate: "BLUR_START_DATE",
  blurEndDate: "BLUR_END_DATE",
  focusStartDate: "FOCUS_START_DATE",
  focusEndDate: "FOCUS_END_DATE",
  focusLock: "FOCUS_LOCK"
};

const calcVisibleView = (
  fromDate,
  visibleFromDate,
  isSameDay,
  startOfMonth
) => {
  let updatedVisibleFromDate = startOfMonth(fromDate);
  updatedVisibleFromDate = isSameDay(updatedVisibleFromDate, visibleFromDate)
    ? visibleFromDate
    : updatedVisibleFromDate;
  return {
    focusableDate: updatedVisibleFromDate,
    visibleFromDate: updatedVisibleFromDate
  };
};

const dateRangeInputReducer = (
  state,
  action,
  { isBefore, isBetween, isSameDay, startOfMonth }
) => {
  if (action.type === calendarActions.setOpen) {
    if (!action.open) {
      return { ...state, focusLock: false, open: false };
    }
    const changes = { focusLock: false };
    if (state.focusedInput === dateRangeInputType.startDate) {
      const startDate =
        state.startDate || state.endDate || state.visibleFromDate;
      let updatedVisibleFromDate = startOfMonth(startDate);
      updatedVisibleFromDate = isSameDay(
        updatedVisibleFromDate,
        state.visibleFromDate
      )
        ? state.visibleFromDate
        : updatedVisibleFromDate;
      return {
        ...state,
        ...changes,
        focusableDate: startDate,
        keyboardCursor: startDate,
        visibleFromDate: updatedVisibleFromDate
      };
    } else if (state.focusedInput === dateRangeInputType.endDate) {
      const endDate = state.endDate || state.startDate || state.visibleFromDate;
      let updatedVisibleFromDate = startOfMonth(endDate);
      updatedVisibleFromDate = isSameDay(
        updatedVisibleFromDate,
        state.visibleFromDate
      )
        ? state.visibleFromDate
        : updatedVisibleFromDate;
      return {
        ...state,
        ...changes,
        focusableDate: endDate,
        keyboardCursor: endDate,
        visibleFromDate: updatedVisibleFromDate
      };
    } else {
      return {
        ...state,
        ...changes,
        focusableDate: state.visibleFromDate,
        keyboardCursor: state.visibleFromDate
      };
    }
  } else if (action.type === dateRangeInputActions.focusLock) {
    return {
      ...state,
      focusLock: action.enable
    };
  } else if (action.type === calendarActions.setStartDate) {
    return {
      ...state,
      focusableDate: action.date,
      focusedDate: undefined,
      startDate: action.date,
      enableKeyboardNavigation: false
    };
  } else if (action.type === calendarActions.setEndDate) {
    return {
      ...state,
      endDate: action.date,
      focusableDate: action.date,
      focusedDate: undefined,
      enableKeyboardNavigation: false
    };
  } else if (action.type === dateRangeInputActions.blurStartDate) {
    return { ...state, open: false, focusedInput: undefined };
  } else if (action.type === dateRangeInputActions.blurEndDate) {
    return { ...state, open: false, focusedInput: undefined };
  } else if (action.type === dateRangeInputActions.focusStartDate) {
    const visibleView = calcVisibleView(
      state.startDate || state.endDate || state.visibleFromDate,
      state.visibleFromDate,
      isSameDay,
      startOfMonth
    );
    return {
      ...state,
      animating: false,
      focusedInput: dateRangeInputType.startDate,
      focusedDate: undefined,
      open: true,
      enableKeyboardNavigation: false,
      ...visibleView
    };
  } else if (action.type === dateRangeInputActions.focusEndDate) {
    const visibleView = calcVisibleView(
      state.endDate || state.startDate || state.visibleFromDate,
      state.visibleFromDate,
      isSameDay,
      startOfMonth
    );
    return {
      ...state,
      animating: false,
      focusedInput: dateRangeInputType.endDate,
      focusedDate: undefined,
      open: true,
      enableKeyboardNavigation: false,
      ...visibleView
    };
  } else if (
    action.type === calendarActions.selectDate ||
    (action.type === calendarActions.keyPress && action.key.key === "Enter")
  ) {
    let cursor;
    if (Object.prototype.hasOwnProperty.call(action, "date")) {
      cursor = action.date;
    } else {
      cursor = state.keyboardCursor;
    }
    const newCursorState = {
      focusableDate: cursor,
      focusedDate: undefined,
      keyboardCursor: cursor,
      mouseCursor: undefined
    };
    if (
      state.focusedInput === dateRangeInputType.startDate &&
      isSameDay(cursor, state.startDate)
    ) {
      return {
        ...state,
        ...newCursorState,
        focusedInput: dateRangeInputType.endDate
      };
    } else if (
      state.focusedInput === dateRangeInputType.endDate &&
      isSameDay(cursor, state.endDate)
    ) {
      return {
        ...state,
        ...newCursorState,
        focusedInput: dateRangeInputType.endDate,
        open: false,
        focusLock: false
      };
    } else if (
      state.startDate &&
      state.endDate &&
      isBetween(cursor, state.startDate, state.endDate)
    ) {
      if (state.focusedInput === dateRangeInputType.startDate) {
        return {
          ...state,
          ...newCursorState,
          startDate: cursor,
          focusedInput: dateRangeInputType.endDate
        };
      } else {
        return {
          ...state,
          ...newCursorState,
          endDate: cursor,
          focusedInput: dateRangeInputType.endDate,
          open: false,
          focusLock: false
        };
      }
    } else if (
      state.startDate &&
      state.endDate &&
      state.focusedInput === dateRangeInputType.startDate
    ) {
      if (isBefore(cursor, state.endDate)) {
        return {
          ...state,
          ...newCursorState,
          startDate: cursor,
          focusedInput: dateRangeInputType.endDate
        };
      } else {
        // Reset the end date and create a new selection
        return {
          ...state,
          ...newCursorState,
          startDate: cursor,
          endDate: undefined,
          focusedInput: dateRangeInputType.endDate
        };
      }
    } else if (
      state.startDate &&
      state.endDate &&
      state.focusedInput === dateRangeInputType.endDate
    ) {
      if (isBefore(cursor, state.startDate)) {
        // Reset the start date and create a new selection
        return {
          ...state,
          ...newCursorState,
          startDate: cursor,
          focusedInput: dateRangeInputType.endDate,
          endDate: undefined
        };
      } else {
        return {
          ...state,
          ...newCursorState,
          endDate: cursor,
          focusedInput: dateRangeInputType.endDate,
          open: false,
          focusLock: false
        };
      }
    } else if (
      state.startDate &&
      state.focusedInput === dateRangeInputType.endDate &&
      !isBefore(cursor, state.startDate)
    ) {
      return {
        ...state,
        ...newCursorState,
        endDate: cursor,
        focusedInput: dateRangeInputType.endDate,
        open: false,
        focusLock: false
      };
    } else {
      return {
        ...state,
        ...newCursorState,
        startDate: cursor,
        focusedInput: dateRangeInputType.endDate,
        focusLock: false
      };
    }
  } else if (action.type === calendarActions.mouseClickOutside) {
    return {
      ...state,
      focusLock: false,
      open: false
    };
  }
  return state;
};

export default dateRangeInputReducer;
