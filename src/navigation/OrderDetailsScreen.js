/** @format */

import React, { Component } from "react";
import { OrderContainer } from "@containers";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarEmpty, NavBarCart } from "@components";

export default class OrderDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarCart(),
    headerTitle: NavBarTitle({ title: "Order Details" }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <OrderContainer statusBar {...this.props} />;
  }
}
