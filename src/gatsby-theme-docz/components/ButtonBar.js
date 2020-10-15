import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        margin: "8px"
    }
};

function UnStyledButtonBar({ classes, ...rest }) {
    return <div className={classes.root} {...rest} />;
}

export const ButtonBar = withStyles(style)(UnStyledButtonBar);
