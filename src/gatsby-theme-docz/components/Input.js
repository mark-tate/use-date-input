import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  [theme.breakpoints.down("sm")]: {
    root: {
      margin: 0
    }
  }
}));

export const Input = forwardRef(function Button(props, ref) {
  const classes = useStyles();
  return <input className={classes.root} ref={ref} {...props} />;
});
