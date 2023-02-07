/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { checkCheckout, getCountries, Verifypayment } from "@redux/operations";
import { isObject, isEmpty } from "lodash";
import { StepIndicator, ModalWebView } from "@components";

import MyCart from "./MyCart";
import Checkout from "./Checkout";
import FinishOrder from "./FinishOrder";
import styles from "./styles";


const mapStateToProps = ({ app, carts, user, country }) => ({
  checkoutId: carts.checkoutId,
  cartItems: carts.cartItems,
  webUrl: carts.webUrl,

  userInfo: user.userInfo,
  payment: app?.settings?.settings?.payment,
  countries: country.list,

});

@connect(mapStateToProps, { checkCheckout, getCountries, Verifypayment })
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

  componentWillMount() {
    const { countries } = this.props;
    // if (!countries || isEmpty(countries)) {
    //   this.props.getCountries();
    // }
  }

  componentWillReceiveProps(nextProps) {
    // reset current index when update cart item
    if (this.props.cartItems && nextProps.cartItems) {
      if (nextProps.cartItems.length !== 0) {
        if (this.props.cartItems.length !== nextProps.cartItems.length) {
          this._updatePageIndex(0);
          this._onChangeTabIndex(0);
        }
      }
    }
    if (this.props.userInfo !== nextProps.userInfo || !nextProps.userInfo) {
      this._updatePageIndex(0);
      this._onChangeTabIndex(0);
    }
  }
  componentDidMount() {
    this.setState({ currentIndex: 0 });
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
      />
    );
  };

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
    const index = this._getTabIndex(page);
    if (index === 2) {
      this._onShowPayment();
      this._tabCartView && this._tabCartView.goToPage(index);
    } else {
      this._tabCartView && this._tabCartView.goToPage(index);
    }
  };

  _hasCartItems = () => {
    return this.props.cartItems && this.props.cartItems.length > 0;
  };

  render() {
    const { selecteddate, currentIndex, delivery, coupans } = this.state;
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
          <ScrollableTabView
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
          >
            <MyCart onChangeTab={this._onChangeTabIndex} key="cart" index={0} />
            {/* <Shipping
              onChangeTab={this._onChangeTabIndex}
              key="checkout"
              index={1}
            />  */}
            <Checkout
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
            />

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

            <FinishOrder
              key="finishOrder"
              index={2}
              userInfo={this.props.userInfo}
              currentIndex={currentIndex}
              url={this.state.url}
              Verifypayment={this.props.Verifypayment}
              orderid={this.state.orderid}
              onShowPayment={this._onShowPayment}
            />
          </ScrollableTabView>
        </View>

        {this._renderPaymentModal()}
      </View>
    );
  }
}
