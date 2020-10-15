import * as mixins from "~utils/mixins";

export const editor = theme => ({
  p: 2,
  background: theme.plain.backgroundColor,
  fontFamily: "monospace",
  fontSize: 16,
  "* > textarea:focus": {
    outline: "none"
  }
});

export const error = {
  m: 0,
  py: 2,
  px: 3,
  bg: "#FF4757",
  fontSize: 1,
  color: "white",
  whiteSpace: "pre-wrap"
};

export const previewWrapper = {
  display: "table",
  position: "relative"
};

export const wrapper = () => ({
  height: "auto",
  display: "block",
  minHeight: "100%",
  width: "calc(100% - 2px)",
  bg: "playground.bg",
  marginTop: "20px",
  marginBottom: "20px"
});

export const wrapperBorder = (content, showingCode) => {
  let borderRadius = 4;
  if (showingCode) {
    borderRadius = content === "preview" ? "4px 4px 0 0" : "0 0 4px 4px";
  }

  return {
    border: t => `1px solid ${t.colors.playground.border}`,
  };
};

export const preview = {
  background: "white",
  color: "initial",
  display: "table",
  fontSize: "12px",
  lineHeight: "1.4em",
  margin: 0,
  padding: "20px"
};

export const buttons = {
  display: "flex",
  position: "absolute",
  bottom: -20
};

export const button = {
  ...mixins.ghostButton,
  display: "flex",
  alignItems: "center",
  py: 1,
  p: 2,
  bg: "border",
  color: "muted",
  borderRadius: "0 0 3px 3px",
  "& ~ &": {
    ml: 1
  }
};

export const link = {
  py: 0,
  ml: 1,
  height: 22
};
