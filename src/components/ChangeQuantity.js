/** @format */

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Constants, Color } from "@common";
import { connect } from "react-redux";
import { moderateScale } from 'react-native-size-matters'
const mapStateToProps = (state, props) => {
  return {
    app: state.app && state.app.settings,
  };
};
@connect(mapStateToProps, {

})
export default class ChangeQuantity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.props.quantity) {
      this.setState({ quantity: nextProps.quantity });
    }
  }

  increase = () => {
    if (this.state.quantity < Constants.LimitAddToCart) {
      this.props.onChangeQuantity(this.state.quantity + 1);
    }
  };

  reduced = () => {
    if (this.state.quantity > 1) {
      this.props.onChangeQuantity(this.state.quantity - 1);
    }
  };

  render() {
    const { app } = this.props;
    let { currency, theme, } = app || {};
    let { numberFormat, shop, primaryColor } = theme || {};
    const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style={[styles.btnDown, { backgroundColor: primaryColor }]}
          hitSlop={hitSlop}
          onPress={this.reduced}>
          <Text style={styles.text2}>-</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.quantity}</Text>
        <TouchableOpacity
          style={[styles.btnUp, { backgroundColor: primaryColor }]}

          hitSlop={hitSlop}
          onPress={this.increase}>
          <Text style={styles.text2}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
ChangeQuantity.defaultProps = {
  quantity: 1,
  onChangeQuantity: () => { },
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    alignItems: "center",
    borderRadius: 15,
    flexDirection: 'row',
    marginHorizontal: 20

  },
  text: {
    fontSize: moderateScale(18),
    // fontFamily: Constants.fontFamily,
    color: Color.blackTextPrimary,
    marginVertical: 10
  },
  text2: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: 'white'
  },
  btnUp: {
    height: moderateScale(32),
    borderRadius: 50,
    width: moderateScale(32),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  btnDown: {
    height: moderateScale(32),
    borderRadius: 50,
    width: moderateScale(32), justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
});
