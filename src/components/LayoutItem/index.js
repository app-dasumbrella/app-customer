/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Constants, Styles, Tools } from "@common";
import { connect } from "react-redux";

import MiniBanner from "./MiniBanner";
import Item from "./Item";

/**
 * TODO: refactore
 */

const mapStateToProps = (state, props) => {
  return {
    app: state.app && state.app.settings,
  };
};
@connect(mapStateToProps, {})
export default class LayoutItem extends Component {
  static propTypes = {
    layout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    layout: Constants.Layout.threeColumn,
  };

  _getProps = () => {
    const { onPress, product, index, imageURI, mode } = this.props || {};
    const size = this._getSizeItem();
    const { app } = this.props;
    let { currency, theme } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    let props = {};
    if (!product && imageURI) {
      props = {
        onPress,
        imageURI,
        size,
        index,
        mode,
      };
    } else {
      // //console.log(product,"product")
      const imageURI = Tools.getProductImage(
        (product &&
          product.gallery &&
          product.gallery[0] &&
          product.gallery[0].url) ||
        (product &&
          product.gallery &&
          product.gallery[0] &&
          product.gallery[0].img_url),
        Styles.window.width
      );
      const productPrice = `${Tools.getPrice(
        product &&
        product.variants &&
        product.variants[0] &&
        product.variants[0].sale_price,
        number_of_decimals,
        currency
      )} `;
      const productPriceSale = `${Tools.getPrice(
        product && product.regularPrice,
        number_of_decimals,
        currency
      )} `;

      props = {
        onPress,
        imageURI,
        title: product && product.title,
        product,
        productPrice,
        productPriceSale,
        index,
        size,
        ppp: mode,
      };
    }

    return props;
  };

  _getSizeItem = () => {
    return Styles.LayoutCard[`layout${this.props.layout}`];
  };

  render() {
    const { layout, mode } = this.props;
    const props = this._getProps();

    switch (layout) {
      case Constants.Layout.miniBanner:
        return <MiniBanner {...props} />;

      default:
        return <Item {...props} />;
    }
  }
}
