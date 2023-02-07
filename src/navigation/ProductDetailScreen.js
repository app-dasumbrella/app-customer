/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import { SafeAreaView } from 'react-native';
import ProductDetailContainer from "../containers/ProductDetailContainer";
import { NavBarClose, NavBarCart, NavBarLogo } from "@components";
export default class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarCart(),



    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <ProductDetailContainer {...this.props} />
    </SafeAreaView>

  }
}
