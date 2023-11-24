/** @format */

import React, { Component } from "react";
import { Color, Images, Styles } from "../common/index";
import TabBarIconContainer from '../containers/TabBarIconContainer'
import CategoryContainer from '../containers/CategoryContainer/index'
import { NavBarLogo, NavBarBack, NavBarCart } from "../components/index";

export default class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: NavBarBack({ navigation }),
    headerRight: NavBarCart(),
    tabBarIcon: ({ tintColor }) => (
      <TabBarIconContainer
        css={{ width: 18, height: 18 }}
        icon={Images.IconCategory}
        tintColor={tintColor}
      />
    ),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.headerStyle,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  render() {
    return <CategoryContainer {...this.props} />;
  }
}
