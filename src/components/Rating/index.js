/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Color, Icons, Styles, Images } from "@common";
import { Icon } from "@app/Omni";
import { moderateScale } from "react-native-size-matters";

class Rating extends Component {
  render() {
    const { rating, size, color, style, notdisable, onPress, big } = this.props;
    const formatRating = Number(rating);
    const stars = [];
    for (let i = 1; i < 6; i++) {
      stars[i - 1] = (
        <TouchableOpacity disabled={!notdisable} onPress={() => onPress(i)}>
          <Image
            style={
              big ? {
                width: moderateScale(30), height: moderateScale(30), marginRight: 3,
                marginTop: 25
              } :
                { width: moderateScale(15), height: moderateScale(15), marginRight: 3 }}
            source={formatRating >= i ? Images.icons.starc : Images.icons.star}
          />
        </TouchableOpacity>
      );
    }

    return formatRating > 0 ? (
      <View style={[styles.container, style]}>{stars}</View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

Rating.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  rating: PropTypes.any,
};

// noinspection JSUnusedGlobalSymbols
Rating.defaultProps = {
  size: Styles.IconSize.SmallRating,
  color: Color.accent,
  rating: 5,
};

export default Rating;
