/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { NavBarIcon } from "../components";
import { moderateScale } from 'react-native-size-matters'
const mapStateToProps = ({ carts, app }) => ({
  carts,
  appset: app && app.settings,

});

@withNavigation
@connect(mapStateToProps)
export default class CartIconContainer extends Component {
  render() {
    const { carts, navigation, appset } = this.props;
    const totalCart = carts.total;
    let { currency, theme, state_enabled } = appset || {};
    let { numberFormat, primaryColor, shop, secondaryColor, review } =
      theme || {};
    let { number_of_decimals } = numberFormat || {};
    let { cart, profile } = shop || {};
    let { icon } = cart || {};
    console.log(icon)
    return (
      <View
        style={[
          {
            paddingTop: moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
            alignSelf: 'center'
          },
        ]}
      >
        <NavBarIcon
          bubbletextstyle={{
            fontWeight: 'bold'
          }}
          bubblestyle={{
            backgroundColor: icon?.bubble_background_color
          }}
          style={{
            backgroundColor: icon?.background_color,
            marginRight: moderateScale(10),
            borderRadius: moderateScale(6),
            width: moderateScale(35),
            height: moderateScale(35),
            marginBottom: moderateScale(10)
          }}
          size={moderateScale(25)}
          icon={{ uri: icon?.image }}
          number={totalCart}
          onPress={() => navigation.navigate("CartScreen")}
        />
      </View>
    );
  }
}
