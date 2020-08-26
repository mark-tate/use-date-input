import React, { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import ClickOutside from "../ClickOutside";

describe("given ClickOutside", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(<ClickOutside ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onClickOutside on ignoreList or child click event", () => {
    const handleClickOutsideMock = jest.fn();
    const insideIgnoreListRef = createRef();
    const allowIgnoreListRef = createRef();
    const { getByText } = render(
      <>
        <button>deny clicks</button>
        <button ref={allowIgnoreListRef}>allow clicks</button>
        <ClickOutside
          onClickOutside={handleClickOutsideMock}
          ignoreClickOutsideRefs={[allowIgnoreListRef]}
        >
          <button ref={insideIgnoreListRef}>inside clickOutside</button>
        </ClickOutside>
      </>
    );
    fireEvent.mouseDown(getByText("deny clicks"));
    expect(handleClickOutsideMock).toHaveBeenCalled();
    handleClickOutsideMock.mockReset();
    fireEvent.mouseDown(getByText("allow clicks"));
    expect(handleClickOutsideMock).not.toHaveBeenCalled();
    handleClickOutsideMock.mockReset();
    fireEvent.mouseDown(getByText("inside clickOutside"));
    expect(handleClickOutsideMock).not.toHaveBeenCalled();
  });
});
