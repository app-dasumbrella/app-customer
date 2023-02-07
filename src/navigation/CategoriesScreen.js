/** @format */

import React, { Component } from "react";
import { Color, Styles } from "@common";
import { NavBarLogo, NavBarMenu, NavBarCart } from "@components";
import CategoriesContainer from "../containers/CategoriesContainer";

export default class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarMenu(),
    headerRight: NavBarCart(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <CategoriesContainer {...this.props} />;
  }
}
