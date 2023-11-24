/** @format */

import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import SideMenu from "react-native-drawer";
import { Color } from "@common";

/**
 * MenuScale only support IOS
 */
export default class MenuScale extends Component {
  static propTypes = {
    routes: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  };

  static defaultProps = {
    backgroundColor: Color.SideMenuBg,
  };

  render() {
    const {
      isOpen,
      routes,
      onPressToggle,
      renderDrawer,
      backgroundColor,
    } = this.props;

    return (
      <SideMenu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="static"
        backgroundColor={backgroundColor}
        isScale
        captureGestures
        tapToClose
        open={isOpen}
        onClose={() => onPressToggle(false)}
        panCloseMask={0.25}
        openDrawerOffset={0.3}
        panThreshold={0.4}
        useInteractionManager
        content={renderDrawer}>
        {routes}
      </SideMenu>
    );
  }
}
