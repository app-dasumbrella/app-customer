/** @format */

import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import FinishOrder from "../containers/CheckoutContainer/FinishOrder";
import { HeaderWithImage, NavBarClose, NavBarCart, NavBarLogo } from "@components";
import { Languages, Color, Styles } from "@common"

export default class FinishScreen extends Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavBarLogo />
        <FinishOrder {...this.props} />
      </SafeAreaView>
    );
  }
}
