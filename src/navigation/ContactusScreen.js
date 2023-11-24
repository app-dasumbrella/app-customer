/** @format */

import React, { Component } from "react";
import { ContactusContainer } from "@containers";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarEmpty } from "@components";

export default class ContactusScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: NavBarClose({ navigation }),
    headerRight: NavBarEmpty(),
    headerTitle: NavBarTitle({ title: 'Contact Us' }),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <ContactusContainer statusBar />;
  }
}
