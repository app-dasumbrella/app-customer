/** @format */

import React, { Component } from "react";
import SplashConatiner from "../containers/SplashConatiner";
import { Color, Styles, Languages } from "@common";
import { NavBarTitle, NavBarClose, NavBarEmpty } from "@components";

export default class SplashScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,



  });

  render() {
    return <SplashConatiner statusBar />;
  }
}
