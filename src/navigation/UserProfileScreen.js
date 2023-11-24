/** @format */

import React, { Component } from "react";
import UserProfileContainer from '../containers/UserProfileContainer'
import { NavBarLogo, NavBarMenu, NavBarCart } from "@components";
import { Color, Styles } from "@common";
import { SafeAreaView } from "react-native";

export default class UserProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({

    headerLeft: NavBarMenu({ navigation }),
    headerRight: NavBarCart(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <UserProfileContainer {...this.props} />
    </SafeAreaView>
  }
}
