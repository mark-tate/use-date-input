import React, { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import ClickOutside from "../index";

describe("given ClickOutside", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(<ClickOutside ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onClickOutside on whitelist or child click event", () => {
    const handleClickOutsideMock = jest.fn();
    const insideWhitelistRef = createRef();
    const outsideWhitelistRef = createRef();
    const outsideBlacklistRef = createRef();
    const { getByText } = render(
      <>
        <button ref={outsideBlacklistRef}>outside blacklist</button>
        <button ref={outsideWhitelistRef}>outside whitelist</button>
        <ClickOutside
          onClickOutside={handleClickOutsideMock}
          whitelistRefs={[outsideWhitelistRef]}
        >
          <button ref={insideWhitelistRef}>inside whitelist</button>
        </ClickOutside>
      </>
    );
    fireEvent.mouseDown(getByText("outside blacklist"));
    expect(handleClickOutsideMock).toHaveBeenCalled();
    handleClickOutsideMock.mockReset();
    fireEvent.mouseDown(getByText("inside whitelist"));
    expect(handleClickOutsideMock).not.toHaveBeenCalled();
    handleClickOutsideMock.mockReset();
    fireEvent.mouseDown(getByText("outside whitelist"));
    expect(handleClickOutsideMock).not.toHaveBeenCalled();
  });
});
