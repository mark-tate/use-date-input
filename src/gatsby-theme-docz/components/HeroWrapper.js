import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Button } from "./Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyItems: "center",
    alignItems: "center",
    width: "75%",
    height: "auto",
    minHeight: "70vh",
    margin: "auto"
  },
  example: {
    flexGrow: 0,
    flexShrink: 0,
    display: "table",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  hideBackground: {
    background: "none"
  },
  showBackground: {
    background: "white"
  },
  exampleText: {
    alignSelf: "center",
    flexGrow: 1,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    textAlign: "left"
  },
  title: {
    lineHeight: 1,
    marginTop: 0,
    color: "#1FB6FF",
    margin: 0
  },
  description: {
    color: "white"
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(2)
    },
    example: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    exampleText: {
      alignSelf: "flex-start",
      flexGrow: 0,
      padding: 0
    }
  },
  [theme.breakpoints.down("xs")]: {
    example: {
      marginTop: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    exampleText: {
      paddingLeft: "16px",
      paddingRight: "16px"
    },
    root: {
      alignItems: "center",
      padding: 0,
      width: "100%"
    }
  }
}));

export function HeroWrapper({
  children,
  description,
  href,
  linkText,
  title,
  showBackground
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className={clsx([
          classes.example,
          {
            [classes.showBackground]: showBackground,
            [classes.hideBackground]: !showBackground
          }
        ])}
      >
        {children}
      </div>
      <div className={classes.exampleText}>
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.description}>{description}</h2>
        <Button href={href} size={"large"}>
          {linkText}
        </Button>
      </div>
    </div>
  );
}
