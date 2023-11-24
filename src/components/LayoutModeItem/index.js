/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Constants, Languages } from "@common";
import styles from "./styles";

export default class LayoutModeItem extends Component {
  static propTypes = {
    layoutSelected: PropTypes.any,
    layoutMode: PropTypes.any,
    image: PropTypes.any,
    text: PropTypes.string,
  };

  _onSelect = () => {
    const { layoutMode, onSelect } = this.props;
    onSelect(layoutMode);
  };

  render() {
    const { layoutSelected, layoutMode, image, text } = this.props;

    let displayMode = layoutSelected;

    if (typeof displayMode === "undefined") {
      displayMode = Constants.Layout.advance;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.rowView}
        onPress={this._onSelect}>
        <View
          style={[styles.row, displayMode === layoutMode && styles.rowActive]}>
          <Image
            source={image}
            style={[
              styles.imageIcon,
              displayMode === layoutMode && { tintColor: "#fff" },
            ]}
          />
          <Text
            style={[
              styles.text,
              displayMode === layoutMode && styles.imageIconActive,
            ]}>
            {" "}
            {Languages[text]}{" "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
