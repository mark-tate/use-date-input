import styled from "styled-components";

export const StyledYearTitle = styled.span(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides("YearTitle");
  return {
    alignSelf: "center",
    ...getComponentOverrides(props)
  };
});

export const StyledPreviousButton = styled.button(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides(
    "PreviousButton"
  );
  return {
    marginLeft: "5px",
    "::before": {
      content: "'<'"
    },
    ...getComponentOverrides(props)
  };
});

export const StyledNextButton = styled.button(props => {
  const getComponentOverrides = props.theme.getCalendarOverrides("NextButton");
  return {
    marginRight: "5px",
    "::before": {
      content: "'>'"
    },
    ...getComponentOverrides(props)
  };
});

export function withStyledHeader(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides("Header");
    return {
      display: "flex",
      justifyContent: "space-between",
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
