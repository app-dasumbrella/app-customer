/** @format */

import React, { Component } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import Icon from "react-native-vector-icons/Ionicons";
import { ShopButton, Spinner, CheckoutProductItem } from "@components";
import { Languages, Color, Constants, Styles, Tools } from "@common";
import { clearcart, getOrderbyid, Verifypayment, getOrders } from "@redux/operations";
import { connect } from "react-redux";
import * as _ from "lodash";
import { t } from "i18next";
import { format } from "date-fns";
import moment from "moment";
import HTML from "react-native-render-html"
import { moderateScale, verticalScale } from "react-native-size-matters";

const mapStateToProps = ({ payment, carts, user, app }) => {
  return {
    paymentMethods: payment && payment.paymentMethods,
    bnpl: payment && payment.bnpl,
    cartItems: carts.cartItems,
    isFetching: payment && payment.isFetching,
    userInfo: user.userInfo,
    checkoutId: carts.checkoutId,
    verifydatas: payment && payment.verifydatas,
    app: app && app.settings,
    orderbyid: carts.orderbyid,

    primarycolors: app && app.settings && app.settings.theme && app.settings.theme.primaryColor

  };

};
@withTheme
@withNavigation
@connect(mapStateToProps, {
  clearcart, Verifypayment, getOrderbyid, getOrders
})
export default class FinishOrder extends Component {
  _handleNavigate = () => {
    const { userInfo } = this.props;
    const { access_token, email, data } = userInfo || {};
    this.props.getOrders({ access_token, email, customer_id: data && data.id });
    this.props.navigation.replace("Cart");

    this.props.navigation.navigate("MyOrdersScreen");
    //  this.props.onChangeTab(0)

  };
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      type: "",
      error: "",
    };
  }

  componentDidMount() {
    //
    // let { Verifypayment, verifydatas, userInfo, getOrderbyid } = this.props || {};
    // const { access_token, email, defaultAddress } = userInfo || {};
  }

  // componentDidUpdate(nextProps) {
  //   // reset current index when update cart item
  //   console.log("chang2e", nextProps.currentIndex, nextProps.url);

  //   if (this.props.currentIndex != nextProps.currentIndex) {
  //     console.log("change", nextProps.currentIndex);
  //     if (nextProps && nextProps.url && nextProps.currentIndex == 3) {
  //       let newurl = nextProps.url.replace(
  //         "https://shop.dev.originmattress.com.my/verify?",
  //         ""
  //       );
  //       let splits = newurl.split("=");
  //       let { email, access_token, defaultAddress } = nextProps.userInfo || {};

  //       nextProps.Verifypayment(
  //         { data: splits[1], email, access_token },
  //         (res) => {
  //           console.log(res, "res");
  //           if (res && res.success == true) {
  //             this.props.clearcart();
  //             this.setState({ loader: true });
  //             //   getOrderbyid(
  //             //     { order_number: res.order_id, email, access_token },
  //             //     (response) => {
  //             //       if (response && response.success == true) {
  //             //         history.push("/thank-you");
  //             //       }
  //             //     }
  //             //   );

  //             //   seterrtrue(false);
  //           } else {
  //             this.setState({ loader: true, error: res && res.msg });

  //             //   seterrtrue(true);
  //             //   getOrderbyid(
  //             //     { order_number: res.order_id, email, access_token },
  //             //     (response) => {
  //             //       if (response && response.success == true) {
  //             //         history.push("/failed-order");
  //             //       }
  //             //     }
  //             //   );

  //             //   seterr(res && res.msg);
  //           }
  //         }
  //       );
  //     }
  //   }
  // }
  render() {
    let { verifydatas, currentIndex, url, orderid, onShowPayment, loader, error, primarycolors, app, orderbyid } = this.props;
    let { currency, theme, state_enabled, city_enabled, chat_enabled } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {}
    let { width } = Dimensions.get("window");
    let {
      allow_days,
      allow_months,
      backorder_enabled,
      backorder_grouping_days,
      calendar_active_day_bg,
      calendar_active_day_font_color,
      calendar_bg,
      calendar_day_bg,
      calendar_day_font_color,
      calendar_disabled_day_bg,
      calendar_disabled_day_font_color,
      calendar_header_bg,
      calendar_header_font_color,
      calendar_header_icon_color,
      calendar_hover_day_bg,
      calendar_hover_day_font_color,
      calendar_week_day_bg,
      calendar_week_day_font_color,
      date_enabled,
      date_label,
      date_placeholder,
      first_day_of_week,
      format_date,
      format_time,
      note,
      range_enabled,
      range_lower,
      range_upper,
      time_enabled,
      time_label,
      time_placeholder,
      order_prep_hours,
      show_months,
    } = (app?.settings && app?.settings?.deliverydate?.[0]) || {};
    console.log(orderbyid?.payload)
    let payload = orderbyid?.payload || {}
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={Styles.Common.CheckoutBoxContainer} >

        <Text style={styles.titleMt}>{t("TYYO")}
          {orderbyid?.payload?.order_number}
          {t("HasbeenRecieved")}</Text>
        {currentIndex != 2 && error != "" && !_.isUndefined(error) && (
          <View style={{ marginVertical: 5 }}>

            <Text style={[styles.title, { marginVertical: 5 }]}>{error}</Text>
            <ShopButton
              onPress={onShowPayment}
              style={styles.button(this.props.theme)}
              text={"Retry Payment"}
            />
          </View>
        )
        }
        {
          currentIndex != 2 && (
            <View style={{ marginVertical: 5, }}>

              {/* {verifydatas?.paid && (
                <View style={styles.iconContainer}>

                </View>
              )} */}
              {orderbyid?.payload?.pay_type == "online" ?
                <View>

                  <Text style={styles.title}>{t("ConfirmEmail")} {orderbyid?.payload?.email}</Text>
                </View>
                :
                <View style={{ marginHorizontal: '5%', marginVertical: 20 }}>
                  {orderbyid?.payload?.order_status == "Pending" &&
                    <HTML
                      tagsStyles={{
                        body: {
                          color: 'black'
                        },
                        span: {
                          color: '#565150'
                        },
                        p: {
                          color: '#565150',
                          //lineHeight: 1.9
                        }
                      }}
                      source={{ html: orderbyid?.payload?.pay_desc }}
                      contentWidth={width * 0.9}
                    />}

                </View>}
              {/* {verifydatas?.paid && (
                <Text style={styles.title}>{Languages.ThankYou}</Text>
              )}
              {verifydatas?.paid && (
                <Text style={styles.message}>{Languages.FinishOrder}</Text>
              )} */}

            </View>
          )
        }

        {/* {
          !loader && (
            <View style={{ marginVertical: 20 }}>
              <Spinner mode={"normal"} size={"large"} color={"black"} />
            </View>
          )
        } */}

        {
          currentIndex != 2 && <View style={{ width: width, marginBottom: 20 }}>
            <View style={{
              borderWidth: 2, borderColor: '#000', marginHorizontal: '5%',
              paddingVertical: moderateScale(15),
              paddingHorizontal: moderateScale(10)
            }}>
              <Text style={styles.headers}>  {t('OrderDetails')}
                {payload?.order_number}</Text>

              <View style={{ marginVertical: verticalScale(10), paddingHorizontal: moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.headers}>{t('Product')}</Text>
                <Text style={styles.headers}> {t('Subtotal')}</Text>

              </View>

              {payload &&
                payload.items &&
                payload.items.map((item) => {
                  return (<View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.normalText, {
                      width: Styles.window.width * 0.5
                    }]}>{item.name} x {item.purchase_qty}</Text>
                    <Text style={styles.normalTextbold}> {Tools.getPrice(
                      item.price,
                      number_of_decimals,
                      currency
                    )}</Text>

                  </View>)
                })}
              <View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.normalTextbold}>{t('Shipping')}</Text>
                <Text style={styles.normalTextbold}> {Tools.getPrice(
                  payload?.shipping_cost,
                  number_of_decimals,
                  currency
                )}</Text>

              </View>
              <View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.normalTextbold}>{t('Total')}</Text>
                <Text style={styles.normalTextbold}> {Tools.getPrice(
                  payload?.totalAmount,
                  number_of_decimals,
                  currency
                )}</Text>

              </View>
              <View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.normalTextbold}>{t('OrderStatus')}</Text>
                <Text style={styles.normalTextbold}> {payload?.order_status}</Text>

              </View>
              <View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.normalTextbold}>{t('PaymentStatus')}</Text>
                <Text style={styles.normalTextbold}> {payload?.paid ? t("Paid") : t('Pending')}</Text>

              </View>


            </View>
            <View style={{
              borderWidth: 2, borderColor: '#000', marginHorizontal: '5%',
              paddingVertical: moderateScale(15),
              marginTop: 5,
              paddingHorizontal: moderateScale(10)
            }}>
              <Text style={styles.headers}>  {t('ShippingDetails')}
              </Text>





              <View style={{ marginVertical: verticalScale(5), marginBottom: moderateScale(10), paddingHorizontal: moderateScale(10), }}>
                <Text style={styles.title2}>
                  {payload?.shipping_address?.name}
                </Text>

                <Text style={styles.title2}>{payload?.shipping_address?.address1}</Text>
                {!_.isEmpty(payload?.shipping_address?.city) && <Text style={styles.title2}>
                  {payload?.shipping_address?.city}
                </Text>}
                <Text style={styles.title2}>
                  {payload?.shipping_address?.country}
                  {payload?.shipping_address?.zipcode}
                </Text>
              </View>

              <Text style={styles.headers}>  {t('DeliveryDetails')}
              </Text>


              <View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), }}>


                {range_enabled == "yes" ? <Text style={styles.title2}>
                  {t('PDD')}:{" "}

                  {format(
                    new Date(
                      moment(payload?.items?.[0]?.delivery_date)
                        .subtract(range_lower, "day")
                        .toISOString()
                    ),
                    format_date
                  )} - {format(
                    new Date(
                      moment(payload?.items?.[0]?.delivery_date)
                        .add(range_upper, "day")
                        .toISOString()
                    ),
                    format_date
                  )}
                </Text> :
                  payload?.items?.[0]?.delivery_date && <Text style={styles.title2}>
                    {t('PDD')}: {" "} {format(new Date(moment(payload?.items?.[0]?.delivery_date).toISOString()), format_date)}
                  </Text>}

                {time_enabled == "yes" && (
                  <Text style={styles.title2}>
                    {payload?.items?.[0]?.time_start} - {payload?.items?.[0]?.time_end}
                  </Text>
                )}




              </View>
            </View>

          </View>}
        {
          currentIndex != 2 && (
            <ShopButton
              onPress={this._handleNavigate}
              style={{ backgroundColor: primarycolors }}
              text={Languages.ViewMyOrders}
            />
          )
        }
      </ScrollView >
    );
  }
}

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: moderateScale(16),
    fontWeight: "500",
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
    marginBottom: 20,
    color: 'black'

  },
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    lineHeight: 25,
    margin: 20,
    // fontFamily: Constants.fontFamily,
  },
  button: (theme) => ({
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: theme.primaryColor,
  }),
  titleContainer: {
    flexDirection: "row",
    flex: 1.3,
    flexWrap: "wrap",
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: "row",
    flex: 0.7,
    justifyContent: "space-between",
  },
  title2: {
    color: `rgba(0,0,0,0.8)`,
    fontSize: 16,
    // fontFamily: Constants.fontFamily,
  },
  title3: {
    color: `rgba(0,0,0,0.8)`,
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: Constants.fontFamily,
  },
  price: {
    color: Color.Text,
    fontSize: 16,
    // fontFamily: Constants.fontFamilyBold,

  },
  headers: { fontSize: moderateScale(16), fontWeight: 'bold', color: 'black' },
  normalText: { fontSize: moderateScale(14), color: 'black' },
  titleMt: {
    textAlign: "center",
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
    color: 'black'
  },
  title2: { fontSize: moderateScale(14), color: 'black', marginVertical: 3 },
  normalTextbold: { fontSize: moderateScale(14), color: 'black', fontWeight: 'bold' },
};
