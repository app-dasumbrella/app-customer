/** @format */

import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import CartContainer from "../containers/CartContainer";
import { HeaderWithImage, NavBarClose, NavBarCart, NavBarLogo } from "@components";
import { Languages, Color, Styles } from "@common"

export default class CartScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarCart(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavBarLogo />
        <CartContainer {...this.props} />
      </SafeAreaView>
    );
  }
}
