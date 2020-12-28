import {
    CometAdminNavigationClassKeys,
    CometAdminNavigationCollapsibleItemClassKeys,
    CometAdminNavigationItemClassKeys,
    NavigationCollapsibleItemThemeProps,
    NavigationThemeProps,
} from "./mui";

declare module "@material-ui/core/styles/overrides" {
    interface ComponentNameToClassKey {
        CometAdminNavigation: CometAdminNavigationClassKeys;
        CometAdminNavigationItem: CometAdminNavigationItemClassKeys;
        CometAdminNavigationCollapsibleItem: CometAdminNavigationCollapsibleItemClassKeys;
    }
}

declare module "@material-ui/core/styles/props" {
    interface ComponentsPropsList {
        CometAdminNavigation: NavigationThemeProps;
        CometAdminNavigationCollapsibleItem: NavigationCollapsibleItemThemeProps;
    }
}
