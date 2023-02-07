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

@connect(mapStateToProps, { applyCoupon, removeCoupon })
export default class CheckoutCounponInput extends Component {
  state = {
    couponCode: this.props.discountCode || "",
  };

  _handleCoupon = () => {
    const {
      checkoutId,
      setcoupans,
      cartItems,
      access_token,
      email,
      shipping_id,
      selectedShipping,
      site_token,
      customer_id,
      discountCodes, totalPrice
    } = this.props;
    let { couponCode } = this.state
    if (couponCode.length != 0) {
      let filDis = discountCodes?.filter(cop => cop?.code.toLowerCase() == couponCode.toLowerCase())
      if (couponCode && filDis?.length == 0) {
        applyCoupon(
          {
            coupans: couponCode,
            totalPrice: totalPrice,
            totalShipping: selectedShipping &&
              selectedShipping.cost
              ? selectedShipping &&
              selectedShipping.cost
              : 0,
            cartItems,
            access_token,
            email,
            site_token: site_token,
            customer_id: customer_id,
            shipping_id:
              selectedShipping && selectedShipping.id,
          },
          (er) => {
            console.log("error")
            if (er.error) {
              if (er.msg == "Token not found.") {
                // logoutUserAndCleanCart();
                // props.setModals(true);
              } else {
                //seterrors(er.msg);
              }
            } else {
              this.setState({ couponCode: "" });
              // seterrors("");
            }
          }
        );
      } else {
        seterrors(`${t("AlreadyApp")} ${coupans}`)
      }
    } else {
      seterrors(t("PECC"))
    }
  }
  // if (!this.props.couponApplied) {
  //   if (this.state.couponCode !== "") {
  //     this.props.applyCoupon({
  //       coupans: this.state.couponCode,
  //       cartItems,
  //       access_token,
  //       email,
  //       customer_id,
  //       shipping_id,
  //       site_token,
  //     });
  //     setcoupans("");
  //   }
  // } else {
  //   this.props.removeCoupon({ checkoutId });
  // }


  render() {
    const { discode, couponApplied, placeholder, couponFetching, extrastyle, updatestate } =
      this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.rowEmpty}>
          <TextInput
            value={discode}
            onChangeText={(couponCode) => {
              this.setState({ couponCode });
              updatestate(couponCode);
            }}
            editable={!couponApplied}
            placeholder={placeholder || Languages.CouponPlaceholder}
            autoCapitalize="characters"
            inputStyle={{
              borderWidth: 0.9,
              paddingLeft: 15,
            }}
          />

          {/* <Button
            onPress={this._handleCoupon}
            text={
              couponApplied
                ? Languages.remove.toUpperCase()
                : Languages.Add.toUpperCase()
            }
            textStyle={[
              couponApplied && {
                color: Color.error,
              },extrastyle]

            }
            isLoading={couponFetching}
            style={{ alignSelf: "center" }}
            transparent
            type="text"
          /> */}
        </View>
      </View>
    );
  }
}
