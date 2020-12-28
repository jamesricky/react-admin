import { ListItem, ListItemIcon, ListItemProps, ListItemText } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import * as React from "react";

import { MenuContext } from "../menu";
import { NavigationLevel } from "./CollapsibleItem";

export type CometAdminNavigationItemClassKeys = "root" | "level1" | "level2" | "hasIcon" | "hasSecondaryText" | "hasSecondaryAction";

const styles = () =>
    createStyles<CometAdminNavigationItemClassKeys, any>({
        root: {},
        level1: {},
        level2: {},
        hasIcon: {},
        hasSecondaryText: {},
        hasSecondaryAction: {},
    });

export interface NavigationItemProps extends NavigationLevel {
    primary: React.ReactNode;
    secondary?: React.ReactNode;
    icon?: React.ReactElement;
    secondaryAction?: React.ReactNode;
}

type MuiListItemProps = Pick<ListItemProps, Exclude<keyof ListItemProps, "innerRef" | "button">> & { component?: React.ElementType };

const Item: React.FC<WithStyles<typeof styles, false> & NavigationItemProps & MuiListItemProps> = ({
    classes,
    theme,
    primary,
    secondary,
    icon,
    level = 1,
    secondaryAction,
    ...otherProps
}) => {
    const context = React.useContext(MenuContext);
    if (!context) throw new Error("Could not find context for menu");
    if (level > 2) throw new Error("Maximum nesting level of 2 exceeded.");

    const hasIcon = !!icon;

    const listItemClasses = [classes.root, classes[`level${level}`]];
    if (hasIcon) listItemClasses.push(classes.hasIcon);
    if (secondary) listItemClasses.push(classes.hasSecondaryText);
    if (secondaryAction) listItemClasses.push(classes.hasSecondaryAction);

    return (
        <ListItem button {...otherProps} className={listItemClasses.join(" ")}>
            {hasIcon && <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>}
            <ListItemText primary={primary} secondary={secondary} inset={!icon} />
            {!!secondaryAction && secondaryAction}
        </ListItem>
    );
};

export const NavigationItem = withStyles(styles, { name: "CometAdminNavigationItem", withTheme: true })(Item);
