/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import MyOrdersContainer from "../containers/MyOrdersContainer";
import { NavBarMenu, NavBarLogo, NavBarCart } from "@components";
import { SafeAreaView } from "react-native";

export default class MyOrdersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({

    headerLeft: NavBarMenu({ navigation }),
    headerRight: NavBarCart(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <MyOrdersContainer {...this.props} />
    </SafeAreaView>
  }
}
