/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { addToCart } from "@redux/operations";
import { getDefaultProductVariant } from "@redux/selectors";
import { Button } from "@components";
import { Constants, Color } from "@common";

const mapStateToProps = (state, props) => ({
  defaultProductVariant: getDefaultProductVariant(props.product),
  checkoutId: state.carts.checkoutId,
  total: state.carts.total,
  cartItems: state.carts.cartItems,
});

@withTheme
@connect(mapStateToProps, { addToCart })
export default class AddToCartIconContainer extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    size: 20,
    show: false,
  };

  _addToCart = () => {
    const {
      addToCart,
      product,
      checkoutId,
      total,
      defaultProductVariant,
      cartItems, navigation
    } = this.props;

    // if (total < Constants.LimitAddToCart) {

    addToCart(
      { cartItems, product, selectedVariant: defaultProductVariant },
      (data) => {
        if (data && !data.error) {
          navigation.navigate("CartScreen");
        }
      }
    );

    // } else {
    //   alert(Languages.ProductLimitWaring);
    // }
  };

  render() {
    const { theme } = this.props;
    if (!Constants.ShowQuickCart && !this.props.show) return null;
    return (
      <Button
        type="icon"
        transparent
        icon={
          <Icon
            name="ios-cart-outline"
            size={this.props.size}
            color={theme.primaryColor}
          />
        }
        onPress={this._addToCart}
      />
    );
  }
}
