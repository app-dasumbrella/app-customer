/** @format */

import React, { Component } from "react";
// import { UserAddressFormContainer } from "@containers";
import UserAddressFormContainer from "../containers/UserAddressFormContainer";
import { Styles } from "@common";
import { NavBarMenu, NavBarCart, NavBarLogo } from "../components/index";

import { View, SafeAreaView, Alert, Text, StyleSheet } from "react-native";

export default class UserAddressFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarMenu(),
    headerRight: NavBarCart(),


    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return (<SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo close navigation={this.props.navigation} />
      <UserAddressFormContainer {...this.props} />
    </SafeAreaView>
    )
  }
}


