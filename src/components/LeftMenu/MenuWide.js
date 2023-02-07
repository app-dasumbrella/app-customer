/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import SideMenu from "react-native-drawer";
import { Color } from "@common";

export default class MenuSmall extends Component {
  static propTypes = {
    routes: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    renderDrawer: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  };

  static defaultProps = {
    backgroundColor: Color.SideMenuBg,
  };

  render() {
    const {
      isOpen,
      onPressToggle,
      routes,
      renderDrawer,
      backgroundColor,
    } = this.props;

    return (
      <SideMenu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="static"
        tapToClose
        backgroundColor={backgroundColor}
        styles={{
          drawer: {
            backgroundColor,
          },
        }}
        open={isOpen}
        onClose={() => onPressToggle(false)}
        panCloseMask={0.2}
        panThreshold={0.2}
        openDrawerOffset={0.2}
        useInteractionManager
        content={renderDrawer}>
        {routes}
      </SideMenu>
    );
  }
}
