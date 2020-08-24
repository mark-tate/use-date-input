import styled from "styled-components";

export function withStyledWeek(component) {
  const StyledComponent = styled(component)(props => {
    const componentOverrides =
      props.theme && props.theme.getCalendarOverrides
        ? props.theme.getCalendarOverrides("Week")(props)
        : {};
    return {
      display: "flex",
      flex: 1,
      ...componentOverrides
    };
  });
  return StyledComponent;
}
