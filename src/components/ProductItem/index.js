/** @format */

import React, { Component } from "react";
import { TouchableOpacity, Text, View, Image, Dimensions } from "react-native";
import { ChangeQuantity } from "@components";
import { Tools } from "@common";
import styles from "./styles";

export default class ProductItem extends Component {
  onChangeQuantity = (quantity) => {
    if (this.props.quantity < quantity) {
      this.props.addCartItem(this.props.product, this.props.variation);
    } else {
      this.props.removeCartItem(this.props.product, this.props.variation);
    }
  };

  render() {
    const { product, quantity, viewQuantity, variation, onPress } = this.props;
    const price =
      variation === null || variation === undefined
        ? product.price
        : variation.price;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: Tools.getProductImage(product && product.images[0].src, 100) }}
            style={styles.image}
          />
          <View
            style={[
              styles.infoView,
              { width: Dimensions.get("window").width - 180 },
            ]}>
            <TouchableOpacity onPress={() => onPress({ product })}>
              <Text style={styles.title}>{product.title}</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{Tools.getPrice(price)}</Text>
              {variation &&
                typeof variation.attributes !== "undefined" &&
                variation.attributes.map((variant) => {
                  return (
                    <Text key={variant.name} style={styles.productVariant}>
                      {variant.option}
                    </Text>
                  );
                })}
            </View>
          </View>
          {viewQuantity && (
            <ChangeQuantity
              style={styles.quantity}
              quantity={quantity}
              onChangeQuantity={this.onChangeQuantity}
            />
          )}
        </View>
      </View>
    );
  }
}
