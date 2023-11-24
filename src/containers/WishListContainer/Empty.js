/** @format */

import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Languages, Images } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";

@withNavigation
export default class PaymentEmpty extends Component {
  _handlePress = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Image
              source={Images.IconHeart}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{Languages.EmptyWishList}</Text>
          <Text style={styles.message}>{Languages.NoWishListItem}</Text>
        </View>

        <ShopButton onPress={this._handlePress} />
      </View>
    );
  }
}
