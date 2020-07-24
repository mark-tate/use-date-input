import styled from "styled-components";

export const StyledMonthTitle = styled.span(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides("MonthTitle");
  return {
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    ...getComponentOverrides(props)
  };
});
export const StyledWeekRow = styled.div(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides("WeekRow");
  return getComponentOverrides(props);
});

export function withStyledMonth(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides("Month");
    return getComponentOverrides(props);
  });
  return StyledComponent;
}
