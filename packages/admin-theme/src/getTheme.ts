import { createMuiTheme } from "@comet/admin";
import { Theme } from "@material-ui/core/styles";

import { getCometAdminMenuCollapsibleItemOverrides } from "./cometAdmin/menu/collapsibleItem";
import { getCometAdminMenuItemOverrides } from "./cometAdmin/menu/item";
import { getCometAdminPalette } from "./cometAdmin/palette";
import { getCometAdminInputBaseOverrides } from "./cometAdmin/inputBase";

export const getTheme = (darkMode: boolean = false): Theme => {
    return createMuiTheme({
        spacing: 5,
        palette: getCometAdminPalette(darkMode),
        typography:  {

        },
        overrides: {
            CometAdminMenuItem: getCometAdminMenuItemOverrides(darkMode),
            CometAdminMenuCollapsibleItem: getCometAdminMenuCollapsibleItemOverrides(darkMode),
            CometAdminInputBase: getCometAdminInputBaseOverrides(darkMode),
        },
    });
};
