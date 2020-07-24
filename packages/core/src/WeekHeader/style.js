import styled from "styled-components";

export function withStyledWeekHeader(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides(
      "WeekHeader"
    );
    return {
      width: "100%",
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
