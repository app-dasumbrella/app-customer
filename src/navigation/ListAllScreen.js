/** @format */

import React, { Component } from "react";
import { Styles } from "@common";
import { NavBarBack, NavBarLogo } from "@components";
import { ListAllContainer } from "@containers";

/**
 * TODO: refactor
 */

export default class ListAllScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    return {
      headerLeft: NavBarBack({ navigation }),


      headerStyle: Styles.Common.headerStyle,
      headerTitleStyle: Styles.Common.headerTitleStyle,
    };
  };

  render() {
    return <ListAllContainer {...this.props} />;
  }
}
