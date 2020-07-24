import styled from "styled-components";

export function withStyledRoot(component) {
  const StyledComponent = styled(component)(props => {
    const getComponentOverrides = props.theme.getCalendarOverrides("Root");
    return {
      color: "black",
      fontSize: "12px",
      paddingTop: "10px",
      display: "inline-block",
      ...getComponentOverrides(props)
    };
  });
  return StyledComponent;
}
