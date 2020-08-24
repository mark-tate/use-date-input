import styled from "styled-components";

export const StyledMonthTitle = styled.span(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("MonthTitle")(props)
      : {};
  return {
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    ...componentOverrides
  };
});
export const StyledWeekRow = styled.div(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("WeekRow")(props)
      : {};
  return componentOverrides;
});

export function withStyledMonth(component) {
  const StyledComponent = styled(component)(props => {
    const componentOverrides =
      props.theme && props.theme.getCalendarOverrides
        ? props.theme.getCalendarOverrides("Month")(props)
        : {};
    return componentOverrides;
  });
  return StyledComponent;
}
