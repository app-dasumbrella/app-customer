/** @format */

import React, { Component } from "react";
import { View, FlatList, Alert, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { updateUserDefaultAddress, deleteUserAddress } from "@redux/operations";
import { UserAddressItem, Button } from "@components";
import { Languages, Styles, Constants, Color } from "@common";
import { getUserInfo } from "../redux/user/operations";
import { t } from "i18next";
const mapStateToProps = ({ user, app }) => {
  return {
    accessToken: user.accessToken,
    userInfo: user.userInfo,
    app: app && app.settings,
  };
};

@connect(mapStateToProps, {
  updateUserDefaultAddress,
  deleteUserAddress,
  getUserInfo,
})
export default class UserAddressContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: props.userInfo
        ? props?.userInfo?.addresses && props?.userInfo?.addresses?.data
        : [],
      defaultAddress: props.userInfo ? props.userInfo.defaultAddress : {},
    };
  }

  componentDidMount() {
    const { userInfo } = this.props;
    this?.props?.getUserInfo({
      access_token: userInfo.access_token,
      email: userInfo.email,
      customer_id: userInfo.data.id,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userInfo && nextProps.userInfo) {
      if (this.props.userInfo !== nextProps.userInfo) {
        const { userInfo } = nextProps;
        this.setState({
          addresses: userInfo?.addresses && userInfo?.addresses?.data,
          defaultAddress: userInfo.defaultAddress,
        });
      }
    }
  }

  _onSelect = (item) => {
    this.props.updateUserDefaultAddress({ address: item });
  };

  _onPressAddAddress = () => {
    this.props.navigation.navigate("UserAddressFormScreen");
  };

  _onPressEdit = (address) => {
    this.props.navigation.navigate("UserAddressFormScreen", { address });
  };

  /**
   * TODO: enhance later
   */
  _onPressRemove = (address) => {
    const { userInfo } = this.props;
    Alert.alert(
      "Are you sure?",
      "Do you want to remove the address?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            this.props.deleteUserAddress(
              {
                access_token: userInfo.access_token,
                email: userInfo.email,
                customer_address_id: address.id,
                customer_id: userInfo.customer_id,
              },
              () => {
                this.props.getUserInfo({
                  access_token: userInfo.access_token,
                  email: userInfo.email,
                  customer_id: userInfo.data.id,
                });
              }
            ),
        },
      ],
      { cancelable: false }
    );
  };

  _isLastItem = (index) => {
    return index === this.state.addresses?.length - 1;
  };

  _renderItem = ({ item, index }) => {
    let { app } = this.props || {};
    let { theme } = app || {};
    let { primaryColor } = theme || {};
    let { state_enabled, city_enabled, countries } = app || {};

    const { defaultAddress } = this.state;
    const selected = defaultAddress.id === item.id;
    const onSelect = () => {
      this._onSelect(item),
        this._onPressEdit(item)
    }
    const onPressEdit = () => this._onPressEdit(item);
    const onPressRemove = () => this._onPressRemove(item);
    //console.log(selected);
    return (
      <UserAddressItem
        address={item}
        onPress={onSelect}
        state_enabled={state_enabled} city_enabled={city_enabled}
        onPressEdit={onPressEdit}
        onPressRemove={onPressRemove}
        style={[
          styles.addressItem,
          this._isLastItem(index) && {
            borderBottomWidth: 0,
          },
        ]}
        primaryColor={primaryColor}
        selected={selected}
      />
    );
  };

  _renderEmpty = () => {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{Languages.EmptyAddress}</Text>
        </View>
        <View style={styles.bottomView}>
          <Button
            style={styles.button}
            text={Languages.AddAddress}
            onPress={this._onPressAddAddress}
          />
        </View>
      </View>
    );
  };

  render() {
    let { app } = this.props || {};
    let { currency, theme } = app || {};
    let { numberFormat, primaryColor } = theme || {};
    const { addresses } = this.state;
    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        {
          <View style={{ paddingHorizontal: '5%' }}>
            <Text style={Styles.Common.TextHeaders}>{t('MyAddresses')}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={Styles.Common.CheckoutBoxScrollView}
              data={addresses || []}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={<View style={{ height: 100 }}></View>}
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    alignContent: "center",
                    marginTop: 80
                  }}
                >
                  <Text style={{ color: "black", fontWeight: 'bold', fontSize: 18 }}>No address</Text>
                </View>
              }
            // extraData={this.state}
            />
          </View>
        }

        <Button
          style={[
            Styles.Common.CheckoutButtonBottom,
            { backgroundColor: primaryColor },
          ]}
          text={t('NewShipAdd')}
          onPress={this._onPressAddAddress}
          isLoading={this.props.isFetching}
          textStyle={Styles.Common.CheckoutButtonText}
          type="bottom"
        />
      </View>
    );

    return this._renderItem({ item: shippingAddress });
  }
}

const styles = StyleSheet.create({
  addressItem: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: "#d4dce1",
  },
  bottomView: {
    height: 44,
    borderTopWidth: 1,
    borderTopColor: "#f3f7f9",
    width: Styles.window.width,
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.BuyNowButton,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: Color.Text,
    //fontFamily: Constants.fontHeader,
  },
});
