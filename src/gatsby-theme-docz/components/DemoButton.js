import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";

export const DemoButton = forwardRef(function DemoButton(props, ref) {
  return (
    <Button
      color={"primary"}
      size={"small"}
      ref={ref}
      variant={"contained"}
      {...props}
    />
  );
});
