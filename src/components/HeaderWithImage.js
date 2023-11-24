/** @format */

/** @format */

import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView, withNavigation } from "react-navigation";
import { NavBarBack, NavBarTitle, NavBarEmpty } from "@components";
import { Styles } from "@common";

@withNavigation
export default class HeaderWithImage extends Component {
  _renderHeaderAction = () => {
    return (
      <View style={styles.navbarBack}>
        <View style={styles.row}>
          <NavBarBack
            navigation={this.props.navigation}
            imageStyle={{ tintColor: "#FFF" }}
          />
        </View>
        <View style={[styles.row, { alignItems: "center" }]}>
          <NavBarTitle title={this.props.title} style={styles.titleHeader} />
        </View>
        <View style={styles.row}>
          <NavBarEmpty />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={Styles.Common.CheckoutHeader}>
          <Image
            source={require("@images/checkout/header_cart.png")}
            style={Styles.Common.CheckoutHeaderBg}
          />
        </View>
        <SafeAreaView
          style={{ backgroundColor: "transparent", flex: 1 }}
          forceInset={{ top: "always", bottom: "never" }}>
          {this._renderHeaderAction()}
          {this.props.content}
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbarBack: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    height: 30,
  },
  titleHeader: {
    color: "#FFF",
  },
  row: {
    flex: 1 / 3,
  },
});
