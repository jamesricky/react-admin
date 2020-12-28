import { Collapse, List } from "@material-ui/core";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import * as React from "react";
import { matchPath, useLocation } from "react-router";

import { NavigationItem, NavigationItemProps } from "./Item";
import { NavigationItemRouterLinkProps } from "./ItemRouterLink";

export type CometAdminNavigationCollapsibleItemClassKeys = "root" | "childSelected" | "listItem" | "open";

const styles = () =>
    createStyles<CometAdminNavigationCollapsibleItemClassKeys, any>({
        root: {},
        childSelected: {},
        listItem: {},
        open: {},
    });

export interface NavigationLevel {
    level?: 1 | 2;
}

type NavigationChild = React.ReactElement<NavigationItemRouterLinkProps>;

interface NavigationCollapsibleItemProps extends NavigationItemProps {
    children: NavigationChild[];
}

export interface NavigationCollapsibleItemThemeProps {
    openByDefault?: boolean;
    openedIcon?: React.ReactNode;
    closedIcon?: React.ReactNode;
}

const CollapsibleItem: React.FC<WithStyles<typeof styles> & NavigationCollapsibleItemThemeProps & NavigationCollapsibleItemProps> = ({
    classes,
    theme,
    level,
    primary,
    secondary,
    icon,
    openByDefault = false,
    openedIcon = <ArrowUpIcon />,
    closedIcon = <ArrowDownIcon />,
    children,
    ...otherProps
}) => {
    if (!level) level = 1;
    let hasSelectedChild: boolean = false;
    const location = useLocation();

    const childElements = React.Children.map(children, (child: NavigationChild) => {
        if (matchPath(location.pathname, { path: child.props.to, strict: true })) {
            hasSelectedChild = true;
        }

        return React.cloneElement<NavigationLevel>(child, {
            level: level + 1,
        });
    });

    const [open, setOpen] = React.useState<boolean>(openByDefault || hasSelectedChild);

    const listClasses = [classes.root];
    if (hasSelectedChild) listClasses.push(classes.childSelected);
    if (open) listClasses.push(classes.open);

    return (
        <div {...otherProps} className={listClasses.join(" ")}>
            <div className={classes.listItem}>
                <NavigationItem
                    primary={primary}
                    secondary={secondary}
                    icon={icon}
                    level={level}
                    onClick={() => setOpen(!open)}
                    secondaryAction={open ? openedIcon : closedIcon}
                />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>{childElements}</List>
            </Collapse>
        </div>
    );
};

export const NavigationCollapsibleItem = withStyles(styles, { name: "CometAdminNavigationCollapsibleItem", withTheme: true })(CollapsibleItem);
