/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import { View, ScrollView, Image, I18nManager } from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "@redux/actions";
import { Styles, Config, Tools } from "@common";
import { Text, DrawerButton } from "@components";
import styles from "./styles";

/**
 * TODO: refactor
 */
const mapStateToProps = ({ user, netInfo }) => ({
  userInfo: user.userInfo,
  netInfo, // auto reload when netInfo change, also fix reload menu to change language
});

@connect(
  mapStateToProps,
  { logoutUser }
)
export default class DrawerDefault extends Component {
  constructor(props) {
    super(props);

    // Config Menu
    this._updateListMenu(props.userInfo);
  }

  /**
   * Update when logged in
   */
  componentWillReceiveProps(nextProps) {
    const { userInfo } = nextProps;

    this._updateListMenu(userInfo);
  }

  _updateListMenu = (userInfo) => {
    if (userInfo) {
      this.buttonList = [

      ];
    } else {
      this.buttonList = [

      ];
    }
  };

  _handlePress = (item) => {
    const { goToScreen } = this.props;
    if (item.text === "Logout") {
      this.props.logoutUser();
    } else {
      goToScreen(item.routeName, item.params, item.isReset);
    }
  };

  render() {
    const { userInfo } = this.props;
    const avatar = Tools.getAvatar(userInfo);
    const name = Tools.getName(userInfo);

    return (
      <View style={styles.container}>
        <View style={[styles.avatarContainer, Styles.Common.ColumnCenter]}>
          <Image
            source={avatar}
            style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
          />

          <View style={styles.textContainer}>
            <Text style={styles.fullName}>{name}</Text>
            <Text style={styles.email}>{userInfo ? userInfo.email : ""}</Text>
          </View>
        </View>
        <ScrollView>
          {this.buttonList.map((item, index) => (
            <DrawerButton
              onPress={() => this._handlePress(item)}
              key={index.toString()}
              {...item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
