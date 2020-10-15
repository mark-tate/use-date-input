import React from "react";
import { theme, useConfig, ComponentsProvider } from "docz";
import { Styled, ThemeProvider } from "theme-ui";
import defaultTheme from "gatsby-theme-docz/src/theme/index";
import components from "gatsby-theme-docz/src/components/index";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
    font-family: "Roboto, Helvetica, Arial, sans-serif";
  }
`;

const Theme = ({ children }) => {
  const config = useConfig();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={config.themeConfig}>
        <ComponentsProvider components={components}>
          <Styled.root>{children}</Styled.root>
        </ComponentsProvider>
      </ThemeProvider>
    </>
  );
};

const themeConfig = {
  ...defaultTheme,
  initialColorMode: "dark",
  showDarkModeSwitch: false,
  showMarkdownEditButton: false,
  colors: {
    ...defaultTheme.colors,
    modes: {
      ...defaultTheme.colors.modes,
      dark: {
        ...defaultTheme.colors.modes.dark,
        playground: {
          ...defaultTheme.colors.modes.dark.sidebar,
          bg: "transparent"
        },
        sidebar: {
          ...defaultTheme.colors.modes.dark.sidebar,
          navGroup: "lightslategrey",
          tocLink: "lightgrey"
        }
      }
    }
  },
  styles: {
    ...defaultTheme.styles,
    h1: {
      color: "#1FB6FF",
      marginTop: 0
    },
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
