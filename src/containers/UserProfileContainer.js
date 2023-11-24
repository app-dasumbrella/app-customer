/** @format */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
// import { Updates } from "expo";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import { toggleNotification, changeCurrency } from "@redux/actions";
import { logoutUserAndCleanCart, handleChangeStore, getUserInfo } from "@redux/operations";
import {
  UserProfileHeader,
  UserProfileRowItem,
  // UserProfileButtonItem,
  ModalBox,
  CurrencyPicker,
} from "../components";
import UserProfileButtonItem from "../components/UserProfile/ButttoRow";
import { withTranslation } from 'react-i18next';
import { Languages, Tools, Constants } from "@common";
const mapStateToProps = ({ user, wishlist, app }) => ({
  wishlistTotal: wishlist.total,
  userInfo: user.userInfo,
  app,
  language: user.language,
  currency: app.currency,
  enableNotification: app.enableNotification,
  colorset: app && app.settings,

});

/**
 * TODO: refactor
 */
@withTheme
@withTranslation()
@connect(
  mapStateToProps,
  {
    toggleNotification,
    changeCurrency,
    logoutUserAndCleanCart,
    handleChangeStore,
    getUserInfo
  }
)
export default class UserProfileContainer extends Component {
  state = { dialogVisible: false, isChagingStore: false , isShowDeleteDialog:false,isShowLoader:false };
  /**
   * TODO: refactor to config.js file
   */
  _getListItem = () => {
    const {
      currency,
      wishlistTotal,
      userInfo,
      enableNotification,
      app,
      colorset
    } = this.props;
    let { theme, } = colorset || {};
    let { numberFormat, shop, primaryColor } = theme || {}
    let { settings, language } = app || {};
    let { t } = this.props
    const listItem = [
      // {
      //   label: `${Languages.WishList} (${wishlistTotal})`,
      //   routeName: "WishlistScreen",
      // },
      userInfo && {
        label: `${t('Addresses')} (${userInfo && userInfo.addresses && userInfo.addresses.data && userInfo.addresses.data.length || 0})`,
        routeName: "UserAddressScreen",
      },
      // userInfo && {
      //   label: t('Orders'),
      //   routeName: "MyOrders",
      // },
      // {
      //   label: Languages.Currency,
      //   value: currency.code,
      //   isActionSheet: false,
      // },
      // {
      //   label: 'Customer Care',
      //   routeName: ''
      // },
      // only support mstore pro
      {
        label: Languages.Languages,
        routeName: 'SettingScreen',
        value: language.lang,
      }
      // {
      //   label: Languages.PushNotification,
      //   icon: () => (
      //     <Switch
      //       onValueChange={this._handleSwitch}
      //       value={enableNotification}
      //       tintColor={Color.blackDivide}
      //     />
      //   ),
      // },
      // {
      //   label: Languages.contactus,
      //   routeName: "CustomPage",
      //   params: {
      //     id: 10941,
      //     title: Languages.contactus,
      //   },
      // },
      // {
      //   label: Languages.Privacy,
      //   routeName: "CustomPage",
      //   params: {
      //     id: 10941,
      //     title: Languages.Privacy,
      //   },
      // },
      // {
      //   label: Languages.About,
      //   routeName: "CustomPage",
      //   params: {
      //     url: "http://inspireui.com",
      //   },
      // },
    ];

    return listItem;
  };

  _handleSwitch = (value) => {
    this.props.toggleNotification(value);
  };

