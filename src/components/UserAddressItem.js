/** @format */

import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Color, Languages, Constants, Images } from "@common";
import { Button } from "@components";
import { moderateScale } from "react-native-size-matters";
/**
 * TODO: refactor
 */
export default class ShippingAddressItem extends Component {
  static defaultProps = {
    selected: false,
  };

  render() {
    const { primaryColor, selected, onPress, address, onPressEdit, onPressRemove, style, state_enabled, city_enabled } =
      this.props;

    let fulladdress =
      address.billing_address && address.billing_address.split(",");

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, style, selected && { backgroundColor: '#1c2e4a' }]}>
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.textContainer,

            ]}
          >
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address?.address?.name}
            </Text>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address.phone_number}
            </Text>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address?.address?.address1}
            </Text>
            {state_enabled == "yes" && <Text style={[styles.text, selected && styles.textSelected]}>
              {address?.address?.city} {address?.address?.state}{" "}
            </Text>}
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address?.address?.zipcode}
            </Text>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {address?.address?.country}
            </Text>
          </TouchableOpacity>
          <View style={styles.rightAction}>
            {/* {selected && (
              <Button
                text={Languages.Actived.toUpperCase()}
                transparent
                type="text"
                textStyle={{ color: "#ed6d03" }}
                style={{ marginBottom: 10 }}
              />
            )} */}
            {/* {selected && <Button
              onPress={onPressEdit}
              icon={
                <Image
                  style={{ width: moderateScale(20), height: moderateScale(25) }}
                  source={Images.icons.penciloutline}
                  resizeMode={'contain'}
                />
              }
              transparent
              type="icon"
              textStyle={{ color: primaryColor }}
            />} */}
            {/* {!selected && <Button
              onPress={onPressEdit}
              icon={
                <Image
                  style={{ width: moderateScale(20), height: moderateScale(25) }}
                  source={Images.icons.pencil}
                  resizeMode={'contain'}
                />
              }
              transparent
              type="icon"
              textStyle={{ color: primaryColor }}
            />} */}
            {onPressRemove && !selected && (
              <Button
                onPress={onPressRemove}
                icon={
                  <Image
                    style={{ width: moderateScale(25), height: moderateScale(25) }}
                    source={Images.icons.del}
                    resizeMode={'contain'}
                  />
                }
                style={{ marginTop: 10 }}
                transparent
                type="icon"
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.green,
    backgroundColor: "#FFF",
    elevation: 3,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: moderateScale(10)
  },
  rightAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 20,
  },
  icon: {
    alignSelf: "center",
    marginTop: 10,
  },
  iconRemove: {
    alignSelf: "center",
  },
  content: {
    // borderRadius: 12,
  },
  selected: {
    alignItems: "center",
    height: 20,
    marginBottom: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    width: '75%',
    paddingVertical: 5,
  },
  textSelectedContainer: {
    marginLeft: 18,
  },
  edit: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textEdit: {
    color: Color.yellow,
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "transparent",
    color: Color.TextDefault,
    fontFamily: Constants.fontFamily,
  },
  textSelected: {
    color: 'white'
  },
});
