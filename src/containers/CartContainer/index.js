/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
// import ScrollableTabView from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { checkCheckout, getCountries, Verifypayment, clearcart, getOrderbyid } from "@redux/operations";
import { isObject, isEmpty } from "lodash";
import { Languages, Styles } from "@common";
import { StepIndicator, ModalWebView, Button } from "@components";

import MyCart from "./MyCart";

import styles from "./styles";

const STEPS_COMPLETE = [
  { label: Languages.MyCart },

  { label: Languages.Checkout },
  //  { label: "Payment" },
  { label: Languages.Finish },
];

const mapStateToProps = ({ app, carts, user, country }) => ({
  checkoutId: carts.checkoutId,
  cartItems: carts.cartItems,
  webUrl: carts.webUrl,
  app: app && app.settings,

  userInfo: user.userInfo,
  payment: app?.settings?.settings?.payment,
  countries: country.list,

});

@connect(mapStateToProps, { checkCheckout, getCountries, Verifypayment, clearcart, getOrderbyid })
@withNavigation
export default class CartContainer extends Component {
  static defaultProps = {
    cartItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      selecteddate: "",
      delivery: new Date(),
      coupans: "",
    };
  }



  render() {
    const { selecteddate, currentIndex, delivery, coupans, loader, error } = this.state;
    let { app } = this.props
    let { currency, theme } = app || {};
    let { numberFormat, primaryColor } = theme || {};
    return (
      <View style={styles.fill}>
        {/* <View style={styles.indicator}>
          <StepIndicator
            steps={STEPS_COMPLETE}
            onChangeTab={this._onChangeTabIndex}
            currentIndex={currentIndex}
            width={Styles.window.width - 40}
          />
        </View> */}

        <View style={styles.content}>
          {/* <ScrollableTabView
            ref={(tabView) => {
              this._tabCartView = tabView;
            }}
            locked
            onChangeTab={this._updatePageIndex}
            style={{ backgroundColor: "transparent" }}
            initialPage={0}
            tabBarPosition="overlayTop"
            prerenderingSiblingsNumber={1}
            renderTabBar={() => <View style={{ padding: 0, margin: 0 }} />}
          > */}
          {currentIndex == 0 && <MyCart onChangeTab={this._onChangeTabIndex} key="cart" index={0} />}
          {/* <Shipping
              onChangeTab={this._onChangeTabIndex}
              key="checkout"
              index={1}
            />  */}
          {/* {currentIndex == 1 && <Checkout
            onChangeTab={this._onChangeTabIndex}
            key="checkout"
            index={1}
            navigation={this.props.navigation}
            setdelivery={(e) => {
              this.setState({ delivery: e });
            }}
            setID={(e) => {
              this.setState({ orderid: e });
            }}
            selecteddate={selecteddate}
            setselecteddate={(e) => {
              this.setState({ selecteddate: e });
            }}
            setcoupans={(e) => {
              this.setState({ coupans: e });
            }}
          />} */}

          {/* <Payment
              onChangeTab={() => {
                console.log("sajskajsnkas assahjdshj");
              }}
              
              index={2}
              orderid={this.state.orderid}
              delivery={delivery}
              navigation={this.props.navigation}
              selecteddate={selecteddate}
              coupans={coupans}
            /> */}

          {/* {currentIndex == 2 || currentIndex == 3 && <FinishOrder
            key="finishOrder"
            onChangeTab={this._onChangeTabIndex}

            index={2}
            userInfo={this.props.userInfo}
            currentIndex={currentIndex}
            url={this.state.url}
            Verifypayment={this.props.Verifypayment}
            orderid={this.state.orderid}
            onShowPayment={this._onShowPayment}
            loader={loader}
            error={error}
          />} */}
          {/* </ScrollableTabView> */}
        </View>

      </View>
    );
  }
}
