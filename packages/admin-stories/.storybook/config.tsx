import { select, withKnobs } from "@storybook/addon-knobs";
import { addDecorator, configure } from "@storybook/react";
import "@comet/admin-color-picker/src/themeAugmentation";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { createMuiTheme, MuiThemeProvider as ThemeProvider } from "@comet/admin";
import { Theme, useMediaQuery } from "@material-ui/core";
import { getTheme } from "@comet/admin-theme";
import styled, { createGlobalStyle } from "styled-components";

const req = require.context("../src", true, /\.tsx$/);

function loadStories() {
    req.keys().forEach(req);
}

addDecorator((story, context) => {
    const storyWithKnobs = withKnobs(story, context); // explicitly add withKnobs
    // @TODO: use messages from lang-package
    const messages = {
        en: {
            "cometAdmin.core.deleteMutation.promptDelete": "Delete data?",
            "cometAdmin.core.deleteMutation.yes": "Yes",
            "cometAdmin.core.deleteMutation.no": "No",
            "cometAdmin.core.dirtyHandler.discardChanges": "Discard unsaved changes?",
            "cometAdmin.core.editDialog.edit": "Edit",
            "cometAdmin.core.editDialog.add": "Add",
            "cometAdmin.core.editDialog.cancel": "Cancel",
            "cometAdmin.core.editDialog.save": "Save",
            "cometAdmin.core.finalForm.abort": "Cancel",
            "cometAdmin.core.finalForm.save": "Save",
            "cometAdmin.core.router.confirmationDialog.confirm": "OK",
            "cometAdmin.core.router.confirmationDialog.abort": "Cancel",
            "cometAdmin.core.stack.stack.back": "Back",
            "cometAdmin.core.table.addButton": "Add",
            "cometAdmin.core.table.excelExportButton": "Export",
            "cometAdmin.core.table.deleteButton": "Delete",
            "cometAdmin.core.table.pagination.pageInfo": "Page {current} of {total}",
            "cometAdmin.core.table.localChangesToolbar.save": "Save",
            "cometAdmin.core.table.localChangesToolbar.unsavedItems":
                "{count, plural, =0 {no unsaved changes} one {# unsaved change} other {# unsaved changes}}",
            "cometAdmin.core.table.tableFilterFinalForm.resetButton": "Reset Filter",
            "cometAdmin.core.table.tableQuery.error": "Error :( {error}",
        },
        de: {
            "cometAdmin.core.table.localChangesToolbar.unsavedItems":
                "{count, plural, =0 {keine ungespeicherten Änderungen} one {# ungespeicherte Änderung} other {# ungespeicherte Änderungen}}",
            "cometAdmin.core.table.tableQuery.error": "Fehler :( {error}",
        },
    };
    return (
        <IntlProvider locale={select("Locale", ["de", "en"], "de")} messages={messages[select("Locale", ["de", "en"], "de")] ?? {}}>
            {storyWithKnobs}
        </IntlProvider>
    );
});

const themeOptions = {
    cometAuto: "Comet Auto (Default from OS)",
    cometLight: "Comet Light",
    cometDark: "Comet Dark",
    none: "None (Default MUI-Theme)",
};

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
`;

const StoryWrapper = styled.div`
    background-color: ${({ theme }) => (theme.palette.type === "dark" ? theme.palette.background.default : "#ffffff")};
    padding: ${({ theme }) => theme.spacing(4)}px;
    min-height: 100vh;
    box-sizing: border-box;
`;

addDecorator((story) => {
    const selectedTheme = select("Theme", Object.values(themeOptions), Object.values(themeOptions)[0]);
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const usedTheme = React.useMemo(() => {
        let theme = createMuiTheme({});

        if (selectedTheme === themeOptions["cometLight"]) {
            theme = getTheme(false);
        } else if (selectedTheme === themeOptions["cometDark"]) {
            theme = getTheme(true);
        } else if (selectedTheme === themeOptions["cometAuto"]) {
            theme = getTheme(prefersDarkMode);
        }

        return theme;
    }, [prefersDarkMode, selectedTheme]);

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={usedTheme}>
                <StoryWrapper>{story()}</StoryWrapper>
            </ThemeProvider>
        </>
    );
});

configure(loadStories, module);
