/** @format */

import React, { Component } from "react";
import { ContactusContainer } from "@containers";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarEmpty, NavBarLogo } from "@components";
import ReviewContainer from "../containers/ReviewContainer";
import { SafeAreaView } from 'react-native'

export default class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarEmpty(),
    headerTitle: NavBarTitle({ title: 'Review' }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <ReviewContainer statusBar />
    </SafeAreaView>
  }
}
