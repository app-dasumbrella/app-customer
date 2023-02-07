/** @format */

import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { startCase } from "lodash";
import { Languages, Tools } from "@common";
import styles from "./styles";

const mapStateToProps = ({ carts }) => {
  return {
    subtotalPrice: carts.subtotalPrice,
    shippingSelected: carts.shippingSelected,
  };
};

@connect(mapStateToProps)
export default class AdditionInfo extends Component {
  render() {
    const { subtotalPrice, shippingSelected } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {subtotalPrice && (
          <View style={styles.additionRow}>
            <Text style={styles.text}>{startCase(Languages.Item)}</Text>
            <Text style={styles.textBold}>{Tools.getPrice(subtotalPrice)}</Text>
          </View>
        )}
        {shippingSelected && (
          <View style={styles.additionRow}>
            <Text style={styles.text}>{Languages.DeliveryFee}</Text>
            <Text style={styles.textBold}>
              {Tools.getPrice(shippingSelected.price)}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
