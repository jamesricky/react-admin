import { Box, Divider, Typography } from "@material-ui/core";
import { Dashboard, GitHub, Launch, List, Settings } from "@material-ui/icons";
import { storiesOf } from "@storybook/react";
import { MasterLayout, MenuContext, Navigation, NavigationCollapsibleItem, NavigationItemRouterLink, useWindowSize } from "@vivid-planet/comet-admin";
import { MenuNewItemAnchorLink } from "@vivid-planet/comet-admin/lib/mui/menuNew/ItemAnchorLink";
import * as React from "react";
import { matchPath, Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import StoryRouter from "storybook-react-router";

const permanentNavigationMinWidth = 1024;
const pathsToAlwaysUseTemporaryNavigation = ["/foo3", "/foo4"];

const AppMenu: React.FC = () => {
    const { open, toggleOpen } = React.useContext(MenuContext);
    const windowSize = useWindowSize();
    const location = useLocation();

    let useTemporaryNavigation: boolean = windowSize.width < permanentNavigationMinWidth;

    if (matchPath(location.pathname, { path: pathsToAlwaysUseTemporaryNavigation, strict: true })) {
        useTemporaryNavigation = true;
    }

    // Open navigation when changing to permanent variant and close when changing to temporary variant.
    React.useEffect(() => {
        if ((useTemporaryNavigation && open) || (!useTemporaryNavigation && !open)) {
            toggleOpen();
        }
        // useEffect dependencies must only include `location`, because the function should only be called once after changing the location.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <Navigation variant={useTemporaryNavigation ? "temporary" : "permanent"}>
            <NavigationItemRouterLink primary="Dashboard" icon={<Dashboard />} to="/dashboard" />
            <NavigationItemRouterLink primary="Settings" icon={<Settings />} to="/settings" />
            <NavigationCollapsibleItem primary="More Items" icon={<List />}>
                <NavigationItemRouterLink primary="Foo1" to="/foo1" />
                <NavigationItemRouterLink primary="Foo2" to="/foo2" />
            </NavigationCollapsibleItem>
            <NavigationCollapsibleItem primary="Even More Items" secondary="Forcing temporary navigation" icon={<List />}>
                <NavigationItemRouterLink primary="Foo3" to="/foo3" />
                <NavigationItemRouterLink primary="Foo4" to="/foo4" />
            </NavigationCollapsibleItem>
            <MenuNewItemAnchorLink
                primary="Comet Admin"
                secondary="View on GitHub"
                target="_blank"
                href="https://github.com/vivid-planet/comet-admin"
                icon={<GitHub />}
                secondaryAction={<Launch />}
            />
        </Navigation>
    );
};

const AppHeader: React.FC = () => (
    <Typography variant="h5" color="primary">
        Example
    </Typography>
);

const Content = ({ children }: { children: string }) => (
    <Box paddingTop={2}>
        <Typography variant={"h4"}>{children}</Typography>
        <br />
        <Typography>
            The navigation is permanent by default and is temporary below {permanentNavigationMinWidth}px and for the routes:{" "}
            {pathsToAlwaysUseTemporaryNavigation.join(", ")}.
            <br />
            This is useful, when specific pages need some extra width.
        </Typography>
        <br />
        <Divider />
        <br />
        <Typography variant={"body2"}>Links for testing menu-behaviour when location changes without menu-interaction:</Typography>
        <ul>
            <li>
                <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
                <Link to={"/settings"}>Settings</Link>
            </li>
            <li>
                <Link to={"/foo1"}>Foo1</Link>
            </li>
            <li>
                <Link to={"/foo2"}>Foo2</Link>
            </li>
            <li>
                <Link to={"/foo3"}>Foo3</Link>
            </li>
            <li>
                <Link to={"/foo4"}>Foo4</Link>
            </li>
        </ul>
    </Box>
);

const Story: React.FC = () => (
    <MasterLayout headerComponent={AppHeader} menuComponent={AppMenu}>
        <Switch>
            <Route path="/" exact render={() => <Content>Root</Content>} />
            <Route path="/dashboard" render={() => <Content>Dashboard</Content>} />
            <Route path="/settings" render={() => <Content>Settings</Content>} />
            <Route path="/foo1" render={() => <Content>Foo 1</Content>} />
            <Route path="/foo2" render={() => <Content>Foo 2</Content>} />
            <Route path="/foo3" render={() => <Content>Foo 3</Content>} />
            <Route path="/foo4" render={() => <Content>Foo 4</Content>} />
        </Switch>
    </MasterLayout>
);

storiesOf("comet-admin-mui", module)
    .addDecorator(StoryRouter())
    .add("Navigation (dynamic variants)", () => <Story />);
