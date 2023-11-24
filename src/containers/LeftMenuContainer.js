/** @format */

import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { toggleSidemenu } from "@redux/actions";
import { Config, } from "../common/index";
import Color from "../common/Color";
import DrawerContainer from "../containers/DrawerContainer/index";
import {
  LeftMenuOverlay,
  LeftMenuSmall,
  LeftMenuWide,
  LeftMenuScale,
} from "@components";

const OVERLAY = "overlay";
const SMALL = "small";
const WIDE = "wide";
const SCALE = "scale";

const mapStateToProps = ({ app }) => ({
  isOpen: app.isOpenSidemenu,
});

@withTheme
@connect(
  mapStateToProps,
  { toggleSidemenu }
)
export default class LeftMenuContainer extends Component {
  // static propTypes = {
  //   type: PropTypes.oneOf([OVERLAY, SMALL, WIDE, SCALE]),
  //   routes: PropTypes.object,
  //   isOpen: PropTypes.bool.isRequired,
  //   goToScreen: PropTypes.func.isRequired,
  // };

  static defaultProps = {
    isOpen: false,
  };

  _toggleMenu = (isOpen) => {
    if (!isOpen) {
      this.props.toggleSidemenu(isOpen);
    }
  };

  _renderLeftMenu = () => {
    const { type, routes, isOpen, theme } = this.props;
    const props = {
      isOpen,
      routes,
      onPressToggle: this._toggleMenu,
      renderDrawer: (
        <DrawerContainer
          goToScreen={this.props.goToScreen}
          isMultiChild={Config.menu.isMultiChild}
        />
      ),
      backgroundColor: 'white',
    };
    switch (type) {
      case SMALL: {
        return <LeftMenuSmall {...props} />;
      }

      case WIDE: {
        return <LeftMenuWide {...props} />;
      }

      case OVERLAY: {
        return <LeftMenuOverlay {...props} />;
      }

      default: {
        return <LeftMenuScale {...props} />;
      }
    }
  };

  render() {
    return this._renderLeftMenu();
  }
}
