/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Constants, Languages } from "@common";
import { switchLayoutMode } from "@redux/actions";
import { connect } from "react-redux";
import styles from "./styles";

const mapStateToProps = ({ products }) => ({ layoutHome: products.layoutHome });

@connect(
  mapStateToProps,
  { switchLayoutMode }
)
export default class ItemLayout extends Component {
  static propTypes = {
    switchLayoutMode: PropTypes.func,
    close: PropTypes.func,
    layoutHome: PropTypes.any,
    layout: PropTypes.any,
    image: PropTypes.any,
    text: PropTypes.string,
  };

  changeLayout = (layout) => {
    this.props.switchLayoutMode(layout);
    this.props.close();
  };

  render() {
    const { layoutHome, layout, image, text } = this.props;

    let displayMode = layoutHome;

    if (typeof displayMode === "undefined") {
      displayMode = Constants.Layout.advance;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.rowView}
        onPress={() => this.changeLayout(layout)}>
        <View style={[styles.row, displayMode === layout && styles.rowActive]}>
          <Image
            source={image}
            style={[
              styles.imageIcon,
              displayMode === layout && { tintColor: "#fff" },
            ]}
          />
          <Text
            style={[
              styles.text,
              displayMode === layout && styles.imageIconActive,
            ]}>
            {Languages[text]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
