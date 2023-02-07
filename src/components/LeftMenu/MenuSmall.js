/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import SideMenu from "react-native-drawer";
import { Color } from "@common";

export default class MenuSmall extends Component {
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
      onPressToggle,
      routes,
      renderDrawer,
      backgroundColor,
    } = this.props;

    return (
      <SideMenu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="static"
        open={isOpen}
        tapToClose
        backgroundColor={backgroundColor}
        styles={{
          drawer: {
            backgroundColor,
          },
        }}
        onClose={() => onPressToggle(false)}
        panCloseMask={0.6}
        panThreshold={0.6}
        openDrawerOffset={0.6}
        useInteractionManager
        content={renderDrawer}>
        {routes}
      </SideMenu>
    );
  }
}
