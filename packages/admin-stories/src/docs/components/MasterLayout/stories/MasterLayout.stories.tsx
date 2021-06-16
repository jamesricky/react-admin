import { Menu, MenuItem } from "@comet/admin";
import { AppHeader, AppHeaderAction, AppHeaderFillSpace, AppHeaderMenuButton } from "@comet/admin";
import { Dashboard, Wrench } from "@comet/admin-icons";
import { Typography } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("stories/components/MasterLayout/MasterLayout", module).add("MasterLayout", () => {
    function MasterMenu() {
        return (
            <Menu>
                <MenuItem primary="Menu button" icon={<Dashboard />} />
            </Menu>
        );
    }

    function MasterHeader() {
        return (
            <AppHeader>
                <AppHeaderMenuButton />
                <AppHeaderFillSpace />
                <AppHeaderAction startIcon={<Wrench />}>Header Action</AppHeaderAction>
            </AppHeader>
        );
    }

    return (
        <div>
            <Typography variant="h1">basfh</Typography>

            {/*<RouterBrowserRouter>*/}
            {/*    <MasterLayout menuComponent={MasterMenu} headerComponent={MasterHeader}>*/}
            {/*        <Typography variant="h1">App content</Typography>*/}
            {/*    </MasterLayout>*/}
            {/*</RouterBrowserRouter>*/}
        </div>
    );
});
