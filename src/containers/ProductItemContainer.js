/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import {
  updateCartItem,
  updateAddonCartItem,
  removeAddonCartItem,
  removeCartItem,
} from "@redux/operations";
import { ChangeQuantity, Rating } from "@components";
import { Tools, Color, Constants, Images } from "@common";
import { moderateScale } from "react-native-size-matters";
const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
const mapStateToProps = (state) => {
  return {
    checkoutId: state.carts.checkoutId,
    cartItems: state.carts.cartItems,
  };
};

@withNavigation
@connect(mapStateToProps, {
  updateCartItem,
  updateAddonCartItem,
  removeAddonCartItem,
  removeCartItem,
})
export default class ProductItemContainer extends Component {
  static propTypes = {
    viewQuantity: PropTypes.bool.isRequired,
    showImage: PropTypes.bool.isRequired,
    showRemove: PropTypes.bool.isRequired,
    showAddToCart: PropTypes.bool.isRequired,
    showWishlist: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    viewQuantity: false,
    showImage: false,
    showRemove: false,
    showAddToCart: false,
    showWishlist: false,
  };

  _onChangeQuantity = (quantity) => {
    const { product, variant, cartItems, cartId } = this.props;

    this.props.updateCartItem({
      cartItems,
      quantity,
      variant,
      product,
      cartId,
    });
  };

  _removeCartItem = () => {
    this.props.removeCartItem({
      cartItems: this.props.cartItems,
      cartId: this.props.cartId,
      variant: this.props.variant,
    });
  };

  _handlePress = () => {
    this.props.navigation.navigate("Detail", { item: this.props.product });
  };

