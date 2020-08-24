import styled from "styled-components";

export function withStyledWeekHeader(component) {
  const StyledComponent = styled(component)(props => {
    const componentOverrides =
      props.theme && props.theme.getCalendarOverrides
        ? props.theme.getCalendarOverrides("WeekHeader")(props)
        : {};
    return {
      width: "100%",
      ...componentOverrides
    };
  });
  return StyledComponent;
}
