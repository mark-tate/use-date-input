import React from "react";
import { theme, useConfig, ComponentsProvider } from "docz";
import { Styled, ThemeProvider } from "theme-ui";
import defaultTheme from "gatsby-theme-docz/src/theme/index";
import components from "gatsby-theme-docz/src/components/index";

const Theme = ({ children }) => {
  const config = useConfig();
  return (
    <ThemeProvider theme={config.themeConfig}>
      <ComponentsProvider components={components}>
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
      ); }}
    </ThemeProvider>
  );
};

const themeConfig = {
  ...defaultTheme,
  initialColorMode: "dark",
  showDarkModeSwitch: false,
  showMarkdownEditButton: false,
  styles: {
    ...defaultTheme.styles,
    p: {
      maxWidth: "800px",
      fontSize: 2,
      [["code"]]: {
        fontStyle: "italic",
        fontWeight: "bolder",
        color: "white"
      }
    },
    li: {
      fontSize: 2,
      marginBottom: 1
    },
    table: {
      bg: "black",
      p: 10,
      width: "100%",
      my: 4,
      borderCollapse: "separate",
      borderSpacing: 0,
      [["th"]]: {
        color: "#1FB6FF"
      },
      [["td"]]: {
        fontSize: 2
      },
      [["th", "td"]]: {
        textAlign: "left",
        py: "0px",
        pr: "0px",
        pl: 0,
        borderColor: "muted",
        borderBottomStyle: "solid"
      }
    }
  }
};

export default theme(themeConfig)(Theme);
