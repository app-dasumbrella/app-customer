/** @format */

import React, { Component } from "react";
import HomeContainer from "../containers/HomeContainer/index";
import { NavBarMenu, NavBarCart, NavBarLogo } from "../components/index";
import { Styles } from "@common";
import { SafeAreaView } from 'react-native'

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: NavBarMenu(),
      headerRight: NavBarCart(),


      headerStyle: Styles.Common.headerStyle,
      headerTitleStyle: Styles.Common.headerTitleStyle,
    };
  };

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <HomeContainer {...this.props} />
    </SafeAreaView>
  }
}
