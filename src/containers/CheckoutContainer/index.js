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

import Checkout from "./Checkout";
import FinishOrder from "./FinishOrder";
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
export default class Checkoutcontainer extends Component {
  static defaultProps = {
    cartItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1,
      selecteddate: "",
      delivery: new Date(),
      coupans: "",
    };
  }

  componentWillMount() {
    const { countries } = this.props;
    // if (!countries || isEmpty(countries)) {
    //   this.props.getCountries();
    // }
  }
  // componentWillUnmount() {
  //   this._updatePageIndex(0);
  //   this._onChangeTabIndex(0);
  // }

  // componentWillReceiveProps(nextProps) {
  //   // reset current index when update cart item
  //   if (this.props.cartItems && nextProps.cartItems) {
  //     if (nextProps.cartItems.length !== 0) {

  //       if (this.props.cartItems.length !== nextProps.cartItems.length) {
  //         this._updatePageIndex(0);
  //         this._onChangeTabIndex(0);
  //       }
  //     }
  //   }

  //   // if (this.props.userInfo !== nextProps.userInfo || !nextProps.userInfo) {
  //   //   console.log("NDNDNNDD NNNNNNNNNNNNNN ")

  //   //   this._updatePageIndex(0);
  //   //   this._onChangeTabIndex(0);
  //   // }
  // }
  componentDidMount() {
    this.setState({ currentIndex: 1 });
  }
  _renderPaymentModal = () => {
    const { webUrl, payment } = this.props;
    return (
      <ModalWebView
        ref={(modal) => (this._paymentModal = modal)}
        url={webUrl}
        payment={payment}
        onClosed={() => this._onClosedModalPayment()}
        orderid={this.state.orderid}
        onChangeTab={this._onChangeTabIndex}
        seturl={(e) => this.setState({ url: e })}
        callVerify={this._callVerify}
      />
    );
  };

  _callVerify = (url) => {
    let { getOrderbyid } = this.props || {}
    let newurl = url.replace(
      "https://shop.dev.originmattress.com.my/verify?",
      ""
    );
    let splits = newurl.split("=");
    let { email, access_token, defaultAddress } = this.props.userInfo || {};

    this.props.Verifypayment(
      { data: splits[1], email, access_token },
      (res) => {
        console.log(res, "res");
        if (res && res.success == true) {
          this.props.clearcart();
          this.setState({ loader: true });
          getOrderbyid(
            { order_number: res.order_id, email, access_token },
            (response) => {
              if (response && response.success == true) {
                //  history.push("/thank-you");
              }
            }
          );

          //   seterrtrue(false);
        } else {
          this.setState({ loader: true, error: res && res.msg });

          //   seterrtrue(true);
          getOrderbyid(
            { order_number: res.order_id, email, access_token },
            (response) => {
              if (response && response.success == true) {
                //  history.push("/failed-order");
              }
            }
          );

          //   seterr(res && res.msg);
        }
      }
    );
  }

  _onClosedModalPayment = () => {
    const { checkoutId } = this.props;



    // check completed checkout when close webview
    // this.props.checkCheckout({ checkoutId }).then((data) => {
    if (this.state.currentIndex == 2) {
      this._onChangeTabIndex(1);
      this._paymentModal && this._paymentModal.close();
    } else {
      this._paymentModal.close();
    }
    // });
  };

  _onShowPayment = () => {
    this._paymentModal.open();
  };

  _getTabIndex = (page) => {
    return isObject(page) ? page.i : page;
  };

  _updatePageIndex = (page) => {
    this.setState({ currentIndex: this._getTabIndex(page) });
  };

  _onChangeTabIndex = (page, completed) => {
    console.log(page)
    const index = this._getTabIndex(page);

    if (index === 2) {
      this._onShowPayment();
      this._tabCartView && this._tabCartView.goToPage(index);
    } else {
      this.setState({ currentIndex: index })
    }
  };

  _hasCartItems = () => {
    return this.props.cartItems && this.props.cartItems.length > 0;
  };

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
          {/* <Shipping
              onChangeTab={this._onChangeTabIndex}
              key="checkout"
              index={1}
            />  */}
          {currentIndex == 1 && <Checkout
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
          />}

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

          {currentIndex == 2 || currentIndex == 3 && <FinishOrder
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
          />}
          {/* </ScrollableTabView> */}
        </View>

        {this._renderPaymentModal()}
      </View>
    );
  }
}
