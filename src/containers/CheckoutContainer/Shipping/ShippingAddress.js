/** @format */

import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { getDefaultShippingAddress } from "@redux/selectors";
import { CheckoutAddressItem, Button } from "@components";
import { Languages } from "@common";
import styles from "./styles";

const mapStateToProps = (state) => {
  return {
    checkoutId: state.carts.checkoutId,
    shippingAddress: getDefaultShippingAddress(state),
  };
};

@withNavigation
@connect(mapStateToProps)
export default class ShippingAddress extends Component {
  _handlePressEdit = () => {
    this.props.navigation.navigate("UserAddressScreen");
  };

  _handlePressAdd = () => {
    this.props.navigation.navigate("UserAddressFormScreen");
  };

  _renderAddButton = () => {
    return (
      <Button
        onPress={this._handlePressAdd}
        text={Languages.Add.toUpperCase()}
        transparent
        type="text"
      />
    );
  };

  _renderEditButton = () => {
    return (
      <Button
        onPress={this._handlePressEdit}
        text={Languages.Edit.toUpperCase()}
        transparent
        type="text"
      />
    );
  };

  render() {
    const { shippingAddress } = this.props;

    return (
      <View style={{ flex: 1, marginBottom: 5 }}>
        <View style={styles.headerRow}>
          <Text style={styles.label}>{Languages.Delivery.toUpperCase()}</Text>
          {shippingAddress ? this._renderEditButton() : this._renderAddButton()}
        </View>
        <View style={styles.shippingAddress}>
          {shippingAddress && <CheckoutAddressItem address={shippingAddress} />}
        </View>
      </View>
    );
  }
}
