/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, Platform, Text, View, I18nManager } from "react-native";
import { NavBarMenu, NavBarBack } from "@components";
import { Languages, Images } from "@common";
import styles from "./styles";

const isAndroid = Platform.OS === "android";

export default class AnimatedHeader extends Component {
  static propTypes = {
    scrollY: PropTypes.any,
    label: PropTypes.string,
    hideIcon: PropTypes.bool,
  };

  render() {
    const { scrollY, label, hideIcon, navigation } = this.props;
    const title = Languages[label] || label;

    if (isAndroid || !scrollY) {
      return (
        <View style={styles.headerAndroid}>
          {isAndroid &&
            NavBarBack({ navigation, iconBack: Images.icons.backs })}
          {label && <Text style={styles.headerLabelStatic}>{label}</Text>}
          {!hideIcon && <View style={styles.homeMenu}>{NavBarMenu()}</View>}
        </View>
      );
    }

    const titleTransformY = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -45],
      extrapolate: "clamp",
    });
    const titleTransformX = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, I18nManager.isRTL ? -25 : 25],
      extrapolate: "clamp",
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <View>
        {/* <View style={styles.headerView} /> */}

        <Animated.Text
          style={[
            styles.headerLabel,
            {
              transform: [
                { translateY: titleTransformY },
                { translateX: titleTransformX },
                { scale: titleScale },
              ],
            },
          ]}>
          {title}
        </Animated.Text>
        {!hideIcon && <View style={styles.homeMenu}>{NavBarMenu()}</View>}
      </View>
    );
  }
}
