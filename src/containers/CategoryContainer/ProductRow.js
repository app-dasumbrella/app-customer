/**
 * Created by InspireUI on 06/03/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { Styles, Color, Constants, Tools, Config } from "@common";
import WishListIconContainer from '../../containers/WishListIconContainer'
import { Rating, ImageCache, Text } from "@components";
import { moderateScale, verticalScale } from "react-native-size-matters";

const mapStateToProps = (state) => {
  return {
    categoryLayoutMode: state.category.categoryLayoutMode,
    settings: state.app && state.app.settings,
    theme: state.app && state.app.theme && state.app.theme,
    app: state.app
  };
};

/**
 * TODO: refactor components
 */
@withTheme
@connect(mapStateToProps)
export default class ProductRow extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    categoryLayoutMode: PropTypes.string,
  };

  getcatgory = (id) => {
    let categoryName = "";
    id.filter((categoryID) => {
      let ct =
        this.props?.app?.categorysettings?.categories?.list.filter((item) => item.id == categoryID);

      if (ct && ct[0] && ct[0].name) {
        if (categoryName.length > 0) categoryName += ", ";
        categoryName += ct[0].name;
      }
    }
    );
    return categoryName;
  };
  render() {
    const { product, onPress, categoryLayoutMode, settings, rendersave } =
      this.props;
    let { currency, theme } = settings || {};
    let { primaryColor } = theme || {}

    let { numberFormat } = settings?.theme || {};
    let { number_of_decimals } = numberFormat || {};
    const isListMode =
      categoryLayoutMode === Config.CategoryLayout.ListMode ||
      categoryLayoutMode === Config.CategoryLayout.CardMode;
    const isCardMode = categoryLayoutMode === Config.CategoryLayout.CardMode;

    const textStyle = isListMode ? styles.text_list : styles.text_grid;
    const imageStyle = isListMode ? styles.image_list : styles.image_grid;
    const image_width = isListMode
      ? Styles.width * 0.9 - 2
      : Styles.width * 0.45 - 2;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          styles.container,
          isListMode ? styles.container_list : styles.container_grid,
        ]}
      >
        {rendersave()}

        <ImageCache
          uri={Tools.getProductImage(
            (
              product?.gallery?.[0]?.url) ||
            (product?.gallery?.[0]?.img_url),
            image_width
          )}
          style={[styles.image, imageStyle]}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={[styles.text_list1]} numberOfLines={2}>
            {this.getcatgory(product?.categories)}
          </Text>
          <Text style={[textStyle, isCardMode && styles.cardText, { marginVertical: 5, color: '#777777' }]} numberOfLines={2}>
            {product && product.title}
          </Text>

          <View
            style={{
              flexDirection: isCardMode ? "column" : "row",
              justifyContent:
                categoryLayoutMode === Config.CategoryLayout.ListMode
                  ? "space-between"
                  : "flex-start",
              alignItems: isCardMode ? "center" : "flex-start",
              marginTop: 4,
            }}
          >
            <View
              style={[styles.price_wrapper, !isListMode && { marginTop: 0 }]}
            >

              <Text
                style={[
                  textStyle,
                  styles.salePrice,
                  isCardMode && styles.cardPriceSale,
                ]}
              >
                {product && product?.variants[0]?.sale_price > 0
                  ? Tools.getPrice(product?.variants?.[0]?.regular_price, number_of_decimals,
                    currency)
                  : ""}
              </Text>
              <Text
                style={[
                  textStyle,
                  styles.price,
                  isCardMode && styles.cardPrice,
                  !isListMode && { color: Color.blackTextSecondary },
                  { marginLeft: 5, color: primaryColor }
                ]}
              >
                {`${Tools.getPrice(
                  product?.variants?.[0]?.sale_price,
                  number_of_decimals,
                  currency
                )} `}
              </Text>

              {/* {product && product.variants[0].sale_price > 0 && (
                <View style={styles.saleWrap(theme)}>
                  <Text style={[textStyle, styles.sale_off]}>
                    {Tools.getPriceDiscount(product)}
                  </Text>
                </View>
              )} */}
            </View>

            {isListMode && (
              <View style={styles.price_wrapper}>
                {/* <Rating
                  rating={Number(
                    product &&
                    product.reviews &&
                    product.reviews[0] &&
                    product.reviews[0].rating
                  )}
                  size={
                    (isListMode
                      ? Styles.FontSize.medium
                      : Styles.FontSize.small) + 5
                  }
                /> */}
                {/* {product?.reviews?.length !== 0 && (
                  <Text
                    style={[
                      textStyle,
                      styles.textRating,
                      { color: Color.blackTextDisable },
                    ]}
                  >
                    {`(${product?.reviews?.length || '0'})`}
                  </Text>
                )} */}
              </View>
            )}
          </View>
        </View>
        {/** ** add wish list *** */}
        <WishListIconContainer product={product} />
      </TouchableOpacity>
    );
  }
}
console.log(Color.black, ' Color.black')
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
    marginHorizontal: moderateScale(15),
    marginTop: 10,
  },
  container_list: {
    width: Styles.width * 0.88,
    marginLeft: Styles.width * 0.06,
    marginRight: Styles.width * 0.05,
    marginTop: Styles.width * 0.08,
  },
  container_grid: {
    width: (Styles.width * 0.9) / 2,
    marginLeft: (Styles.width * 0.1) / 3,
    marginRight: 0,
    marginTop: (Styles.width * 0.1) / 3,
  },
  image: {
    marginBottom: 8,
  },
  image_list: {
    width: Styles.width * 0.88 - 2,
    height: verticalScale(210),
  },
  image_grid: {
    width: Styles.width * 0.45 - 2,
    height: Styles.width * 0.45 * Styles.thumbnailRatio,
  },
  text_list: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
    fontFamily: Constants.fontFamily,
    fontWeight: '600'
  },
  text_list1: {
    color: Color.black,
    fontSize: moderateScale(14),
    fontFamily: Constants.fontFamily,
    fontWeight: '400'
  },
  text_grid: {
    color: Color.black,
    fontSize: Styles.FontSize.small,
    fontFamily: Constants.fontFamily,
  },
  textRating: {
    fontSize: Styles.FontSize.small,
  },
  price_wrapper: {
    ...Styles.Common.Row,
    top: 0,
    alignItems: 'center'
  },
  cardWraper: {
    flexDirection: "column",
  },
  salePrice: {
    textDecorationLine: "line-through",
    color: Color.black,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Styles.FontSize.small,
  },
  cardPriceSale: {
    fontSize: 15,
    marginTop: 2,
    fontFamily: Constants.fontFamily,
  },
  price: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
    fontWeight: 'bold'
  },
  saleWrap: (theme) => ({
    borderRadius: 5,
    backgroundColor: theme.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  }),
  sale_off: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.small,
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: Constants.fontFamily,
  },
  btnWishList: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
});
