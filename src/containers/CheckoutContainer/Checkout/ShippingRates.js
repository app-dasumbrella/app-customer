/** @format */

import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import {
  updateCheckoutShippingLine,
  updateCheckoutShippingAddress,
} from "@redux/operations";
import { ShippingMethod } from "@components";
import { Languages, Config, Tools } from "@common";
import CouponInput from "./CouponInput";
import styles from "./styles";

const mapStateToProps = ({ carts, user }) => {
  return {
    shippingRates: carts.shippingRates,
    checkoutId: carts.checkoutId,
    shippingSelected: carts.shippingSelected,
    totalPrice: carts.totalPrice,
    couponApplied: carts.couponApplied,

    userInfo: user.userInfo,
  };
};

@connect(
  mapStateToProps,
  { updateCheckoutShippingLine, updateCheckoutShippingAddress }
)
export default class ShippingRates extends Component {
  componentDidMount() {
    const { shippingRates, shippingSelected } = this.props;
    // auto select address to get shipping method
    if (!shippingSelected && this._hasShippingRates()) {
      this._onSelectShippingMethod({ shippingRates });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      userInfo,
      checkoutId,
      totalPrice,
      shippingRates,
      couponApplied,
    } = this.props;
    if (nextProps.userInfo && userInfo) {
      if (userInfo.defaultAddress !== nextProps.userInfo.defaultAddress) {
        // update shipping address and shipping method when selected new address
        this._handleCheckoutUpdateAddress(nextProps.userInfo, checkoutId);
      }
    }

    if (nextProps.shippingRates !== shippingRates) {
      this._onSelectShippingMethod({
        shippingRates: nextProps.shippingRates,
      });
    }

    // update when apply coupon
    if (nextProps.totalPrice !== totalPrice && couponApplied) {
      this._onSelectShippingMethod({ shippingRates: nextProps.shippingRates });
    }
  }

  // update when user change address
  _handleCheckoutUpdateAddress = (userInfo, checkoutId) => {
    const shippingAddress = Tools.getAddress(userInfo.defaultAddress);
    this.props.updateCheckoutShippingAddress({
      checkoutId,
      shippingAddress,
    });
  };

  // update shipping method
  _onSelectShippingMethod = ({ item, shippingRates }) => {
    const shippingRate = item || (shippingRates && shippingRates[0]);
    if (shippingRate) {
      const { checkoutId } = this.props;
      this.props.updateCheckoutShippingLine({
        checkoutId,
        handle: shippingRate.handle,
      });
    }
  };

  _isExistedShippingSelected = (item) => {
    const { shippingSelected } = this.props;
    return shippingSelected && shippingSelected.handle === item.handle;
  };

  _hasShippingRates = (nextProps) => {
    const { shippingRates } = nextProps || this.props;
    return shippingRates && shippingRates.length > 0;
  };

  render() {
    const { shippingRates, shippingSelected } = this.props;
    if (
      !Config.shipping.visible ||
      !shippingRates ||
      (shippingRates && shippingRates.length === 0)
    )
      return null;

    return (
      <View style={{ flex: 1, marginBottom: 5 }}>
        <View style={styles.headerRow}>
          <Text style={styles.label}>
            {Languages.ShippingType.toUpperCase()}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.shippingMethod}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {shippingRates.map((item, index) => {
            const onPress = () => {
              if (!this._isExistedShippingSelected(item)) {
                this._onSelectShippingMethod({ item });
              }
            };
            return (
              <ShippingMethod
                key={index.toString()}
                title={item.title}
                price={Tools.getPrice(item.price)}
                handle={item.handle}
                onPress={onPress}
                selected={
                  shippingSelected && item.handle === shippingSelected.handle
                }
              />
            );
          })}
        </ScrollView>
        <CouponInput />
      </View>
    );
  }
}
