import styled from "styled-components";

export const StyledRow = styled.div(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides("MonthRow");
  return getComponentOverrides(props);
});

export const StyledCell = styled.div(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides("MonthCell");
  return {
    display: "inline-block",
    verticalAlign: "top",
    marginBottom: "10px",
    paddingRight: "10px",
    boxSizing: "border-box",
    "&:last-child": {
      paddingRight: "0px"
    },
    ...getComponentOverrides(props)
  };
});

export function withStyledMonthGroup(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides(
      "MonthGroup"
    );
    return {
      paddingTop: "10px",
      paddingLeft: "5px",
      paddingRight: "5px",
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
