import styled from "styled-components";

export function withStyledWeek(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides("Week");
    return {
      display: "flex",
      flex: 1,
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
