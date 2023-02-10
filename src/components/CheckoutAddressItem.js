/** @format */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color, Constants } from "@common";

export default class CheckoutProductItem extends Component {
  render() {
    const { address } = this.props;
    console.log(address, 'jj')
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{address?.address?.name}</Text>
        <Text style={styles.text}>{address.phone_number}</Text>
        <Text style={styles.text}>{address?.address?.address1}, {address?.address?.pincode} {address?.address?.country}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "transparent",
    color: Color.TextDefault,
    // fontFamily: Constants.fontFamily,
  },
});
