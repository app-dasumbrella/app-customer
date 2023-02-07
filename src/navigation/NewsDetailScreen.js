/** @format */

import React, { Component } from "react";

import { Color, Styles } from "@common";
import NewsDetailContainer from "../containers/NewsDetailContainer";
import { NavBarClose, NavBarLogo, NavBarCart } from "@components";
import { SafeAreaView } from 'react-native'

export default class NewsDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({

    headerLeft: NavBarClose({ navigation }),
    tabBarVisible: false,
    headerRight: NavBarCart(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo close navigation={this.props.navigation} />
      <NewsDetailContainer {...this.props} />
    </SafeAreaView>
  }
}
