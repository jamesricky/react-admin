import { StyleRules } from "@material-ui/styles/withStyles";
import { CometAdminInputBaseClassKeys } from "@comet/admin";

export const getCometAdminInputBaseOverrides = (darkMode: boolean): StyleRules<{}, CometAdminInputBaseClassKeys> => ({
    root: {
        backgroundColor: darkMode ? "#1d2025" : "white",
        borderColor: darkMode ? "black" : "#e0e0e0",
    },
    focused: {},
    adornedStart: {},
    adornedEnd: {},
    input: {},
});
