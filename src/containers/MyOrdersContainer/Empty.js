/** @format */

import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Languages, Images } from "@common";
import { ShopButton } from "@components";
import styles from "./styles";
import Button from "@components/Button/Button";
import { t } from "i18next";
import { moderateScale } from "react-native-size-matters";
@withNavigation
export default class MyOrdersEmpty extends Component {
  _handleNavigate = () => {
    this.props.navigation.navigate("CategoriesScreen");
  };

  render() {
    return (
      <View style={styles.emptyContainer}>
        {!this.props.userInfo?.LoggedUser ?
          <View style={styles.content}>


            <Button
              text={t("SIGN_IN")}
              onPress={() => { this.props.navigation.navigate("Login") }}
              style={{
                backgroundColor: this.props.primaryColor,
                width: "50%",
                paddingVertical: 10,
                marginVertical: 5,

                borderRadius: moderateScale(20)
              }}
            />
          </View>
          : <View style={styles.content}>
            {/* <View>
            <Image
              source={Images.IconOrder}
              style={styles.icon}
              resizeMode="contain"
            />
          </View> */}
            {/* <Text style={styles.titleEmpty}>{Languages.MyOrder}</Text> */}
            <Text style={[styles.message, {
              color: 'black',
              marginVertical: 20
            }]}>{this.props.text}</Text>

            {/* <ShopButton
              onPress={this.props.onReload}
              text={Languages.reload}
              style={{
                backgroundColor: "#ccc",
                marginTop: 20,
                width: 120,
                height: 40,
              }}
            /> */}
            <ShopButton onPress={this._handleNavigate} />

          </View>}

      </View>
    );
  }
}
