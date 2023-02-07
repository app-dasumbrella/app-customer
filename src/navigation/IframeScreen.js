/** @format */

import React, { Component } from "react";
import { Color, Styles, Languages } from "@common";
import { NavBarClose, NavBarCart, NavBarLogo } from "@components";
import { SafeAreaView } from 'react-native'
import { IframeContainer } from "@containers";

export default class IframeScreen extends Component {


  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <NavBarLogo />
      <IframeContainer statusBar />
    </SafeAreaView>
  }
}
