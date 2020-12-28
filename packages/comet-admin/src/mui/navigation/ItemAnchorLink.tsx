import { ListItemProps } from "@material-ui/core/ListItem";
import * as React from "react";

import { NavigationItem, NavigationItemProps } from "./Item";

export const NavigationItemAnchorLink: React.FC<NavigationItemProps & ListItemProps & React.HTMLProps<HTMLAnchorElement>> = (props) => (
    <NavigationItem selected={false} component="a" {...props} />
);
