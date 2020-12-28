import { Box, Typography } from "@material-ui/core";
import { Dashboard, GitHub, Launch, List, Settings } from "@material-ui/icons";
import { storiesOf } from "@storybook/react";
import { MasterLayout, Navigation, NavigationCollapsibleItem, NavigationItemRouterLink, useWindowSize } from "@vivid-planet/comet-admin";
import { MenuNewItemAnchorLink } from "@vivid-planet/comet-admin/lib/mui/menuNew/ItemAnchorLink";
import * as React from "react";
import { Route, Switch } from "react-router";
import StoryRouter from "storybook-react-router";

const permanentNavigationMinWidth = 1024;

const AppMenu: React.FC = () => {
    const windowSize = useWindowSize();

    return (
        <Navigation variant={windowSize.width < permanentNavigationMinWidth ? "temporary" : "permanent"}>
            <NavigationItemRouterLink primary="Dashboard" icon={<Dashboard />} to="/dashboard" />
            <NavigationItemRouterLink primary="Settings" icon={<Settings />} to="/settings" />
            <NavigationCollapsibleItem primary="More Items" icon={<List />}>
                <NavigationItemRouterLink primary="Foo1" to="/foo1" />
                <NavigationItemRouterLink primary="Foo2" to="/foo2" />
            </NavigationCollapsibleItem>
            <NavigationCollapsibleItem primary="Even More Items" icon={<List />}>
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
        <Typography>The navigation is permanent by default and is temporary below {permanentNavigationMinWidth}px.</Typography>
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
    .add("Navigation", () => <Story />);
