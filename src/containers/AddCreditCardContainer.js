/** @format */

import React, { Component } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import uuid from "uuid/v1";
//import CreditCard from "react-native-credit-card";
import { connect } from "react-redux";
import { addCreditCard, checkoutWithCreditcard } from "../redux/operations";
import { Button } from "../components";
import { Languages, Styles, Constants } from "../common";

const LIST = [
  { name: "number", value: "", header: "CARD NUMBER", maxLength: 16 },
  { name: "name", value: "", header: "CARD HOLDER'S NAME" },
  { name: "expiry", value: "", header: "EXPIRY", maxLength: 6 },
  { name: "cvc", value: "", header: "CVV/CVC NUMBER", maxLength: 3 },
];
const SWIPER_HEIGHT = 180;

const mapStateToProps = ({ payment, carts, user }) => {
  return {
    payments: payment.payments,
    isFetching: payment.isFetching,
    cardVaultUrl: payment.paymentSettings.cardVaultUrl,

    userInfo: user.userInfo,
    totalPrice: carts.totalPrice,
    checkoutId: carts.checkoutId,
  };
};

/**
 * TODO: refactor
 */
@connect(
  mapStateToProps,
  { addCreditCard, checkoutWithCreditcard }
)
export default class AddCrediCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: "number",
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      index: 0,
    };
  }

  componentDidMount() {
    this._focus(0);
  }

  _onPress = () => {
    if (this._isCompleted()) {
      this._handleSubmit();
    } else {
      let newIndex = this.state.index + 1;

      if (newIndex >= LIST.length) {
        newIndex = 0;
      }

      this.setState({ index: newIndex, focused: LIST[newIndex].name });
      this._focus(newIndex);
    }
  };

  _handleSubmit = () => {
    const expiryMaxLength = 6;
    const { cardVaultUrl, payments } = this.props;
    const { name, number, expiry, cvc } = this.state;
    const expiresMonth = `${expiry.slice(0, 2)}/${expiry.slice(
      2,
      expiryMaxLength
    )}`;
    const params = {
      payments,
      cardVaultUrl,
      creditCard: {
        firstName: "Dang",
        lastName: "Tran",
        creditCardNumber: number,
        expiresMonth,
        expiresYear: "2020",
        verificationCode: cvc,
      },
    };

    this._handlePayment(params);
  };

  _handlePayment = (params) => {
    this.props.addCreditCard(params).then((data) => {
      if (data) {
        try {
          const { checkoutId, userInfo, totalPrice } = this.props;
          const { defaultAddress } = userInfo;
          const payment = {
            amount: totalPrice,
            idempotencyKey: uuid(),
            billingAddress: {
              address1: defaultAddress.address1,
              address2: "123 abc",
              city: defaultAddress.city,
              company: "abc",
              country: defaultAddress.country,
              firstName: defaultAddress.firstName,
              lastName: defaultAddress.lastName,
              phone: defaultAddress.phone,
              province: defaultAddress.province,
              zip: defaultAddress.zip,
            },
            vaultId: data.id,
            test: true,
          };
          //console.log(payment);
          this.props.checkoutWithCreditcard({ checkoutId, payment });
        } catch (error) {
          console.warn(error);
        }
      }
    });
  };

  _isCompleted = () => {
    const { index, number, name, expiry, cvc } = this.state;
    return (
      index === LIST.length - 1 &&
      number !== "" &&
      name !== "" &&
      expiry !== "" &&
      cvc !== ""
    );
  };

  _focus = (index) => {
    this[LIST[index].name] && this[LIST[index].name].focus();
  };

  _onFocus = (index) => {
    let newIndex = index;

    if (newIndex >= LIST.length) {
      newIndex = 0;
    }

    this.setState({ index: newIndex, focused: LIST[newIndex].name });
  };

  _onChangeText = (text, card) => {
    this.setState({ [card]: text });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.card}>
          <Text style={styles.text}>{item.header}</Text>
          <TextInput
            ref={(comp) => (this[item.name] = comp)}
            value={this.state[item.name]}
            onFocus={() => this._onFocus(index)}
            onChangeText={(text) => this._onChangeText(text, item.name)}
            maxLength={item.maxLength}
          />
        </View>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id || index;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* <CreditCard
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              marginBottom: 0,
              elevation: 3,
              alignSelf: "center",
            }}
            imageFront={require("@images/card-front.png")}
            imageBack={require("@images/card-back.png")}
            shiny={false}
            bar={false}
            focused={this.state.focused}
            number={this.state.number}
            name={this.state.name}
            expiry={this.state.expiry}
            cvc={this.state.cvc}
          /> */}

          <FlatList
            ref={(comp) => (this.scrollview = comp)}
            data={LIST}
            renderItem={this._renderItem}
            horizontal
            contentContainerStyle={styles.formContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <Button
          style={Styles.Common.CheckoutButtonBottom}
          text={Languages.ConfirmPay}
          onPress={this._handlePayment}
          isLoading={this.props.isFetching}
          textStyle={Styles.Common.CheckoutButtonText}
          type="bottom"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Styles.window.width,
    height: Styles.window.height,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 30,
  },
  buttonBottom: {
    margin: 20,
  },
  wrapper: {
    height: SWIPER_HEIGHT,
  },
  slide: {
    height: SWIPER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // fontFamily: Constants.fontFamily,
  },
  card: {
    marginHorizontal: 5,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 3,
    elevation: 3,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: Styles.window.width - 70,
  },
});
