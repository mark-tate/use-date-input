import React from "react";
import { withStyles } from "@material-ui/core";

const style = theme => ({
  root: {
    alignItems: "center",
    display: "flex",
    height: "150px",
    margin: "auto",
    width: "75%"
  },
  h1: {
    fontSize: "100px",
    height: "100%",
    margin: 0,
    padding: 0
  },
  [theme.breakpoints.down("sm")]: {
    h1: {
      fontSize: "50px"
    }
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      height: "80px",
      width: "100%"
    },
    h1: {
      fontSize: "40px",
      paddingLeft: "16px"
    }
  }
});

function UnstyledHeading({ classes, ...rest }) {
  return (
    <div className={classes.root} {...rest}>
      <h1 className={classes.h1}>use-date-input</h1>
    </div>
  );
}

export const Heading = withStyles(style)(UnstyledHeading);
