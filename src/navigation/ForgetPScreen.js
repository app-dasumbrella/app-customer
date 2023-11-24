/** @format */

import React, { Component } from "react";
import ForgetPContainer from "../containers/ForgetPContainer";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarCart, NavBarLogo } from "@components";
import { SafeAreaView } from 'react-native'

export default class ForgetPScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarCart(),
    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <ForgetPContainer statusBar />
    </SafeAreaView>
  }
}
