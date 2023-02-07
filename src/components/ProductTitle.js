/** @format */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "@common";

export default class ProductTitle extends Component {
  render() {
    const { name } = this.props;
    if (!name) return <View />;
    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.name}>{name.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    fontFamily: Constants.fontFamilyBold,
    letterSpacing: 1,
    color: "#454553",
  },
});
