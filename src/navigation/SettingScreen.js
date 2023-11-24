/** @format */

import React, { Component } from "react";

import { Languages, Styles, Color } from "@common";
import SettingsLang from "../containers/SettingsLang";
import { NavBarClose, NavBarLogo } from "@components";
import { SafeAreaView } from 'react-native'

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarClose({ navigation }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });
  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo close navigation={this.props.navigation} />
      <SettingsLang />
    </SafeAreaView>

  }
}
