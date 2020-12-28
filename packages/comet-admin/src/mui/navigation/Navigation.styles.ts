import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

export type CometAdminNavigationClassKeys = "drawer" | "permanent" | "temporary" | "open" | "closed";

export const styles = (theme: Theme) =>
    createStyles<CometAdminNavigationClassKeys, any>({
        drawer: {
            "& .MuiPaper-root": {
                flexGrow: 1,
                overflowX: "hidden",
            },
            "&$permanent": {
                "& .MuiPaper-root": {
                    top: 64,
                    height: "calc(100% - 64px)",
                },
                "&$open": {
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    "& .MuiPaper-root": {
                        transition: theme.transitions.create("margin", {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    },
                },
                "&$closed": {
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    "& .MuiPaper-root": {
                        transition: theme.transitions.create("margin", {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                },
            },
        },
        permanent: {},
        temporary: {},
        open: {},
        closed: {},
    });
