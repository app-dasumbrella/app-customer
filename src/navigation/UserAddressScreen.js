/** @format */

import React, { Component } from "react";
import UserAddressContainer from "../containers/UserAddressContainer";
import { Styles } from "@common";
import { NavBarMenu, NavBarCart, NavBarLogo } from "../components/index";
import { SafeAreaView } from 'react-native'

export default class UserAddressScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarMenu(),
    headerRight: NavBarCart(),


    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <UserAddressContainer {...this.props} />
    </SafeAreaView>
  }
}

