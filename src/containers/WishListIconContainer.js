/** @format */

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from "react-redux";
import { getIsWishlistSelector } from "@redux/selectors";
import { addWishlistItem, removeWishlistItem } from "@redux/actions";

const mapStateToProps = (state, props) => ({
  isWishlist: getIsWishlistSelector(state, props.product),
});

@connect(
  mapStateToProps,
  { addWishlistItem, removeWishlistItem }
)
export default class WishlistIconContainer extends Component {
  _toggleToWishlist = () => {
    const { product, isWishlist } = this.props;
    if (isWishlist) {
      this.props.removeWishlistItem(product);
    } else {
      this.props.addWishlistItem(product);
    }
  };

  render() {
    const { isWishlist, style } = this.props;

    return (
      <TouchableOpacity
        disabled={true}
        style={[styles.buttonStyle, style]}
        onPress={this._toggleToWishlist}>
        {/* {isWishlist && <Icon name="heart" size={20} color="red" />}
        {!isWishlist && (
          <Icon name="heart-o" size={20} color="#b5b8c1" />
        )} */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageButton: {
    width: 15,
    height: 15,
  },
  buttonStyle: {
    position: "absolute",
    right: 10,
    top: 5,
    zIndex: 9999,
  },
});
