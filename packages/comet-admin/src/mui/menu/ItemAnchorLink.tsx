import { ListItemProps } from "@material-ui/core/ListItem";
import * as React from "react";

import { IMenuItemProps, MenuItem } from "./Item";

/**
 * @deprecated use `NavigationItemAnchorLink` instead.
 */
export class MenuItemAnchorLink extends React.Component<IMenuItemProps & ListItemProps & React.HTMLProps<HTMLAnchorElement>> {
    public render() {
        const { ...otherProps } = this.props;
        return <MenuItem selected={false} component="a" {...otherProps} />;
    }
}
