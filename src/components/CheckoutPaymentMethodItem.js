/** @format */

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  I18nManager,
  TouchableOpacity,
} from "react-native";
import { Images, Constants, Color } from "@common";
import { Button } from "@components";
import SvgUri from "react-native-svg-uri";
import Icon from "react-native-vector-icons/Entypo";

export default class CheckoutPaymentMethodItem extends Component {
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
  render() {
    const { showtext, index, item, showbox, selectedIndex, type, onPress, showitem3 } = this.props;
    return (
      <View style={styles.optionContainer} >
        <TouchableOpacity style={styles.rowst} onPress={onPress}>
          <Icon
            style={[
              styles.icon,
              I18nManager.isRTL && {
                transform: [{ rotate: "180deg" }],
              },
              {
                marginLeft: -15,
              },
            ]}
            color="#000"
            size={22}
            name={
              type != item.title ? "chevron-small-right" : "chevron-small-down"
            }
          />
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
        {type == item.title && showbox && (
          <View>
            <View style={styles.card}>
              <Text style={styles.head}>{"Card Number"}</Text>
              <TextInput
                placeholder={"**** **** **** ****"}
                keyboardType={'phone-pad'}
                value={this.state.number}
                style={styles.inputStyle}
                maxLength={16}
                onChangeText={(text) => this.setState({ number: text })}

              />
            </View>
            <View style={styles.card}>
              <Text style={styles.head}>{"Name on card"}</Text>
              <TextInput
                placeholder={"FULL NAME"}
                value={this.state.name}
                style={styles.inputStyle}

                onChangeText={(text) => this.setState({ name: text })}

              />
            </View>
            <View style={[styles.rowst, { justifyContent: 'space-between' }]}>
              <View style={{ width: '40%' }}>
                <Text style={styles.head}>{"Expiration month"}</Text>
                <TextInput
                  placeholder={"MM"}
                  value={this.state.expiry}
                  style={styles.inputStyle}
                  maxLength={2}
                  onChangeText={(text) => this.setState({ expiry: text })}
                />
              </View>
              <View style={{ width: '40%' }}>
                <Text style={styles.head}>{"Expiration year"}</Text>
                <TextInput
                  placeholder={"YYYY"}
                  value={this.state.cvc}
                  style={styles.inputStyle}
                  keyboardType={'phone-pad'}
                  onChangeText={(text) => this.setState({ cvc: text })}

                  maxLength={4}
                />
              </View>
            </View>
            <View  >
              <Text style={styles.head}>{"Security code"}</Text>
              <TextInput
                placeholder={"***"}
                value={this.state.cvc}
                style={styles.inputStyle}
                keyboardType={'phone-pad'}
                onChangeText={(text) => this.setState({ cvc: text })}

                maxLength={3}
              />
            </View>
          </View>
        )}
        {type == item.title && showtext && <View>
          <Text style={styles.text2}>
            Installment: {item.installment}
          </Text>
          <Text style={styles.text2}>
            Every {item.recurring} of Month
          </Text>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionContainer: {
    ///justifyContent: "center",
    //alignItems: "center",
    //  flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  rowst: {
    flexDirection: "row",
  },
  card: {
    marginBottom: 10
  },
  head: {
    fontFamily: Constants.fontFamilyBold,
    color: Color.blackTextPrimary,
    marginTop: 5
  },
  inputStyle: {
    borderWidth: 0.5,
    borderColor: Color.gray,
    borderRadius: 5,
    marginVertical: 5,
    height: 45
  },
  btnOption: {
    width: 80,
    height: 80,
    marginLeft: 5,
  },
  selectedBtnOption: {
    backgroundColor: "rgba(206, 215, 221, 0.6)",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6,
  },
  imgOption: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
  text: {
    fontFamily: Constants.fontFamilyBold,
    color: Color.blackTextPrimary,
  },
  text2: {
    fontFamily: Constants.fontHeader,
    color: Color.blackTextPrimary,
    marginVertical: 5
  },
});
