import { ListItemProps } from "@material-ui/core/ListItem";
import * as React from "react";
import { Link, LinkProps, Route } from "react-router-dom";

import { NavigationItem, NavigationItemProps } from "./Item";

interface NavigationItemRouterLinkStandardProps {
    to: string;
}

export type NavigationItemRouterLinkProps = NavigationItemRouterLinkStandardProps & NavigationItemProps & ListItemProps & LinkProps;

export const NavigationItemRouterLink: React.FC<NavigationItemRouterLinkProps> = (props) => (
    <Route path={props.to} strict={false}>
        {({ match }) => <NavigationItem selected={!!match} component={Link} {...props} />}
    </Route>
);
