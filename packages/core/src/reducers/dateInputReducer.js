import singleDateReducer from "./singleDateReducer";
import { calendarActions } from "./calendarReducer";

export const dateInputActions = {
  blurInput: "BLUR_INPUT",
  focusInput: "FOCUS_INPUT",
  focusLock: "FOCUS_LOCK"
};

const dateInputReducer = (state, action, dateAPI) => {
  let changes = {};
  if (action.type === calendarActions.setOpen) {
    changes = {
      focusLock: false,
      open: action.open
    };
    if (action.open) {
      const startDate = state.startDate || state.visibleFromDate;
      let updatedVisibleFromDate = dateAPI.startOfMonth(startDate);
      updatedVisibleFromDate = dateAPI.isSameDay(
        updatedVisibleFromDate,
        state.visibleFromDate
      )
        ? state.visibleFromDate
        : updatedVisibleFromDate;
      changes = {
        ...changes,
        focusableDate: startDate,
        keyboardCursor: startDate,
        visibleFromDate: updatedVisibleFromDate
      };
    }
  } else if (action.type === dateInputActions.focusLock) {
    changes = {
      focusLock: action.enable
    };
  } else if (action.type === dateInputActions.focusInput) {
    changes = {
      open: true
    };
  } else if (action.type === dateInputActions.blurInput) {
    changes = {
      open: false
    };
  } else if (
    action.type === calendarActions.selectDate ||
    (action.type === calendarActions.keyPress && action.key.key === "Enter")
  ) {
    changes = {
      open: false,
      enableKeyboardNavigation: false,
      focusedDate: undefined,
      focusLock: false
    };
  } else if (action.type === calendarActions.mouseClickOutside) {
    changes = {
      focusLock: false
    };
  }
  return { ...state, ...singleDateReducer(state, action, dateAPI), ...changes };
};

export default dateInputReducer;
