import React, { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userActions } from "../../redux/actions/user.actions";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { navigations } from "../../navigations";
import { MatxVerticalNav } from "matx";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { Button, IconButton, Icon } from "@material-ui/core";

const Sidenav = props => {
  const updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  const renderOverlay = () => (
    <div
      onClick={() => updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );

  return (
    <Fragment>
      <Scrollbar
        options={{ suppressScrollX: true }}
        className="scrollable position-relative"
      >
        {props.children}
        <MatxVerticalNav navigation={navigations} />
        <div className="py-8" />
        <div className="px-4" >
        <IconButton
                aria-label="Delete"
                className=""
                size="small"
                // onClick={this.handleSignOut}
              >
                {/* <Icon>exit_to_app</Icon> */}
              </IconButton>
        <Button  startIcon={<PowerSettingsNewIcon />} variant="outlined" size="small" color="secondary" onClick={()=>props.logout()}>
          
          Logout</Button>
        </div>
      </Scrollbar>
      {renderOverlay()}
    </Fragment>
  );
};

Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const actionCreators = {
  logout: userActions.logout,
  setLayoutSettings
};
const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withRouter(
  connect(mapStateToProps, actionCreators)(Sidenav)
);
