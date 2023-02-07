/** @format */

import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ProductAttributesText } from "@components";
import { Languages } from "@common";

export default class ProductDetailAttributesTab extends Component {
  render() {
    if (this.props.attributes && this.props.attributes.length > 0) {
      return <ProductAttributesText attributes={this.props.attributes} />;
    }
    return (
      <View style={styles.emptyAttributes}>
        <Text>{Languages.EmptyProductAttribute}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyAttributes: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255,255,255,1)",
  },
});
