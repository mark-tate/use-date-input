import styled from "styled-components";

export function withStyledDayOfWeek(component) {
  const StyledComponent = styled(component)(props => {
    const componentOverrides =
      props.theme && props.theme.getCalendarOverrides
        ? props.theme.getCalendarOverrides("DayOfWeek")(props)
        : {};
    return {
      display: "inline-block",
      boxSizing: "border-box",
      width: "20px",
      textAlign: "center",
      padding: "2px",
      ...componentOverrides
    };
  });
  return StyledComponent;
}
