import { Link, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

import { StackApiContext } from "../../../stack/Api";
import { useStyles } from "./ToolbarBreadcrumbs.styles";
import { useThemeProps } from "./ToolbarBreadcrumbs.styles";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(({ href, to, ...rest }, ref) => (
    <RouterLink innerRef={ref} to={to ?? href} {...rest} />
));

export const ToolbarBreadcrumbs: React.FunctionComponent = () => {
    const themeProps = useThemeProps();
    const classes = useStyles();

    return (
        <StackApiContext.Consumer>
            {(stackApi) => {
                return (
                    <>
                        {stackApi?.breadCrumbs.map(({ id, url, title }, index) => {
                            const showSeparator = index < stackApi?.breadCrumbs.length - 1;
                            const isActive = index === stackApi?.breadCrumbs.length - 1;
                            return (
                                <>
                                    <div className={classes.item} key={id}>
                                        <Typography
                                            {...themeProps.typographyProps}
                                            classes={{ root: `${classes.typographyRoot} ${isActive ? classes.typographyActiveRoot : ""}` }}
                                        >
                                            <Link to={url} component={BreadcrumbLink} color={"inherit"}>
                                                {title}
                                            </Link>
                                        </Typography>
                                    </div>
                                    {showSeparator && (
                                        <div className={classes.separatorContainer}>
                                            <div className={classes.separator} />
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </>
                );
            }}
        </StackApiContext.Consumer>
    );
};