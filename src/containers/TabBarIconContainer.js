/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTheme } from "@callstack/react-theme-provider";
import { View, Text, Image } from "react-native";
import { Styles, Color } from "@common";
import { connect } from "react-redux";

const mapStateToProps = ({ carts, wishlist, app }) => ({ carts, wishlist, app });

@withTheme
@connect(mapStateToProps)
export default class TabBarIconContainer extends Component {
  static propTypes = {
    icon: PropTypes.any,
    css: PropTypes.any,
    carts: PropTypes.object,
    cartIcon: PropTypes.any,
    wishlist: PropTypes.any,
    wishlistIcon: PropTypes.any,
    focused: PropTypes.bool,
  };

  _renderNumberWrap = (number = 0) => {
    return (
      <View style={styles.numberWrap(this.props.theme)}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );
  };

  render() {
    const {
      icon,
      css,
      carts,
      cartIcon,
      wishlist,
      wishlistIcon,
      focused,
      app
    } = this.props;
    let { settings } = app || {}
    let { theme } = settings || {}
    return (
      <View style={{ justifyContent: "center" }}>
        <Image
          ref={(comp) => (this._image = comp)}
          source={icon}
          style={[
            styles.icon,
            { tintColor: focused ? theme?.primaryColor : Color.tabbarColor },
            css,
          ]}
        />
        {wishlistIcon &&
          wishlist.total > 0 &&
          this._renderNumberWrap(wishlist.total || 0)}
        {cartIcon &&
          carts.total > 0 &&
          this._renderNumberWrap(carts.total || 0)}
      </View>
    );
  }
}

const styles = {
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  numberWrap: (theme) => ({
    ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: -10,
    right: -10,
    height: 18,
    minWidth: 18,
    backgroundColor: theme.primaryColor,
    borderRadius: 9,
  }),
  number: {
    color: "white",
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
};
