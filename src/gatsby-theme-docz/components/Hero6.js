import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "./Button";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    margin: "auto",
    minHeight: "70vh",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "75%",

    "& h1": {
      color: "#1FB6FF",
      marginBottom: "4px",
      marginTop: "4px"
    },
    "& h2": {
      color: "white",
      display: "inline",
      fontSize: "1em",
      lineHeight: "2em",
      marginBottom: "4px",
      marginRight: "6px",
      marginTop: "4px"
    },
    "& h2 ~ span": {
      color: "lightgrey",
      fontSize: "0.8em"
    },
    "& a": {
      marginTop: "20px"
    }
  }
}));

export function Hero6() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Features</h1>
      <div>
        <h2>Lightweight</h2>
        <span>- Optimized bundle size</span>
      </div>
      <div>
        <h2>Control</h2>
        <span>
          - built with React hooks and the reducer pattern, the API gives you
          full control of the component's state
        </span>
      </div>
      <div>
        <h2>Themeable</h2>
        <span>
          - built as a naked UI component, use the simple theming API to style
        </span>
      </div>
      <div>
        <h2>Date Frameworks</h2>
        <span>- can be used with the date framework of your choice</span>
      </div>
      <div>
        <h2>Composable</h2>
        <span>- can be used with any UI Framework</span>
      </div>
      <div>
        <h2>Accessible</h2>
        <span>
          - designed and tested for A11y, with full keyboard and screen-reader
          support
        </span>
      </div>
      <div>
        <h2>Localisation</h2>
        <span>- customize region and labels</span>
      </div>
      <div>
        <Button
          href="https://mark-tate.github.io/use-date-input/getting-started"
          size={"large"}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
