import React from "react";
import MUICarousel from "react-material-ui-carousel";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    overflow: "inherit",
    paddingBottom: "30px",
    width: "100%"
  },
  buttonWrapper: {
    top: "calc(50% - 165px)"
  }
}));

export function Carousel(props) {
  const theme = useTheme();
  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <MUICarousel
      fullHeightHover={false}
      navButtonsAlwaysVisible={!isSmallBreakpoint}
      fullHeightHover={false}
      animation={"fade"}
      autoPlay={false}
      classes={classes}
      interval={6000}
      timeout={1000}
      {...props}
    />
  );
}
