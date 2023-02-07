/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import { Languages, Tools } from "@common";
import { Button } from "@components";
import styles from "./styles";
import { moderateScale } from "react-native-size-matters";

export default class UserProfileHeader extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  render() {
    const { user, onPress, t, primaryColor } = this.props;
    const avatar = user && user.photo ? { uri: user.photo } : Tools.getAvatar(user);
    let split = user?.name.split(" ")
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {user.name != "" && <View style={{ width: moderateScale(70), height: moderateScale(70), backgroundColor: primaryColor, borderRadius: moderateScale(70), marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: moderateScale(20), fontWeight: 'bold' }}>{split?.[0]?.[0]}{split?.[1]?.[0] == undefined ? "" : split?.[1]?.[0]}</Text>
          </View>}
          {/* <Image source={avatar} style={styles.avatar} /> */}
          <View style={styles.textContainer}>
            <Text style={styles.fullName}>{user.name}</Text>
            {user &&
              user.address && (
                <Text style={styles.address}>{user.address}</Text>
              )}
          </View>
          <Button
            onPress={onPress}
            style={styles.button}
            textStyle={styles.textButton}
            type="text"
            transparent
            text={
              user?.access_token ? t("Logout")
                : t("SIGN_IN")
            }
          />
        </View>
      </View>
    );
  }
}
