import styled from "styled-components";

const DEFAULT_FG = "#595959";
const ENDPOINT_SELECTION_BG = "#A2D0FD";
const ENDPOINT_SELECTION_FG = "white";
const MIDPOINT_SELECTION_BG = "#D0E7FE";
const MIDPOINT_SELECTION_FG = "#595959";
const INVALID_ENDPOINT_SELECTION_BG = "#e31c3d";
const INVALID_MIDPOINT_SELECTION_FG = "white";
const INVALID_MIDPOINT_SELECTION_BG = "#e31c3d";
const INVALID_ENDPOINT_SELECTION_FG = "white";
const KEYBOARD_CURSOR_BORDER = "#0068C8";
const MOUSE_CURSOR_FG = "white";
const MOUSE_CURSOR_BG = "#0052A1";

const defaultStyle = { background: undefined, color: DEFAULT_FG };
const getStartSelectionStyle = isValid => ({
  background: isValid ? ENDPOINT_SELECTION_BG : INVALID_ENDPOINT_SELECTION_BG,
  color: isValid ? ENDPOINT_SELECTION_FG : INVALID_ENDPOINT_SELECTION_FG,
  borderRadius: "10px 0px 0px 10px"
});
const getEndSelectionStyle = isValid => ({
  background: isValid ? ENDPOINT_SELECTION_BG : INVALID_ENDPOINT_SELECTION_BG,
  color: isValid ? ENDPOINT_SELECTION_FG : INVALID_ENDPOINT_SELECTION_FG,
  borderRadius: "0px 10px 10px 0px"
});
const selectionStyle = {
  background: ENDPOINT_SELECTION_BG,
  color: ENDPOINT_SELECTION_FG,
  borderRadius: "0px"
};
const getMidSelectionStyle = isValid => ({
  background: isValid ? MIDPOINT_SELECTION_BG : INVALID_MIDPOINT_SELECTION_BG,
  color: isValid ? MIDPOINT_SELECTION_FG : INVALID_MIDPOINT_SELECTION_FG,
  borderRadius: "0px"
});
const todayStyle = {
  "font-weight": "bold"
};

const getMouseCursorStyle = isValid => ({
  background: MOUSE_CURSOR_BG,
  color: MOUSE_CURSOR_FG,
  cursor: isValid ? "default" : "not-allowed",
  borderRadius: "0px"
});

const endpointMouseCursorStyle = {
  border: "none",
  boxShadow: `0 0 1px 1px ${KEYBOARD_CURSOR_BORDER}`,
  zIndex: 1
};

const keyboardCursorStyle = {
  border: "none",
  ":focus": {
    boxShadow: `0 0 1px 1px ${KEYBOARD_CURSOR_BORDER}`,
    zIndex: 1
  }
};

const disabledStyle = {
  cursor: "not-allowed",
  opacity: 0.3,
  pointerEvents: "none"
};

const outsideOfMonthStyle = {
  cursor: "not-allowed",
  opacity: 0.3,
  pointerEvents: "none"
};

const getDayStyle = ({
  activeCursor,
  allowRange,
  disabled,
  isEndDate,
  isKeyboardCursor,
  isKeyboardCursorValid,
  isMidRange,
  isOutsideOfMonth,
  isMouseCursor,
  isMouseCursorValid,
  isStartDate,
  isToday
}) => {
  let dayStyle = defaultStyle;
  const isCursorValid =
    !activeCursor ||
    (activeCursor === "mouse" && isMouseCursorValid) ||
    (activeCursor === "keyboard" && isKeyboardCursorValid);

  if (isOutsideOfMonth) {
    dayStyle = { ...dayStyle, ...outsideOfMonthStyle };
  } else if (disabled) {
    dayStyle = { ...dayStyle, ...disabledStyle };
  } else if (
    !isOutsideOfMonth &&
    isMouseCursor &&
    !(isStartDate || isEndDate)
  ) {
    dayStyle = { ...dayStyle, ...getMouseCursorStyle(isCursorValid) };
  } else if ((isStartDate && !allowRange) || (isStartDate && isEndDate)) {
    dayStyle = { ...dayStyle, ...selectionStyle };
  } else if (isStartDate) {
    dayStyle = { ...dayStyle, ...getStartSelectionStyle(isCursorValid) };
  } else if (isEndDate) {
    dayStyle = { ...dayStyle, ...getEndSelectionStyle(isCursorValid) };
  } else if (isMidRange) {
    dayStyle = { ...dayStyle, ...getMidSelectionStyle(isCursorValid) };
  }
  if (isKeyboardCursor) {
    dayStyle = { ...dayStyle, ...keyboardCursorStyle };
  } else if (isMouseCursor && (isStartDate || isEndDate)) {
    dayStyle = { ...dayStyle, ...endpointMouseCursorStyle };
  }
  if (isToday) {
    return { ...dayStyle, ...todayStyle };
  }
  return dayStyle;
};

export function withStyledDay(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides("Day");
    return {
      outline: "none",
      boxSizing: "border-box",
      display: "inline-block",
      width: "20px",
      height: "20px",
      padding: "2px",
      textAlign: "center",
      ...getDayStyle(props),
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
