import { createTheme, responsiveFontSizes, Theme } from "@mui/material";

import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "../utils/constants";
import { red } from "@mui/material/colors";
import colors from "./colors";

export const getAppTheme = (
  mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
): Theme => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#234585",
        light: "#fff",
        dark: "#1D2A5C",
        contrastText: "#fff",
      },
      secondary: {
        main: "#AF7F1F",
      },
      error: {
        main: red.A400,
      },
      background: {
        //default: colors.lightGrayistBlue5,
        default: "#f2f2f2",
        paper: colors.white,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            color: "#1D2A5C",
            backgroundColor: "#fff",
            // contrastText: colors.green1,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#1D2A5C",
            color: "#fff",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 58,
            //size: "small",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label": {
              color: colors.gdBlue1,
              //fontSize: "10px",
              //fontWeight: "normal",
              //fontStretch: "normal",
              //fontStyle: "normal",
              //lineHeight: 1.6,
              //letterSpacing: "1px",
            },
            "& label.Mui-focused": {
              color: colors.gdBlue1,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#3E68A8",
            },
            "& .MuiButtonBase-root": {
              color: colors.gdBlue1,
            },
            "& .MuiSvgIcon-root": {
              color: colors.gdBlue1,
            },
            "& .MuiOutlinedInput-root": {
              color: colors.gdBlue1,
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.85,
              letterSpacing: "0.1px",
              "& fieldset": {
                borderColor: colors.generalLightBlue1,
              },
              "&:hover fieldset": {
                borderColor: colors.generalLightBlue1,
                borderWidth: "0.15rem",
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.generalLightBlue1, // "#3E68A8",
              },
            },
          },
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
