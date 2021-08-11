import React from "react";
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    "& .sidenav": {
      "& .sidenav__hold": {
        opacity: "1 !important",
        "&::after": {
          // background: theme.palette.primary.main,
          background: "#f4f4f4",
          opacity: .96
        },
        "& .nav-item:not(.badge)": {
          color: "black"
        },
        "& .nav-item": {
          "&.active, &.active:hover": {
            // background: theme.palette.primary.main
            background: "green"
          },
          "& .icon-text::after": {
            background: theme.palette.text.primary
          }
        }
      }
    }
  }
});

const SidenavThemeStyles = ({ children, classes }) => {
  return <div className={classes.root}>{children}</div>;
};

export default withStyles(styles, { withTheme: true })(SidenavThemeStyles);