  render() {
    const {
      product,
      quantity,
      viewQuantity,
      variant,
      showImage,
      showRemove,
      showAddToCart,
      showWishlist,
      navigation,
      showRating,
      addon,
      cartId,
      currency,
      updateAddonCartItem,
      cartItems,
      number_of_decimals,
      removeAddonCartItem,
      removeCartItem,
      lists1,
      statechange
    } = this.props;

    const item = product;

    const imageUrl =
      item.gallery && item.gallery.length ? item.gallery[0] : item.image;
    let producttitle = lists1?.filter((po) => po.id == item?.id);
    let prodindex = producttitle?.[0]?.variants?.findIndex(
      (b) => b?.id == variant?.id
    );
    let language = { code: "en" };
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showRemove && (
              <TouchableOpacity
                style={styles.btnRemove}
                hitSlop={hitSlop}
                onPress={() =>
                  removeCartItem({
                    cartId,
                    cartItems,
                    variant,
                  })
                }
              >
                <Image
                  resizeMode="contain"
                  source={Images.icons.close}
                  style={[{ width: moderateScale(15), marginRight: 10 }]}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={this._handlePress}>
              {showImage && (
                <Image
                  source={{
                    uri: Tools.getProductImage(
                      (imageUrl && imageUrl.url) ||
                      (imageUrl && imageUrl.img_url),
                      100
                    ),
                  }}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this._handlePress}
            style={{
              marginTop: 8,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>{producttitle?.[0]?.title}</Text>
            <Text style={styles.productVariant}>
              {variant &&
                variant.selectedOptions &&
                variant.selectedOptions[0] &&
                variant.selectedOptions[0]?.name?.toLowerCase() == "color"
                ? ` ${language?.code != "en"
                  ? producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label_alt
                  : producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label
                } `
                : ` ${language?.code != "en"
                  ? producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label_alt
                  : producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label
                } ${language?.code != "en"
                  ? producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.value_alt
                  : producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.value
                }`}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View style={styles.priceContainer}>
              <TouchableOpacity onPress={this._handlePress}>
                <Text style={styles.price}>
                  {Tools.getPrice(
                    variant?.sale_price == 0 ? variant?.regular_price : variant?.sale_price,
                    number_of_decimals,
                    currency
                  )}{" "}
                </Text>
              </TouchableOpacity>
            </View>
            {viewQuantity && (
              <ChangeQuantity
                quantity={quantity}
                onChangeQuantity={this._onChangeQuantity}
              />
            )}
          </View>
          <View style={{ alignSelf: "flex-end", marginTop: 5 }}>
            <Text style={styles.price}>
              {Tools.getPrice(
                variant?.sale_price == 0 ? variant?.regular_price : variant?.sale_price * quantity,
                number_of_decimals,
                currency
              )}{" "}
            </Text>
          </View>
          {variant?.sale_price != 0 && <View style={{ alignSelf: "flex-end", marginTop: -4 }}>
            <Text style={[styles.price, { fontWeight: '500', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>
              {Tools.getPrice(
                variant?.regular_price * quantity,
                number_of_decimals,
                currency
              )}{" "}
            </Text>
          </View>}
        </View>

        {
          <View style={{ width: "100%", marginBottom: 10 }}>
            {addon &&
              addon.map((add, adddindex) => {
                let producttitle2 = lists1?.filter(
                  (po) => po.id == add?.product?.id
                );
                let prodindex2 = producttitle2?.[0]?.variants?.findIndex(
                  (b) => b?.id == add?.id
                );

                if (add && add.sale_price)
                  return (
                    <View style={styles.content}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {showRemove && (
                          <TouchableOpacity
                            style={styles.btnRemove}
                            hitSlop={hitSlop}
                            onPress={() => {
                              removeAddonCartItem({
                                product,
                                variant,
                                cartItems,
                                add,
                                cartId,
                              });
                            }}
                          >
                            <Image
                              resizeMode="contain"
                              source={Images.icons.close}
                              style={[
                                { width: moderateScale(15), marginRight: 10 },
                              ]}
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={this._handlePress}>
                          {showImage && (
                            <Image
                              source={{
                                uri: Tools.getProductImage(
                                  add.product &&
                                  add.product.gallery &&
                                  add.product.gallery[0] &&
                                  add.product.gallery[0].url,
                                  100
                                ),
                              }}
                              style={styles.image}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={this._handlePress}
                        style={{
                          marginTop: 8,
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={styles.title}>
                          {"Addon"} : {producttitle2?.[0]?.title}{" "}
                          {add &&
                            add.details &&
                            add.details.types?.toLowerCase() != "color"
                            ? `${language?.code != "en"
                              ? producttitle2?.[0]?.options?.[0]
                                ?.values?.[prodindex2]?.label_alt
                              : producttitle2?.[0]?.options?.[0]
                                ?.values?.[prodindex2]?.label
                            } ${language?.code != "en"
                              ? producttitle2?.[0]?.options?.[0]
                                ?.values?.[prodindex2]?.value_alt
                              : producttitle2?.[0]?.options?.[0]
                                ?.values?.[prodindex2]?.value
                            }`
                            : language?.code != "en"
                              ? producttitle2?.[0]?.options?.[0]?.values?.[
                                prodindex2
                              ]?.label_alt
                              : producttitle2?.[0]?.options?.[0]?.values?.[
                                prodindex2
                              ]?.label}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <View style={styles.priceContainer}>
                          <TouchableOpacity onPress={this._handlePress}>
                            <Text style={styles.price}>
                              {Tools.getPrice(
                                add.sale_price,
                                number_of_decimals,
                                currency
                              )}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {viewQuantity && (
                          <ChangeQuantity
                            quantity={Number(add.quantity)}
                            onChangeQuantity={(e) => {
                              statechange()
                              updateAddonCartItem({
                                cartItems,
                                quantity: e,
                                variant: add,
                                product: add,
                                cartId,
                              });
                            }}
                          />
                        )}
                      </View>

                      <View style={{ alignSelf: "flex-end", marginTop: 5 }}>
                        <Text style={styles.price}>
                          {Tools.getPrice(
                            add?.sale_price * add?.quantity,
                            number_of_decimals,
                            currency
                          )}{" "}
                        </Text>
                      </View>
                      {/* {add?.regular_price != 0 && <View style={{ alignSelf: "flex-end", marginTop: -4 }}>
                        <Text style={[styles.price, { fontWeight: '500', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>
                          {Tools.getPrice(
                            add?.regular_price * add?.quantity,
                            number_of_decimals,
                            currency
                          )}{" "}
                        </Text>
                      </View>} */}
                    </View>
                  );
              })}
          </View>
        }
        {/* 
        <View style={styles.content}>
   
          <View
            style={[
              styles.infoView,
              { width: Dimensions.get("window").width - 180 },
            ]}
          >
           
           
          </View>
          
          {showAddToCart && (
            <View style={styles.addToCartIcon}>
              <AddToCartIconContainer
                navigation={navigation}
                show
                product={product}
                size={24}
              />
            </View>
          )}
          {showWishlist && (
            <WishListIconContainer
              product={product}
              style={styles.wishlistIcon}
            />
          )}
        </View> */}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#d4dce1",
  },
  content: {
    marginVertical: 10,
  },
  image: {
    width: moderateScale(175),
    height: moderateScale(120),
  },
  infoView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: Constants.fontFamily,
    color: "#212529",
  },
  priceContainer: {
    // flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    marginTop: 10,
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flexWrap: "wrap",
  },
  price: {
    fontSize: 16,
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
    marginBottom: 10,
  },
  productVariant: {
    fontSize: moderateScale(16),
    color: "#212529",
    fontFamily: Constants.fontFamily,
  },
  btnRemove: {
    justifyContent: "center",
    marginRight: 5,
  },
  addToCartIcon: {},
  wishlistIcon: {
    top: 40,
    right: -2,
  },
});
