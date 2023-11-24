/** @format */

import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import Payment from "../containers/CheckoutContainer/Payment";
import { HeaderWithImage, NavBarClose, NavBarCart, NavBarLogo } from "@components";
import { Languages, Color, Styles } from "@common"

export default class PaymentScreen extends Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavBarLogo />
        <Payment {...this.props} />
      </SafeAreaView>
    );
  }
}
