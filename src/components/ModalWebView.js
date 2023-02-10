/** @format */

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Modal from "react-native-modalbox";
import { isFunction } from "lodash";
import { Languages, Constants, Styles } from "@common";
import { WebViewUrl } from "@components";
import { connect } from "react-redux";
import { WebView } from "react-native-webview";
const { width, scale } = Styles.window;
// const mapStateToProps = ({ app, carts, user, country }) => ({

//   payment:
//   app &&
//   app.appsettings &&
//   app.appsettings.settings &&
//   app.appsettings.settings.payment,
// });

// @connect(mapStateToProps, { })
// @withNavigation
export default class ModalWebView extends Component {
  state = { url: this.props.url };

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.setState({ url: nextProps.url });
    }
  }

  open = (url) => {
    if (!this.props.url) {
      this.setState({ url });
    }
    this._paymentModal.open();
  };

  close = () => {
    this._paymentModal.close();
  };

  _handleClose = () => {
    if (isFunction(this.props.onClosed)) {
      this.props.onClosed();
    } else {
      this.close();
    }
  };

  render() {
    const { url } = this.state;
    const userAgentAndroid =
      "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";
    const { orderid, onChangeTab, seturl, payment } = this.props;
    return (
      <Modal
        ref={(modal) => (this._paymentModal = modal)}
        backdropPressToClose={false}
        backButtonClose
        backdropColor="#fff"
        swipeToClose={false}
        onClosed={this._handleClose}
      >
        <View style={{ backgroundColor: "#fff", flex: 1 }}>

          <WebView
            style={{ marginHorizontal: 5 }}
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
      action="https://pay.staging.originmattress.com.my/"
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
                onChangeTab(3);
                seturl(state.url);
                this.close();
                this.props.callVerify(state.url)
              } //your code goes here
            }}
          />
        </View>
        <TouchableOpacity style={styles.iconZoom} onPress={() => this.props.onClosed()}>
          <Text style={styles.textClose}>{Languages.close}</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  iconZoom: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    zIndex: 9999,
  },
  textClose: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 10,
    margin: 4,
    marginRight: 10,
    marginLeft: 10,
    zIndex: 9999,
    // fontFamily: Constants.fontFamilyBold,

  },
  webView: {
    paddingTop: 50,
    zIndex: 9999,
  },
});
