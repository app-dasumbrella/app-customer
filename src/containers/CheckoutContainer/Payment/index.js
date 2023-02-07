/** @format */

import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { checkoutFree, Verifypayment, clearcart, getOrderbyid } from "@redux/operations";
import { CheckoutPaymentMethodItem, Button } from "@components";
import { Languages, Styles, Constants } from "@common";
import { WebView } from "react-native-webview";
import { StackActions, NavigationActions } from 'react-navigation';

import styles from "./styles";
import navigation from "../../../navigation";
import { paymentlink } from "@services/Api";

const mapStateToProps = ({ app, payment, carts, user }) => {
  return {
    paymentMethods: payment && payment.paymentMethods,
    bnpl: payment && payment.bnpl,
    cartItems: carts.cartItems,
    isFetching: payment && payment.isFetching,
    userInfo: user.userInfo,
    checkoutId: carts.checkoutId,

    payment: app?.settings?.settings?.payment,

  };
};

@withNavigation
@connect(mapStateToProps, { checkoutFree, Verifypayment, clearcart, getOrderbyid })
export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      type: "",
      webViewHeight: 500
    };
  }

  _onSelectPaymentMethod = (index) => {
    this.setState({ selectedIndex: index });
  };

  // _onPress = () => {
  //   const {
  //     onChangeTab,
  //     navigation,
  //     delivery,
  //     cartItems,
  //     userInfo,
  //     selecteddate,
  //     coupans,
  //   } = this.props;
  //   const { access_token, email, defaultAddress } = userInfo || {};
  //   this.props.checkoutFree(
  //     {
  //       cartItems,
  //       access_token,
  //       email,
  //       coupans,
  //       customer_address_id: defaultAddress.address_id,
  //       delivery,
  //       selectedtimeslot: selecteddate,
  //     },
  //     (res) => {
  //       //console.log(res, navigation);
  //       try {
  //         onChangeTab(3);
  //       } catch (rr) {
  //         //console.log(rr);
  //       }
  //     }
  //   );
  // const itemSelected = paymentMethods[this.state.selectedIndex];
  // if (itemSelected.type === "card") {
  //   this.props.navigation.navigate("AddCreditCardScreen");
  // } else {
  //   this.props.checkoutFree({ checkoutId });
  // }
  // };
  _callVerify = (url) => {
    let { getOrderbyid } = this.props || {}
    let newurl = url.replace(
      `https://${paymentlink}/verify?`,
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
  onWebViewMessage = (event: WebViewMessageEvent) => {
    this.setState({ webViewHeight: Number(event.nativeEvent.data) })
  }
  render() {
    const { onChangeTab, userInfo } = this.props;
    const { access_token, email, defaultAddress } = userInfo || {};

    const { paymentMethods, Verifypayment, payment, getOrderbyid } = this.props;
    const { type } = this.state;
    let link = paymentlink
    let orderid = this.props.navigation.getParam("orderId")
    console.log("orderid", orderid)
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <WebView
          automaticallyAdjustContentInsets={true}
          style={{ height: this.state.webViewHeight }}
          onMessage={this.onWebViewMessage}
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
          source={{
            html: `<html>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
            
           
            .hide{
              display:none
            }
      </style> 
</Head>

<body onload="document.forms['form1'].submit()">

      <form
      class="hide"
      id="payment-form"
      method="post"
   name="form1"
      action="https://pay.${paymentlink}/"
    >
 
      <input type="text" name="type" value="single" />
      <input type="text" name="order_id" value=${orderid} />
      <input type="text" name="mode" value=${payment && payment[0] && payment[0].mode
              } />
      <input type="submit" value="Submit"  />
    </form>
    </body><html>`,
          }}
          onNavigationStateChange={(state) => {

            if (state && state.url && state.url.includes("/verify")) {
              // seturl(state.url);
              let url = state.url
              let newurl = url.replace(
                `https://${paymentlink}/verify?`,
                ""
              );
              let splits = newurl.split("=");
              let { email, access_token, defaultAddress } = this.props.userInfo || {};

              this.props.Verifypayment(
                { data: splits[1], email, access_token },
                (res) => {
                  console.log(res, "res", splits[1]);
                  if (res && res.success == true) {
                    this.props.clearcart();
                    this.setState({ loader: true });
                    getOrderbyid(
                      { order_number: res.order_id, email, access_token },
                      (response) => {
                        if (response && response.success == true) {
                          //  history.push("/thank-you");
                          console.log("lexyy res");


                          const resetAction = StackActions.reset({
                            index: 1,
                            actions: [
                              NavigationActions.navigate({ routeName: 'Tab' }),

                              NavigationActions.navigate({ routeName: 'FinishScreen' })],
                          });
                          this.props.navigation.dispatch(resetAction);



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
                          console.log("lexyy res2");

                          const resetAction = StackActions.reset({
                            index: 1,
                            actions: [
                              NavigationActions.navigate({ routeName: 'Tab' }),

                              NavigationActions.navigate({ routeName: 'FinishScreen' })],
                          });
                          this.props.navigation.dispatch(resetAction);


                          // this.props.navigation.replace("FinishScreen")

                          //  history.push("/failed-order");
                        }
                      }
                    );

                    //   seterr(res && res.msg);
                  }
                }
              );
              //  this.callVerify(state.url)
            } //your code goes here
          }}
        />
      </ScrollView>
    );
  }
}
