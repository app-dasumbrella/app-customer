/** @format */

import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Color } from "@common";
import styles from "./styles";

const SIZES = { SMALL: "small", LARGE: "large" };
export const Mode = { normal: "normal", full: "full", overlay: "overlay" };

class Spinner extends Component {
  _getContainerStyle = () => {
    switch (this.props.mode) {
      case Mode.full:
        return styles.containerFullStretch;
      case Mode.overlay:
        return styles.containerOverlay;
      default:
        return styles.container;
    }
  };

  render() {
    const { size, color } = this.props;
    const containerStyle = this._getContainerStyle();

    return (
      <View style={containerStyle}>
        <ActivityIndicator
          size={size}
          color={color}
          style={[
            styles.wrapper,
            { borderRadius: size === SIZES.SMALL ? 10 : 20 },
          ]}
        />
      </View>
    );
  }
}

Spinner.defaultProps = {
  color: Color.theme,
  size: "small",
  mode: Mode.full,
};

export default Spinner;
