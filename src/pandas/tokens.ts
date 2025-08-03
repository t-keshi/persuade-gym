import { defineTokens } from "@pandacss/dev";

export const tokens = defineTokens({
  colors: {
    primary: {
      light: { value: "#F09E86" },
      main: { value: "#DA7757" },
      dark: { value: "#C85C3A" },
      contrastText: { value: "#FFFFFF" },
    },
    secondary: {
      light: { value: "#61CBC8" },
      main: { value: "#27ACA2" },
      dark: { value: "#1C907C" },
      contrastText: { value: "#FFFFFF" },
    },
    error: {
      light: { value: "#ef5350" },
      main: { value: "#d32f2f" },
      dark: { value: "#c62828" },
      contrastText: { value: "#FFFFFF" },
    },
    text: {
      primary: { value: "rgba(0, 0, 0, 0.87)" },
      secondary: { value: "rgba(0, 0, 0, 0.6)" },
      disabled: { value: "rgba(0, 0, 0, 0.38)" },
      inverted: { value: "white" },
    },
    divider: { value: "rgba(0, 0, 0, 0.12)" },
    background: {
      default: { value: "#faf9f5" },
      paper: { value: "#f1eee7" },
    },
    action: {
      active: { value: "rgba(0, 0, 0, 0.54)" },
      hover: { value: "rgba(0, 0, 0, 0.04)" },
      activeHover: { value: "rgba(0, 0, 0, 0.58)" },
      hoverOpacity: { value: "0.04" },
      selected: { value: "rgba(0, 0, 0, 0.08)" },
      selectedOpacity: { value: "0.08" },
      disabled: { value: "rgba(0, 0, 0, 0.26)" },
      disabledBackground: { value: "rgba(0, 0, 0, 0.12)" },
      disabledOpacity: { value: "0.38" },
      focus: { value: "rgba(0, 0, 0, 0.12)" },
      focusOpacity: { value: "0.12" },
      activatedOpacity: { value: "0.12" },
    },
  },
  fonts: {
    default: { value: "noto-sans, sans-serif" },
  },
  radii: {
    sm: { value: "4px" },
    md: { value: "8px" },
    circle: { value: "50%" },
  },
  fontWeights: {
    light: { value: "400" },
    normal: { value: "500" },
    bold: { value: "700" },
  },
  fontSizes: {
    h1: { value: "3rem" },
    h2: { value: "2.125rem" },
    h3: { value: "1.5rem" },
    h4: { value: "1.25rem" },
    h5: { value: "1.125rem" },
    h6: { value: "1rem" },
    subtitle1: { value: "1rem" },
    subtitle2: { value: "0.875rem" },
    body1: { value: "1rem" },
    body2: { value: "0.875rem" },
    button: { value: "1rem" },
    caption: { value: "0.75rem" },
    overline: { value: "0.75rem" },
  },
  lineHeights: {
    none: { value: "1" },
    h1: { value: "1.333" },
    h2: { value: "1.353" },
    h3: { value: "1.333" },
    h4: { value: "1.4" },
    h5: { value: "1.444" },
    h6: { value: "1.75" },
    subtitle1: { value: "1.75" },
    subtitle2: { value: "1.571" },
    body1: { value: "1.625" },
    body2: { value: "1.571" },
    button: { value: "1.625" },
    caption: { value: "1.667" },
    overline: { value: "2.66" },
  },
  letterSpacings: {
    h1: { value: "-0.02083em" },
    h2: { value: "0em" },
    h3: { value: "0.02083em" },
    h4: { value: "0.0375em" },
    h5: { value: "0.02778em" },
    h6: { value: "0.04063em" },
    subtitle1: { value: "0.00938em" },
    subtitle2: { value: "0.00714em" },
    body1: { value: "0.00938em" },
    body2: { value: "0.01071em" },
    button: { value: "0.02857em" },
    caption: { value: "0.03333em" },
    overline: { value: "0.08333em" },
  },
  spacing: {
    none: { value: "0px" },
    xs: { value: "4px" },
    sm: { value: "8px" },
    md: { value: "16px" },
    lg: { value: "24px" },
  },
  sizes: {
    full: { value: "100%" },
    screenHeight: { value: "100svh" },
    headerHeight: { value: "56px" },
    contentHeight: { value: "calc(100svh - 56px)" },
  },
  shadows: {
    "0": { value: "none" },
    "1": {
      value:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    "2": {
      value:
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
    "3": {
      value:
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    },
    "4": {
      value:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
    "5": {
      value:
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    },
  },
  zIndex: {
    info: { value: 10 },
    header: { value: 1100 },
    modal: { value: 1300 },
    tooltip: { value: 1500 },
  },
});
