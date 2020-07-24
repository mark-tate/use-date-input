import { calendarActions } from "./calendarReducer";

const singleDateReducer = (state, action, dateAPI) => {
  if (action.type === calendarActions.setStartDate) {
    return {
      ...state,
      focusableDate: action.date,
      focusedDate: undefined,
      startDate: action.date
    };
  } else if (
    action.type === calendarActions.selectDate ||
    (action.type === calendarActions.keyPress && action.key.key === "Enter")
  ) {
    const cursor =
      action.type === calendarActions.selectDate
        ? action.date
        : state.keyboardCursor;
    if (!dateAPI.isSameDay(state.startDate, cursor)) {
      return {
        ...state,
        focusedDate: cursor,
        focusableDate: cursor,
        keyboardCursor: cursor,
        mouseCursor: undefined,
        startDate: cursor
      };
    }
  } else if (action.type === calendarActions.setEnableKeyboardNavigation) {
    if (!action.enable) {
      return {
        ...state,
        focusedDate: undefined
      };
    }
  }
  return state;
};

export default singleDateReducer;
