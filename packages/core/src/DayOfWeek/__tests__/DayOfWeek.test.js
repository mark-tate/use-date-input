import React from "react";
import { render } from "test-utils";

import DayOfWeek from "../DayOfWeek";

describe("given DayOfWeek", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(<DayOfWeek ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders a day of the week", () => {
    const { getByText, getByLabelText } = render(
      <DayOfWeek description={"test day"}>TestDay</DayOfWeek>
    );
    expect(getByText("TestDay")).toBeInTheDocument();
    expect(getByLabelText("test day")).toBeInTheDocument();
  });
});
