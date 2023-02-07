/** @format */

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { isFunction } from "lodash";
import { Color, Tools, Constants } from "@common";
import { moderateScale } from "react-native-size-matters";

export default class CheckoutProductItem extends Component {
  _handlePress = () => {
    if (isFunction(this.props.onPress)) {
      this.props.onPress();
    }
  };

  render() {
    const { item, name, price, quantity, addon, app, lists1, variant } =
      this.props;
    let { currency, theme } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    let producttitle = lists1?.filter((po) => po.id == item?.product?.id);
    let prodindex = producttitle?.[0]?.variants?.findIndex(
      (b) => b?.id == variant?.id
    );
    let language = { code: "en" };
    return (
      <View style={{ marginBottom: 15 }}>
        <View style={styles.container} onPress={this._handlePress}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {name}{" "}
              {item.variant &&
                item.variant.selectedOptions &&
                item.variant.selectedOptions[0] &&
                item.variant.selectedOptions[0].name?.toLowerCase() == "color"
                ? `${language?.code != "en"
                  ? producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label_alt
                  : producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label
                } `
                : `${language?.code != "en"
                  ? producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label_alt
                  : producttitle?.[0]?.options?.[0]?.values?.[prodindex]
                    ?.label
                }${language?.code != "en"
                  ? producttitle?.[0]?.options?.[0]
                    ?.values?.[prodindex]?.value_alt
                  : producttitle?.[0]?.options?.[0]
                    ?.values?.[prodindex]?.value
                }`}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            {<Text style={styles.price}>{quantity}x </Text>}

            <Text style={{
              color: "black",
              fontWeight: "bold",
              fontSize: moderateScale(14),
              textAlign: 'left',

              fontFamily: Constants.fontFamilyBold,
            }}>
              {Tools.getPrice(price, number_of_decimals, currency)}
            </Text>
          </View>
        </View>
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
                <View style={styles.container}>
                  <View style={styles.titleContainer}>
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
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{add.quantity}x </Text>

                    <Text style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: moderateScale(14),
                      fontFamily: Constants.fontFamilyBold,
                      textAlign: 'left'
                    }}>
                      {Tools.getPrice(
                        add.sale_price,
                        number_of_decimals,
                        currency
                      )}
                    </Text>
                  </View>
                </View>
              );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1.3,
    flexWrap: "wrap",
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: "row",
    flex: 0.7,
    justifyContent: "space-between",
    textAlign: 'left',
    justifyContent: 'flex-end'
  },
  title: {
    color: `rgba(0,0,0,0.8)`,
    fontSize: 16,
    fontFamily: Constants.fontFamily,
  },
  price: {
    color: Color.Text,
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
  },
});
