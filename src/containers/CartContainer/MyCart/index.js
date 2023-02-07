/** @format */

import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import {
  removeCartItem,
  checkoutLinkUser,
  updateCheckoutShippingAddress,
  removeAddonCartItem,
  clearcart,
} from "@redux/operations";
import ProductItemContainer from "../../../containers/ProductItemContainer";
import { Button, ShopButton } from "@components";
import { Languages, Tools, Styles } from "@common";
import styles from "./styles";
import { t } from "i18next";
import { moderateScale } from 'react-native-size-matters'
import { windowHeight } from "@containers/HomeContainer2";

const mapStateToProps = ({ carts, country, user, app }) => {
  return {
    cartItems: carts.cartItems,
    withoutA: carts.withoutA,
    totalPrice: carts.totalPrice,
    subtotalPrice: carts.subtotalPrice,
    checkoutId: carts.checkoutId,
    isFetching: carts.isFetching,
    app: app && app.settings,
    countries: country.list,
    accessToken: user.accessToken,
    userInfo: user.userInfo,
    list: app.productsettings.list,

  };
};

/**
 * TODO: improve later
 */
@withTheme
@connect(mapStateToProps, {
  removeCartItem,
  checkoutLinkUser,
  updateCheckoutShippingAddress,
  removeAddonCartItem,
  clearcart,
})
@withNavigation
export default class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changes: 0
    }
  }
  componentDidMount() {
    //  this.props.clearcart();
  }

  // componentWillReceiveProps(nextProps) {

  // }

  // if have user link account
  _linkUserWithCheckout = () => {
    const { accessToken, checkoutId } = this.props;
    return this.props
      .checkoutLinkUser({ accessToken, checkoutId })
      .then((data) => {
        return data;
      });
  };


  // check user existed and link user to checkout then update shipping address
  _onPress = () => {
    const {
      shippingAddress,
      shippingSelected,
      userInfo,
      navigation,
      checkoutFree,
    } = this.props;
    // if (!this.props.accessToken) {
    //   this.props.navigation.navigate("Login");
    // } else {
    //   this._linkUserWithCheckout().then((data) => {
    //     if (data && !data.error) {
    //       this._handleCheckoutUpdateAddress();
    // if (!userInfo) {
    this.props.navigation.navigate("CheckOut");
    // } else {
    //this?.props?.onChangeTab(this.props.index + 1);
    //}
    //   });
    // }
  };

  _handleCheckoutUpdateAddress = () => {
    const { userInfo, checkoutId } = this.props;
    if (userInfo && userInfo.defaultAddress) {
      const shippingAddress = Tools.getAddress(userInfo.defaultAddress);
      this.props.updateCheckoutShippingAddress({
        checkoutId,
        shippingAddress,
      });
    }
  };

  _getExistCoupon = () => {
    const { coupon } = this.state;
    const { couponCode, couponAmount, discountType } = this.props;
    return Tools.getCoupon(couponCode, couponAmount, coupon, discountType);
  };

  _removeCartItem = (product, add) => {
    const { cartItems } = this.props;
    this.props.removeCartItem({
      cartId: product,
      cartItems,
      variant: add,
    });
  };

  _removeAddonCartItem = ({ product, variant, add, cartId }) => {
    const { cartItems } = this.props;
    this.props.removeAddonCartItem({
      product,
      cartItems,
      variant,
      add,
      cartId,
    });
  };

  _hasCartItems = () => {
    return this.props.cartItems && this.props.cartItems.length > 0;
  };

  _handleNavigate = () => {
    this.props.navigation.navigate("Home");
  };

  _renderEmptyCart = () => {
    let { app } = this.props || {};
    let { theme } = app || {};
    let { primaryColor, shop } = theme || {};
    let { savings_bubble } = shop || {}
    return (
      <View>
        <Text style={styles.emptyText}>{t("Emptycart")}</Text>
        <ShopButton
          onPress={this._handleNavigate}
          style={[styles.button(this.props.theme), { backgroundColor: primaryColor, width: moderateScale(170) }]}
          text={t("RETUNRNSHOP")}
        />
      </View>
    );
  };

  render() {
    const { cartItems, list, subtotalPrice, totalPrice, withoutA } = this.props;
    let { app } = this.props || {};
    let { currency, theme } = app || {};
    let { numberFormat, primaryColor, shop } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    let { savings_bubble } = shop || {}
    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <View  >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[Styles.Common.CheckoutBoxScrollView,
            cartItems?.length == 1 && { height: windowHeight - moderateScale(50) }

            ]}
          >
            <View style={[styles.list, {
              marginBottom: moderateScale(150)
            }]}>
              {this._hasCartItems()
                ? cartItems.map((item, index) => {
                  const { product, variant, addon, cartId } = item;
                  return (
                    <ProductItemContainer
                      key={index.toString()}
                      viewQuantity
                      showImage
                      currency={currency}
                      number_of_decimals={number_of_decimals}
                      addon={addon}
                      showRemove
                      id={item.id}
                      product={product}
                      cartId={cartId}
                      variant={variant}
                      quantity={item.quantity}
                      attributes={item.attributes}
                      lists1={list}
                      statechange={() => {
                        this.setState({ changes: this.state.changes + 1 })
                      }}
                    />
                  );
                })
                : this._renderEmptyCart()}
            </View>

          </ScrollView>


          {this._hasCartItems() && (


            <Button
              reder={() => <View style={[styles.row, styles.summary, {
                backgroundColor: 'white',
                alignItems: 'center'
              }]}>
                {subtotalPrice == 0 && <View></View>}

                {subtotalPrice != 0 && <Animatable.Text animation="fadeInDown" style={[styles.sav, {
                  backgroundColor: savings_bubble?.background_color, borderRadius: moderateScale(16),
                  paddingLeft: moderateScale(12),
                  paddingRight: moderateScale(12),
                  paddingTop: moderateScale(8),
                  paddingBottom: moderateScale(8),
                  color: savings_bubble?.foreground_color


                }]}>
                  {Number(
                    ((Number(subtotalPrice) - Number(withoutA)) /
                      Number(subtotalPrice)) *
                    100
                  ).toFixed(0)}
                  % {t("Savings")}
                </Animatable.Text>}
                <View style={{ flexDirection: 'row' }}>
                  <Animatable.Text animation="fadeInDown" style={[styles.value, { fontWeight: '500', textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginRight: 5 }]}>
                    {Tools.getPrice(subtotalPrice, number_of_decimals, currency)}
                  </Animatable.Text>
                  <Animatable.Text animation="fadeInDown" style={[styles.value, { fontWeight: 'bold' }]}>
                    {Tools.getPrice(totalPrice, number_of_decimals, currency)}
                  </Animatable.Text>
                </View>
              </View>
              }
              style={[Styles.Common.CheckoutButtonBottom, { backgroundColor: primaryColor }]}
              text={t("Proceedcheckout")}
              onPress={this._onPress}
              isLoading={this.props.isFetching}
              textStyle={Styles.Common.CheckoutButtonText}
              type="bottom"
            />
          )}
        </View>

      </View>
    );
  }
}
