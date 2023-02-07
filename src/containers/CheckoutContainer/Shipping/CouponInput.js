/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { applyCoupon, removeCoupon } from "@redux/operations";
import { TextInput, Button } from "@components";
import { Languages, Color } from "@common";
import styles from "./styles";

const mapStateToProps = ({ carts }) => {
  return {
    checkoutId: carts.checkoutId,
    couponFetching: carts.couponFetching,
    couponApplied: carts.couponApplied,
    discountCode: carts.discountCode,
  };
};

@connect(
  mapStateToProps,
  { applyCoupon, removeCoupon }
)
export default class CheckoutCounponInput extends Component {
  state = {
    couponCode: this.props.discountCode || "",
  };

  _handleCoupon = () => {
    const { checkoutId } = this.props;
    if (!this.props.couponApplied) {
      if (this.state.couponCode !== "") {
        this.props.applyCoupon({
          discountCode: this.state.couponCode,
          checkoutId,
        });
      }
    } else {
      this.props.removeCoupon({ checkoutId });
    }
  };

  render() {
    const { couponApplied, couponFetching } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.rowEmpty}>
          <TextInput
            value={this.state.couponCode}
            onChangeText={(couponCode) => this.setState({ couponCode })}
            editable={!couponApplied}
            placeholder={Languages.CouponPlaceholder}
            autoCapitalize="characters"
          />

          <Button
            onPress={this._handleCoupon}
            text={
              couponApplied
                ? Languages.remove.toUpperCase()
                : Languages.Add.toUpperCase()
            }
            textStyle={
              couponApplied && {
                color: Color.error,
              }
            }
            isLoading={couponFetching}
            style={{ alignSelf: "center" }}
            transparent
            type="text"
          />
        </View>
      </View>
    );
  }
}
