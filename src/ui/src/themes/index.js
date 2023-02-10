import { createTheme } from "@mui/material/styles";

// assets
import colors from "assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  let mode = customization?.mode;
  const themeOption = {
    // colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: mode == "light" ? color.primaryLight : color.darkBackground,
    darkTextPrimary: mode == "dark" ? color.grey100 : color.grey700,
    darkTextSecondary: mode == "dark" ? color.grey100 : color.grey500,
    textDark: mode == "dark" ? color.grey100 : color.grey900,
    menuSelected: mode == "dark" ? color.darkTextTitle : color.textDark,
    menuSelectedBack:
      mode == "dark" ? color.darkPrimary800 : color.primaryLight,
    divider: color.grey200,
    customization,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        // Change background color of menu bar here
        // background: mode == "dark" ? color.darkBackground : color.primaryDark,
        // background: color.primary800,
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
