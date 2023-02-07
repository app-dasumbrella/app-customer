/** @format */

import React, { Component } from "react";
import { Animated, View } from "react-native";
import { ProductColor } from "@components";
import { Tools } from "@common";
import { isObject } from "lodash";
import styles from "./styles";

const PRODUCT_IMAGE_HEIGHT = 300;
const COLOR = "COLOR";
export default class ProductDetailColorAttributes extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.selectedOptions === this.props.selectedOptions;
  // }

  _onSelectAttribute = (value) => {
    const { onSelect } = this.props;
    onSelect(COLOR, value);
  };

  render() {
    const { options, selectedOptions, scrollY } = this.props;
    // Limit 6 color attributes to fix UI issue
    if (
      !options ||
      (options && options.length < 2) ||
      (options && options > 6)
    ) {
      return <View />;
    }

    const translateY = scrollY.interpolate({
      inputRange: [0, PRODUCT_IMAGE_HEIGHT / 2, PRODUCT_IMAGE_HEIGHT],
      outputRange: [0, -PRODUCT_IMAGE_HEIGHT / 3, -PRODUCT_IMAGE_HEIGHT],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.productColorContainer, { transform: [{ translateY }] }]}>
        {options.map((option, index) => {
          const selectedValue = isObject(option) ? option.value : option;
          const onSelectAttribute = () => {
            this._onSelectAttribute(selectedValue);
          };
          return (
            <ProductColor
              key={index.toString()}
              color={Tools.getColor(selectedValue)}
              onPress={onSelectAttribute}
              selected={selectedOptions[COLOR] === selectedValue}
            />
          );
        })}
      </Animated.View>
    );
  }
}
