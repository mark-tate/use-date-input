import styled from "styled-components";

export function withStyledDayOfWeek(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides("DayOfWeek");
    return {
      display: "inline-block",
      boxSizing: "border-box",
      width: "20px",
      textAlign: "center",
      padding: "2px",
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
