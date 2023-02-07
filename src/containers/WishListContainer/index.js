/** @format */

import React, { Component } from "react";
import { Animated, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { emptyWishlistItem, removeWishlistItem } from "@redux/actions";
import { addAllToCart } from "@redux/operations";
import { Languages, Color } from "@common";
import ProductItemContainer from "../../containers/ProductItemContainer";
import { Button, AnimatedHeader } from "@components";
import WishlistEmpty from "./Empty";
import styles from "./styles";

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlist.list,
    checkoutId: state.carts.checkoutId,
    isFetching: state.carts.isFetching,
  };
};

@connect(
  mapStateToProps,
  { emptyWishlistItem, removeWishlistItem, addAllToCart }
)
export default class WishListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  onNext = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  moveAllToCart = () => {
    const { wishlistItems, checkoutId } = this.props;
    if (wishlistItems.length === 0) alert(Languages.EmptyAddToCart);
    else {
      this.props.addAllToCart({ list: wishlistItems, checkoutId });
    }
  };

  cleanAll = () => {
    this.props.emptyWishlistItem();
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  render() {
    const { wishlistItems } = this.props;
    const titleTransformY = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -43],
      extrapolate: "clamp",
    });

    if (wishlistItems.length === 0) {
      return <WishlistEmpty />;
    }
    return (
      <View style={styles.container}>
        {/* <AnimatedHeader
          scrollY={this.state.scrollY}
          label={Languages.WishList}
        /> */}

        <Animated.Text
          style={[
            styles.value,
            { transform: [{ translateY: titleTransformY }] },
          ]}>
          {wishlistItems.length}
          {wishlistItems.length > 1 ? Languages.Items : Languages.Item}
        </Animated.Text>

        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}>
          <View style={styles.list}>
            {wishlistItems &&
              wishlistItems.map((item, index) => {
                return (
                  <ProductItemContainer
                    key={index.toString()}
                    id={item.id}
                    product={item.product}
                    showImage
                    showAddToCart
                    showWishlist
                  />
                );
              })}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            text={Languages.CleanAll}
            style={[styles.button, { backgroundColor: Color.gray }]}
            textStyle={styles.buttonText}
            onPress={this.cleanAll}
          />
          <Button
            isLoading={this.props.isFetching}
            text={Languages.MoveAllToCart}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={this.moveAllToCart}
          />
        </View>
      </View>
    );
  }
}
