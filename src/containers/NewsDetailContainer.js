/** @format */

import React, { Component } from "react";
import { Text, Animated, Platform, View, I18nManager, ScrollView } from "react-native";
import { connect } from "react-redux";
import TimeAgo from "react-native-timeago";
import { Constants, Tools, Styles, Color, Languages } from "@common";
import moment from "moment";
import * as _ from 'lodash'
import { WebView } from "@components";
import { getOrderbyid } from "@redux/operations";
import {
  Spinkit,
  CheckoutProductItem,
  Button,
  ModalWebView,
} from "@components";
import { withTheme } from "@callstack/react-theme-provider";
import { t } from "i18next";
import { format } from "date-fns";

import { moderateScale, verticalScale } from "react-native-size-matters";
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 42 : 42;
const HEADER_SCROLL_DISTANCE = Styles.headerHeight - HEADER_MIN_HEIGHT;

const mapStateToProps = (state, props) => {
  const post = props.navigation.getParam("item");
  return {
    post,
    userInfo: state.user.userInfo,
    isFetching:
      state.carts && state.carts.orderbyid && state.carts.orderbyid.isFetching,
    payload: state.carts.orderbyid && state.carts.orderbyid.payload,
    app: state.app && state.app.settings,
  };
};
@withTheme
@connect(mapStateToProps, { getOrderbyid })
export default class NewsDetailContainer extends Component {
  state = { scrollY: new Animated.Value(0) };
  componentDidMount() {
    const ids = this.props.navigation.getParam("orderId");
    let { email, access_token, defaultAddress } = this.props.userInfo || {};
    this.props.getOrderbyid(
      { order_number: ids, email, access_token },
      () => { }
    );
  }

  updateScroll = () => {
    this._scrollView._component.scrollTo({ x: 0, y: 0, animated: true });
  };

  _renderContent = () => {
    const { title, content, publishedAt, author } = this.props.post;
    const postContent = Tools.getDescription(content, "500");

    return (
      <View style={styles.scrollViewContent}>
        <Text style={styles.detailDesc}>{title}</Text>
        <Text style={styles.author}>
          <Text>{author.name}</Text> - <TimeAgo time={publishedAt} hideAgo />
          ago
        </Text>
        <WebView html={postContent} />
      </View>
    );
  };

  _renderBanner = () => {
    const { image } = this.props.post;
    const imageURL = Tools.getProductImage(
      image ? image.src : null,
      Styles.width
    );

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });
    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Animated.Image
          source={{ uri: imageURL }}
          style={[
            styles.imageBackGround,
            {
              opacity: animateOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}
        />
      </Animated.View>
    );
  };
  _renderLoading = () => {
    return <Spinkit style={styles.loading} />;
  };

  _renderAttribute = (label, context, style) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowLabel, style]}>{context}</Text>
      </View>
    );
  };
  render() {
    let { payload, userInfo } = this.props || {};
    const { app } = this.props;
    let { currency, theme } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    //  let { items, order_number } = payload[0] || {};
    let { addresses } = userInfo || {};
    let { format_date, range_enabled,
      range_lower,
      range_upper,
      time_enabled } = (app?.settings && app?.settings?.deliverydate?.[0]) || {};

    if (this.props.isFetching)
      return <View style={styles.body}>{this._renderLoading()}</View>;

    return (
      <ScrollView style={styles.body}>
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
            <Text style={styles.title}>
              {payload?.shipping_address?.name}
            </Text>

            <Text style={styles.title}>{payload?.shipping_address?.address1}</Text>
            {!_.isEmpty(payload?.shipping_address?.city) && <Text style={styles.title}>
              {payload?.shipping_address?.city}
            </Text>}
            <Text style={styles.title}>
              {payload?.shipping_address?.country}
              {payload?.shipping_address?.zipcode}
            </Text>
          </View>

          <Text style={styles.headers}>  {t('DeliveryDetails')}
          </Text>


          <View style={{ marginVertical: verticalScale(5), paddingHorizontal: moderateScale(10), }}>


            {range_enabled == "yes" ? <Text style={styles.title}>
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
              payload?.items?.[0]?.delivery_date && <Text style={styles.title}>
                {t('PDD')}: {" "} {format(new Date(moment(payload?.items?.[0]?.delivery_date).toISOString()), format_date)}
              </Text>}

            {time_enabled == "yes" && (
              <Text style={styles.title}>
                {payload?.items?.[0]?.time_start} - {payload?.items?.[0]?.time_end}
              </Text>
            )}




          </View>
        </View>

      </ScrollView >
    );
  }
}

const styles = {
  body: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  c2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
    paddingHorizontal: "3%",
  },
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
  scrollViewContent: {
    marginTop: Styles.headerHeight,
    position: "relative",
    marginBottom: 100,
  },
  headers: { fontSize: moderateScale(16), fontWeight: 'bold', color: 'black' },
  normalText: { fontSize: moderateScale(14), color: 'black' },
  title: { fontSize: moderateScale(14), color: 'black', marginVertical: 3 },
  normalTextbold: { fontSize: moderateScale(14), color: 'black', fontWeight: 'bold' },
  detailDesc: {
    color: "#333",
    width: Styles.window.width - 20,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 2,
    marginLeft: 13,
    fontWeight: "500",
    fontSize: 22,
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: Constants.fontFamilyBold,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: "5%",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    height: Styles.headerHeight,
  },
  imageBackGround: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: Styles.window.width,
    height: Styles.headerHeight,
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  rowLabel: {
    fontSize: 16,
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
  },
  label: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 16,
    color: Color.Text,
    marginLeft: 8,
  },
  author: {
    color: "#999",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: Constants.fontFamily,
  },
};