  _handlePress = (item) => {
    const { navigation } = this.props;
    const { routeName, isActionSheet } = item;
    if (routeName && !isActionSheet) {
      navigation.navigate(routeName, item.params);
    }

    if (isActionSheet) {
      this.currencyPicker.openModal();
    }
  };
 _showDeleteAccount = () => {
  this.setState({ isShowDeleteDialog: true });
 }
  _handlePressLogin = () => {
    if (this.props.userInfo) {
      this.props.logoutUserAndCleanCart();
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  _openAlert = () => {
    this.setState({ dialogVisible: true });
  };

  _handleOk = () => {
    if (this.props.shopId == this.state.shopId) {
      // this.setState({ dialogVisible: false });
      alert("Same secret code, please change another code");
    } else {
      this.setState({ isChagingStore: true });
      // this.props.handleChangeStore(this.state.shopId).then((data) => {
      //   if (data) {
      //     //console.log(`You entered ${this.state.shopId}`, data);
      //     setTimeout(() => {
      //       Updates.reload();
      //     }, 500);
      //   } else {
      //     this.setState({ isChagingStore: false });
      //   }
      // });
    }
  };
  
  _handleDeleteAccount = () => {
    this.setState({isShowDeleteDialog:false });
    setTimeout(() => {this.setState({isShowLoader:true})}, 1000);
    setTimeout(() => {this.setState({isShowLoader:false});
    setTimeout(() => {
      alert("Your account will be deleted in 7 days!");

    }, 1000);

  
  }, 3000);
  }
  render() {
    const { userInfo, currency, changeCurrency } = this.props;
    const name = userInfo?.data?.name || ''
    const listItem = this._getListItem();
    const { t, i18n, colorset } = this.props;
    let { theme } = colorset || {};
    let { numberFormat, shop, primaryColor } = theme || {}
    console.log(primaryColor)

    return (
      <View style={styles.container}>
        <ScrollView>
          <UserProfileHeader
            t={t}
            onPress={this._handlePressLogin}
            user={{
              ...userInfo,
              name,
            }}
            primaryColor={primaryColor}
          />
          {userInfo && (
            <View style={styles.profileSection}>
              {/* <Text style={styles.headerSection}>
                {Languages.AccountInformations.toUpperCase()}
              </Text> */}
              <UserProfileRowItem
                label={t("Name")}
                onPress={this._handlePress}
                value={name}
              />
              <UserProfileRowItem
                label={t("Email")}
                value={userInfo.email}
              />
            </View>
          )}

          <View style={styles.profileSection}>
            {listItem.map((item, index) => {
              return (
                item && (
                  <UserProfileRowItem
                    icon
                    key={index.toString()}
                    onPress={() => this._handlePress(item)}
                    {...item}
                  />
                )
              );
            })}
            {/* {!Constants.isDefaultStore && (
              <UserProfileRowItem
                icon
                label="Change store"
                onPress={this._openAlert}
              />
            )} */}
          </View>
          {userInfo && (
          <View style={styles.profileSection}>
              {/* <Text style={styles.headerSection}>
                {Languages.AccountInformations.toUpperCase()}
              </Text> */}
              {/* <UserProfileRowItem
                label={t("Delete my account")}
                onPress={this._showDeleteAccount}
              /> */}
              
               <UserProfileButtonItem
                label={"Delete my account"}
                onPress={this._showDeleteAccount}
              />
            </View>)}
        </ScrollView>

        <ModalBox ref={(c) => (this.currencyPicker = c)}>
          <CurrencyPicker currency={currency} changeCurrency={changeCurrency} />
        </ModalBox>

        {this.state.isChagingStore ? (
          <Dialog.Container visible={this.state.dialogVisible}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator
                color={primaryColor}
                style={{ marginBottom: 10 }}
              />
              <Text style={{ paddingBottom: 10 }}>Initializing...</Text>
            </View>
          </Dialog.Container>
        ) : (
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Enter your secret code</Dialog.Title>

            <Dialog.Input
              autoFocus
              value={this.state.shopId}
              onChangeText={(text) => {
                this.setState({ shopId: text });
              }}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                this.setState({ dialogVisible: false });
              }}
            />
            <Dialog.Button label="Ok" onPress={this._handleOk} />
          </Dialog.Container>
        )}
         <Dialog.Container visible={this.state.isShowDeleteDialog}>
            <Dialog.Title>Are you sure you want to delete your account?</Dialog.Title>

            <Dialog.Button
              label="Cancel"
              onPress={() => {
                this.setState({ isShowDeleteDialog: false });
              }}
            />
            <Dialog.Button label="Delete" onPress={this._handleDeleteAccount} />
          </Dialog.Container>
          {userInfo && (
         <Dialog.Container visible={this.state.isShowLoader}>
         <View style={{ alignItems: "center", justifyContent: "center" }}>
           <ActivityIndicator
             color={primaryColor}
             style={{ marginBottom: 10 }}
           />
          <Text style={{ paddingBottom: 10 }}>Loading...</Text>
         </View>
       </Dialog.Container>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileSection: {
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "600",
  },
});
