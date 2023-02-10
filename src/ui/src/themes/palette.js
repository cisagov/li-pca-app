// assets
import colors from "assets/scss/_themes-vars.module.scss";

/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  let mode = theme?.customization?.mode;
  return {
    mode: mode,
    common: {
      black: colors.darkPaper,
    },
    primary: {
      light: mode == "dark" ? colors.darkPrimaryLight : colors.primaryLight,
      main: mode == "dark" ? colors.darkPrimaryMain : colors.primaryMain,
      dark: mode == "dark" ? colors.darkPrimaryDark : colors.primaryDark,
      200: mode == "dark" ? colors.darkPrimary200 : colors.primary200,
      800: mode == "dark" ? colors.darkPrimary800 : colors.primary800,
    },
    secondary: {
      light: mode == "dark" ? colors.darkSecondaryLight : colors.secondaryLight,
      main: mode == "dark" ? colors.darkSecondaryMain : colors.secondaryMain,
      dark: mode == "dark" ? colors.darkSecondaryDark : colors.secondaryDark,
      200: mode == "dark" ? colors.darkSecondary200 : colors.secondary200,
      800: mode == "dark" ? colors.darkSecondary800 : colors.secondary800,
    },
    error: {
      light: colors.errorLight,
      main: colors.errorMain,
      dark: colors.errorDark,
    },
    orange: {
      light: colors.orangeLight,
      main: colors.orangeMain,
      dark: colors.orangeDark,
    },
    warning: {
      light: colors.warningLight,
      main: colors.warningMain,
      dark: colors.warningDark,
    },
    success: {
      light: colors.successLight,
      200: colors.success200,
      main: colors.successMain,
      dark: colors.successDark,
    },
    grey: {
      50: colors.grey50,
      100: colors.grey100,
      500: colors.darkTextSecondary,
      600: colors.heading,
      700: colors.darkTextPrimary,
      900: colors.textDark,
    },
    dark: {
      light: mode == "dark" ? colors.grey700 : colors.darkTextPrimary,
      main: mode == "dark" ? colors.grey400 : colors.darkLevel1,
      dark: mode == "dark" ? colors.grey300 : colors.darkLevel2,
      800: mode == "dark" ? colors.grey100 : colors.darkBackground,
      900: mode == "dark" ? colors.grey50 : colors.darkPaper,
    },
    text: {
      primary: mode == "dark" ? colors.darkTextPrimary : colors.grey700,
      secondary: mode == "dark" ? colors.grey100 : colors.grey400,
      dark: mode == "dark" ? colors.grey100 : colors.textDark,
      hint: mode == "dark" ? colors.grey100 : colors.grey300,
    },
    background: {
      paper: mode == "dark" ? colors.darkPaper : colors.paper,
      default: mode == "dark" ? colors.darkPaper : colors.paper,
      // default: colors.backgroundDefault,
    },
  };
}
