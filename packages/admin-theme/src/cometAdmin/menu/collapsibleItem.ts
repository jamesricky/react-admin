import "@comet/admin/src/themeAugmentation";

import { CometAdminMenuCollapsibleItemClassKeys } from "@comet/admin";
import { StyleRules } from "@material-ui/styles/withStyles";

import { cometBlue } from "../colors";

export const getCometAdminMenuCollapsibleItemOverrides = (darkMode: boolean): StyleRules<{}, CometAdminMenuCollapsibleItemClassKeys> => ({
    root: {
        "& .MuiList-padding": {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
    childSelected: {
        color: cometBlue.main,

        "& $listItem": {
            "& .MuiListItemText-root": {
                color: cometBlue.main,
            },
            "& .MuiListItemIcon-root": {
                color: cometBlue.main,
            },
        },
    },
    listItem: {},
    open: {},
});
