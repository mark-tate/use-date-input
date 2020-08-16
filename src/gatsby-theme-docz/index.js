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
        </ComponentsProvider>);
      }}
    </ThemeProvider>
  );
};

const themeConfig = {
  ...defaultTheme, 
  initialColorMode: "dark",
  showDarkModeSwitch: false,
  showMarkdownEditButton: false
};

export default theme(themeConfig)(Theme);
