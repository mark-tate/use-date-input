import { calendarActions } from "./calendarReducer";

const dateRangeReducer = (
  state,
  action,
  { isAfter, isBefore, isRangeValid, isSameDay }
) => {
  let newState;
  if (action.type === calendarActions.setStartDate) {
    newState = {
      focusableDate: action.date,
      focusedDate: undefined,
      startDate: action.date
    };
  } else if (action.type === calendarActions.setEndDate) {
    newState = {
      endDate: action.date,
      focusableDate: action.date,
      focusedDate: undefined
    };
  } else if (
    (state.isMouseCursorValid && action.type === calendarActions.selectDate) ||
    (state.isKeyboardCursorValid &&
      action.type === calendarActions.keyPress &&
      action.key.key === "Enter")
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
    // Reset selection when both dates already defined
    if (!cursor || !state.startDate || (state.startDate && state.endDate)) {
      newState = {
        ...newCursorState,
        endDate: undefined,
        startDate: cursor
      };
      // Move start date if before current start date
    } else if (isBefore(cursor, state.startDate)) {
      newState = {
        ...newCursorState,
        startDate: cursor
      };
      // If cursor comes on or after start date, then update end date
    } else if (
      isSameDay(cursor, state.startDate) ||
      isAfter(cursor, state.startDate)
    ) {
      newState = {
        ...newCursorState,
        endDate: cursor
      };
    }
  } else if (
    action.type === calendarActions.setEnableKeyboardNavigation &&
    !action.enable
  ) {
    newState = {
      focusedDate: undefined
    };
  }

  const result = {
    ...state,
    ...newState
  };
  const { lastMouseCursor, lastKeyboardCursor } = result;
  if (
    lastMouseCursor !== result.mouseCursor &&
    result.startDate &&
    !result.endDate
  ) {
    if (
      !result.mouseCursor ||
      isAfter(result.startDate, result.mouseCursor) ||
      isSameDay(result.startDate, result.mouseCursor)
    ) {
      result.isMouseCursorValid = true;
    } else if (isAfter(result.mouseCursor, result.startDate)) {
      result.isMouseCursorValid = isRangeValid(
        result.startDate,
        result.mouseCursor
      );
    }
  }
  if (
    lastKeyboardCursor !== result.keyboardCursor &&
    result.startDate &&
    !result.endDate
  ) {
    if (
      !result.keyboardCursor ||
      isAfter(result.startDate, result.keyboardCursor) ||
      isSameDay(result.startDate, result.keyboardCursor)
    ) {
      result.isKeyboardCursorValid = true;
    } else if (isAfter(result.keyboardCursor, result.startDate)) {
      result.isKeyboardCursorValid = isRangeValid(
        result.startDate,
        result.keyboardCursor
      );
    }
  }
  result.lastKeyboardCursor = result.keyboardCursor;
  result.lastMouseCursor = result.mouseCursor;
  return result;
};

export default dateRangeReducer;
