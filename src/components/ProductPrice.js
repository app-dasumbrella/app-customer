/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTheme } from "@callstack/react-theme-provider";
import { View, Text } from "react-native";
import { Tools, Constants, Color, Styles } from "@common";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
  return {
    app: state.app && state.app.settings,
  };
};
@withTheme
@connect(mapStateToProps, {})
export default class ProductPrice extends Component {
  static propTypes = {
    product: PropTypes.object,
    hideDisCount: PropTypes.bool,
    style: PropTypes.any,
  };

  render() {
    const { product, hideDisCount, style, theme } = this.props;
    const { app } = this.props;
    let { currency, } = app || {};
    let { numberFormat } = app.theme || {};
    let { number_of_decimals } = numberFormat || {};
    //console.log("PPPPPPPPP",product)
    return (
      <View style={[styles.priceWrapper, style]}>
        <Text style={[styles.textList, styles.price]}>
          {`${Tools.getPrice(product.variants && product.variants[0] &&
            product.variants[0].sale_price, number_of_decimals, currency)} `}
        </Text>
        {/* <Text style={[styles.textList, styles.salePrice]}>
          {Tools.getPrice(product.regularPrice,number_of_decimals,currency) }
        </Text> */}
        {hideDisCount ? (
          <View />
        ) : (
          <View style={styles.saleWrap(theme)}>
            <Text style={[styles.textList, styles.saleOff]}>
              {Tools.getPriceDiscount(product, number_of_decimals, currency)}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  priceWrapper: {
    flexDirection: "row",
  },
  textList: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
    // fontFamily: Constants.fontFamily,
  },
  salePrice: {
    textDecorationLine: "line-through",
    color: Color.blackTextDisable,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Styles.FontSize.tiny,
  },
  price: {
    color: Color.black,
    fontSize: Styles.FontSize.small,
    // fontFamily: Constants.fontFamily,
  },
  saleWrap: (theme) => ({
    borderRadius: 5,
    backgroundColor: theme.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  }),
  saleOff: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.small,
  },
};
