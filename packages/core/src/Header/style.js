import styled from "styled-components";

export const StyledYearTitle = styled.span(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("YearTitle")(props)
      : {};
  return {
    alignSelf: "center",
    ...componentOverrides
  };
});

export const StyledPreviousButton = styled.button(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("PreviousButton")(props)
      : {};
  return {
    marginLeft: "5px",
    "::before": {
      content: "'<'"
    },
    ...componentOverrides
  };
});

export const StyledNextButton = styled.button(props => {
  const componentOverrides =
    props.theme && props.theme.getCalendarOverrides
      ? props.theme.getCalendarOverrides("NextButton")(props)
      : {};
  return {
    marginRight: "5px",
    "::before": {
      content: "'>'"
    },
    ...componentOverrides
  };
});

export function withStyledHeader(component) {
  const StyledComponent = styled(component)(props => {
    const componentOverrides =
      props.theme && props.theme.getCalendarOverrides
        ? props.theme.getCalendarOverrides("Header")(props)
        : {};
    return {
      display: "flex",
      justifyContent: "space-between",
      ...componentOverrides
    };
  });
  return StyledComponent;
}
