import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Icon, IconButton, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import PropTypes from "prop-types";
import { MatxMenu, MatxSearchBox } from "matx";
import { isMdScreen, classList } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import ShoppingCart from "../SharedCompoents/ShoppingCart";

const styles = theme => ({
  topbar: {
    "& .topbar-hold": {
      backgroundColor: theme.palette.default,
      height: "80px",
      "&.fixed": {
        boxShadow: theme.shadows[8],
        height: "64px"
      }
    }
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185
  }
});

class Layout1Topbar extends Component {
  constructor(props){
    super(props)
    let profile_image =  localStorage.getItem('profile_pic');
    let user =  localStorage.getItem('user');
    this.state = {
      user:user,
      profile_image : profile_image,
    };
  }

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };
  handleSidenavToggle = () => {
    let {
      settings: {
        layout1Settings: {
          leftSidebar: { mode }
        }
      }
    } = this.props;

    // console.log(mode);

    this.updateSidebarMode({ mode: mode === "compact" ? "full" : "compact" });
  };
  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  render() {
    let { classes, fixed } = this.props;
    const {profile_image, user} = this.state
    return (
      <div className={`topbar ${classes.topbar}`}>
        <div className={classList({ "topbar-hold": true, fixed: fixed })}>
          <div className="flex justify-between items-center h-full">
            <div className="flex">
              <IconButton
                onClick={this.handleSidebarToggle}
                className="hide-on-pc"
              >
                <Icon style={{ color: "black" }}>menu</Icon>
              </IconButton>
              <Icon className="sidenav__toggle show-on-pc" onClick={this.handleSidenavToggle} color="primary">menu</Icon>
              {/* <div className="hide-on-mobile">
                <IconButton >
                  <Icon>mail_outline</Icon>
                </IconButton>

                <IconButton>
                  <Icon>web_asset</Icon>
                </IconButton>

                <IconButton>
                  <Icon>star_outline</Icon>
                </IconButton>
              </div> */}
            </div>
            {user ? <div className="flex items-center">
              {/* <MatxSearchBox color="secondary"/> */}

              {/* <NotificationBar /> */}

              {/* <ShoppingCart></ShoppingCart> */}

              <MatxMenu
                menuButton={
                  <img
                    className="mx-2 align-middle circular-image-small cursor-pointer"
                    src={profile_image == ""? "/assets/images/dummy.jpg": profile_image}
                    alt="user"
                  />
                }
              >
                <MenuItem>
                  <Link className={classes.menuItem} to="/dashboard">
                    <Icon> home </Icon>
                    <span className="pl-4"> Home </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className={classes.menuItem}
                    to="/settings"
                  >
                  <Icon> person </Icon>
                  <span className="pl-4"> Profile </span>
                  </Link>
                </MenuItem>
                {/* <MenuItem className={classes.menuItem}>
                  <Icon> settings </Icon>
                  <span className="pl-4"> Settings </span>
                </MenuItem> */}
                <MenuItem
                  onClick={this.handleSignOut}
                  className={classes.menuItem}
                >
                  <Icon> power_settings_new </Icon>
                  <span className="pl-4"> Logout </span>
                </MenuItem>
              </MatxMenu>
            </div>:
            <div className="flex items-center">
              <MatxMenu >
                
              </MatxMenu>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)
  )
);
