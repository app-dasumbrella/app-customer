/** @format */

import React, { Component } from "react";
import { Languages, Color, Styles } from "@common";
import { WishListContainer } from "@containers";
import { NavBarTitle, NavBarBack, NavBarLogo } from "@components";

export default class WishListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({


    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <WishListContainer {...this.props} />;
  }
}
