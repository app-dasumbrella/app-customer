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
  };
};

@withNavigation
@connect(mapStateToProps)
export default class ShippingAddress extends Component {
  _handlePressEdit = () => {
    this.props.navigation.push("UserAddressScreen");
  };

  // _handlePressAdd = () => {
  //   this.props.navigation.push("UserAddressFormScreen");
  // };

  _renderAddButton = () => {
    const { primaryColor } = this.props;

    return (
      <Button
        onPress={this.props.handlePressAdd}
        text={"Add address".toUpperCase()}
        transparent
        type="text"
        textStyle={{ color: primaryColor, fontSize: 14 }}
        style={{ marginBottom: 25, color: primaryColor, marginLeft: -40 }}
      />
    );
  };

  _renderLoginButton = () => {
    const { primaryColor } = this.props;

    return (
      <Button
        onPress={() => this.props.navigation.navigate("Login")}
        text={"LOGIN"}
        transparent
        type="text"
        textStyle={{ color: primaryColor }}
        style={{ marginBottom: 25, color: primaryColor }}
      />
    );
  };
  _renderEditButton = () => {
    const { primaryColor } = this.props;

    return (
      <Button
        onPress={this._handlePressEdit}
        text={Languages.Edit.toUpperCase()}
        transparent
        type="text"
        textStyle={{ color: primaryColor }}
      />
    );
  };

  render() {
    const { shippingAddress, loggedin, primaryColor } = this.props;
    console.log(shippingAddress, "shippingAddress shippingAddress");
    return (
      <View style={{ flex: 1, marginBottom: 5 }}>
        <View style={styles.shippingAddress}>
          {shippingAddress?.id && (
            <CheckoutAddressItem address={shippingAddress} />
          )}
          {shippingAddress?.id ? (
            <View style={{ position: "absolute", right: 10 }}>
              {this._renderEditButton()}
            </View>
          ) : (
            <View
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                left: "48%",
              }}
            >
              {loggedin ? this._renderAddButton() : this._renderLoginButton()}
            </View>
          )}
        </View>
      </View>
    );
  }
}
