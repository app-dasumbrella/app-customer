/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import SideMenu from "react-native-drawer";
import { Color } from "@common";

export default class MenuOverlay extends Component {
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
        type="overlay"
        backgroundColor={backgroundColor}
        styles={{
          drawer: {
            backgroundColor,
          },
        }}
        tapToClose
        open={isOpen}
        onClose={() => onPressToggle(false)}
        panCloseMask={0.3}
        panThreshold={0.3}
        openDrawerOffset={0.3}
        useInteractionManager
        content={renderDrawer}>
        {routes}
      </SideMenu>
    );
  }
}
