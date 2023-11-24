/** @format */

import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { Languages } from "@common";
import { SearchContainer } from "@containers";

export default class SearchScreen extends Component {
  static navigationOptions = () => ({
    title: Languages.Search,
    header: null,

    tabBarLabel: null,
  });

  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#fff", flex: 1 }}
        forceInset={{ top: "always" }}>
        <SearchContainer {...this.props} />
      </SafeAreaView>
    );
  }
}
