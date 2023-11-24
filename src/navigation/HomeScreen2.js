/** @format */

import React, { Component } from "react";
import HomeContainer2 from "../containers/HomeContainer2/index";
import { NavBarMenu, NavBarCart, NavBarLogo } from "../components/index";
import { Styles } from "@common";
import { SafeAreaView } from 'react-native'
export default class HomeScreen2 extends Component {
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
      <HomeContainer2 {...this.props} /></SafeAreaView>;
  }
}
