import styled from "styled-components";

export const StyledRow = styled.div(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("MonthRow")(props)
      : {};
  return componentOverrides;
});

export const StyledCell = styled.div(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("MonthCell")(props)
      : {};
  return {
    display: "inline-block",
    verticalAlign: "top",
    marginBottom: "10px",
    paddingRight: "10px",
    boxSizing: "border-box",
    "&:last-child": {
      paddingRight: "0px"
    },
    ...componentOverrides
  };
});

export function withStyledMonthGroup(component) {
  const StyledComponent = styled(component)(props => {
    const componentOverrides =
      props.theme && props.theme.getCalendarOverrides
        ? props.theme.getCalendarOverrides("MonthGroup")(props)
        : {};
    return {
      paddingTop: "10px",
      paddingLeft: "5px",
      paddingRight: "5px",
      ...componentOverrides
    };
  });
  return StyledComponent;
}
