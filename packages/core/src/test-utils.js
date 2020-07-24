import React from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import PropTypes from "prop-types";

const mockTheme = {
  calendarOverrides: {},
  getCalendarOverrides: jest.fn(() => () => ({}))
};

function TestUtils({ children }) {
  return <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>;
}
TestUtils.propTypes = {
  children: PropTypes.node
};
export default TestUtils;

const customRender = (ui, options) =>
  render(ui, { wrapper: TestUtils, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
