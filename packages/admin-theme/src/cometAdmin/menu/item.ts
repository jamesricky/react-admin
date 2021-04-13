import "@comet/admin/src/themeAugmentation";

import { CometAdminMenuItemClassKeys } from "@comet/admin";
import { StyleRules } from "@material-ui/styles/withStyles";

import { cometBlue } from "../colors";

export const getCometAdminMenuItemOverrides = (darkMode: boolean): StyleRules<{}, CometAdminMenuItemClassKeys> => ({
    root: {
        borderBottom: `1px solid ${darkMode ? "#010101" : "#f0f0f0"}`,
        color: darkMode ? "#fff" : "#000",

        "&:after": {
            content: "''",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 2,
        },

        "& .MuiListItemIcon-root": {
            color: darkMode ? "#fff" : "#000",
            minWidth: 34,
        },

        "& .MuiListItemText-inset": {
            paddingLeft: 34,
        },
    },
    level1: {
        paddingTop: 16,
        paddingBottom: 16,

        "&.Mui-selected": {
            backgroundColor: darkMode ? "#333" : "#f0f0f0",
            color: cometBlue.main,

            "&:after": {
                backgroundColor: cometBlue.main,
            },

            "& .MuiListItemIcon-root": {
                color: cometBlue.main,
            },
        },

        "& .MuiListItemText-primary": {
            fontWeight: 500,
        },
    },
    level2: {
        "&.Mui-selected": {
            backgroundColor: cometBlue.main,
            color: "#fff",

            "&:after": {
                backgroundColor: cometBlue.mainDim,
            },

            "&:hover": {
                backgroundColor: cometBlue.mainDim,
            },

            "& .MuiListItemText-primary": {
                fontWeight: 400,
            },
        },

        "& .MuiListItemText-primary": {
            fontWeight: 300,
            fontSize: 14,
        },
    },
    hasIcon: {},
    hasSecondaryText: {},
    hasSecondaryAction: {},
});
