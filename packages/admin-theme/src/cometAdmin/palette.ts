import { ThemeOptions } from "@material-ui/core/styles";

export const getCometAdminPalette = (darkMode: boolean): ThemeOptions["palette"] => ({
    type: darkMode ? "dark" : "light",
    text: {
        primary: darkMode ? '#d8d8d8' : '#242424',
    }
});
