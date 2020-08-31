import React from "react";
import { withStyles } from "@material-ui/core";

const style = {
    root: {
        display: "flex",
        justifyContent: "space-around"
    },
    button: {
        margin: "8px 8px 8px 0px"
    },
    lastButton: {
        margin: "8px 0px 8px 0px"
    }
};

function UnStyledButtonBar({ children, classes, ...rest }) {
    const spacedChildren = React.Children.map(children, (child, index) => {
        let className = classes.button;
        if (index == React.Children.count(children) - 1) {
            className = classes.lastButton;
        }
        return React.cloneElement(child, { className });
    });
    return <div className={classes.root} children={spacedChildren} {...rest} />;
}

export const ButtonBar = withStyles(style)(UnStyledButtonBar);
