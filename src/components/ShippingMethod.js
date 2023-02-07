/** @format */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { Color, Constants } from "@common";

@withTheme
export default class ShippingMethod extends Component {
  static default = {
    selected: false,
    onPress: () => { },
  };

  render() {
    const { selected, onPress, price, title, theme } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <View style={[styles.content, selected && styles.selected(theme)]}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{title.toUpperCase()}</Text>
              <Text style={styles.money}>{price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 5,
    marginRight: 5
  },
  content: {
    borderRadius: 4,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: Color.TextDefault,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  money: {
    color: Color.Text,
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
  },
  name: {
    color: Color.TextDefault,
    fontSize: 11,
    fontFamily: Constants.fontFamily,
    marginBottom: 5,
  },
  selected: (theme) => ({
    borderWidth: 3.5,
    borderColor: theme.primaryColor,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, .6)",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  }),
};
