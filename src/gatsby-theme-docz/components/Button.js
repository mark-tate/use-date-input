import React, { forwardRef } from "react";
import { default as MUIButton } from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textTransform: "unset"
  }
}));

export const Button = forwardRef(function Button(props, ref) {
  const classes = useStyles();
  return (
    <MUIButton
      classes={classes}
      color={"primary"}
      size={"small"}
      ref={ref}
      variant={"contained"}
      {...props}
    />
  );
});
