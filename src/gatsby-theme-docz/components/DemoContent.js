import React, { forwardRef } from "react";

export const DemoContent = forwardRef(({ style, ...rest }, ref) => {
  return (
    <div
      style={{
        alignItems: "center",
        background: "#1FB6FF",
        border: "1px solid white",
        boxSizing: "border-box",
        color: "white",
        display: "flex",
        fontSize: "16px",
        flexDirection: "column",
        height: "200px",
        justifyContent: "center",
        marginTop: "10px",
        textAlign: "center",
        width: "200px",
        ...style
      }}
      ref={ref}
      {...rest}
    >
      <div>Build your own datepicker</div>
      <div>with use-date-input</div>
    </div>
  );
});

export const DemoContentSmall = forwardRef(({ style, ...rest }, ref) => {
    return (
        <DemoContent
            style={{ ...style, width: "100px", height: "100px" }}
            ref={ref}
            {...rest}
        />
    );
});
