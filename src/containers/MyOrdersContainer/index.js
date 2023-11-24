/** @format */

import React, { Component } from "react";
import { Animated, RefreshControl, FlatList, Text, View, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import { withTheme } from "@callstack/react-theme-provider";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import { getOrders } from "@redux/operations";
import {
  Spinkit,
  CheckoutProductItem,
  Button,
  ModalWebView,
} from "@components";
import { Constants, Languages, Styles, Tools } from "@common";
import styles from "./styles";
import MyOrdersEmpty from "./Empty";
// import OrderItem from "./OrderItem";
import { t } from "i18next";
import { moderateScale } from "react-native-size-matters";
import { format } from "date-fns";
const cardMargin = Constants.Dimension.ScreenWidth(0.05);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const mapStateToProps = ({ user, carts, app }) => ({
  userInfo: user.userInfo,
  list: carts.order.payload,
  isFetching: carts.order.isFetching,
  hasNextPage: carts.order.hasNextPage,
  cursor: carts.order.cursor,
  app: app && app.settings,
  primaryColor: app && app.settings && app.settings.theme.primaryColor,

});

@withTheme
@connect(mapStateToProps, { getOrders })
export default class MyOrdersContainer extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this._readyTimer = null;

    this.state = {
      isReady: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    // this._readyTimer = setTimeout(() => {
    //   this.setState({ isReady: true });
    // }, 500);
    this._fetchOrder();
    //console.log(this.props.list)
  }

  componentWillUnmount() {
    clearTimeout(this._readyTimer);
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list && nextProps.list) {
      if (this.props.list.length !== nextProps.list.length) {
        this._fetchOrder();
      }
    }
  }

  _fetchOrder = () => {
    const { userInfo } = this.props;
    const { access_token, email, data } = userInfo || {};
    this.props.getOrders({ access_token, email, customer_id: data && data.id });
  };

  _renderAttribute = (label, context, style) => {
    return (
      <View style={{ flexDirection: 'row', marginVertical: moderateScale(5) }}>
        <Text style={styles.rowLabel}>{label}  </Text>
        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: moderateScale(14) }}>{context}</Text>
      </View>
    );
  };

  _onPressProductItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  _checkStatus = (url) => { };

  _renderItemProduct = ({ item }) => {
    const onPress = () => this._onPressProductItem(item.variant.product);
    return (
      <CheckoutProductItem
        onPress={onPress}
        name={item.title}
        price={item.variant.price}
        quantity={item.quantity}
      />
    );
  };

  _renderItem = ({ item, index }) => {
    const { product, app } = this.props;
    let { currency, theme } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    //console.log(item);
    const onPressCheckStatus = () => this._checkStatus(item.statusUrl);
    let { format_date } = (app?.settings && app?.settings?.deliverydate?.[0]) || {};

    return (
      <TouchableOpacity style={{
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: moderateScale(15),
        padding: moderateScale(10),
        paddingHorizontal: moderateScale(15)
      }}
        onPress={() => this.props.navigation.navigate("News", { orderId: item && item.order_number })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {this._renderAttribute(
            `${t('OrderNo')}:`,
            item?.order_number
          )}
          <Text style={{ fontWeight: 'bold', color: '#000', fontSize: moderateScale(14) }}>
            {Tools.getPrice(
              item && item.total_amount,
              number_of_decimals,
              currency
            )
            }
          </Text>

        </View>
        {this._renderAttribute(
          `${t('OrderedOn')}:`,
          format(
            new Date(
              item.created_date * 1000
            ),
            format_date
          )
        )}

      </TouchableOpacity>
    );
  };

  //   <Button
  //   text={Languages.OrderDetails}
  //   textStyle={styles.checkStatusText}
  //   type="text"
  //   transparent
  //   onPress={() => this.props.navigation.navigate("News", { orderId: item && item.order_number })}
  // />
  _hasOrder = () => {
    return this.props.list && this.props.list.length > 0;
  };

  _renderLoading = () => {
    return <Spinkit style={styles.loading} />;
  };

  render() {
    let { list, app } = this.props || {}
    let processing = list?.filter((i) => i.order_status == "Processing") || []
    let Completed = list?.filter((i) => i.order_status == "Completed") || []
    let Pending = list?.filter((i) => i.order_status == "Pending") || []
    console.log()

    if (!this._hasOrder()) {
      return (<View style={{ flex: 1 }}>
        <Text style={Styles.Common.TextHeaders}>{t('MyOrders')}</Text>
        <MyOrdersEmpty
          navigation={this.props.navigation}
          primaryColor={this.props.primaryColor}
          text={t('NoOrder')} onReload={this._fetchOrder} userInfo={this.props.userInfo} />
      </View>
      );
    }

    if (!this.state.isReady)
      return <View style={styles.container}>{this._renderLoading()}</View>;

    return (
      <ScrollView style={styles.container}>
        {Pending?.length != 0 && <View>
          <View style={[styles.padding, { backgroundColor: '#4a4440', }]}>
            <Text style={styles.text1}>{t('Pending')}</Text>
          </View>
          <View style={styles.padding2}>
            <AnimatedFlatList
              data={Pending}
              scrollEventThrottle={1}
              keyExtractor={(item, index) => `${item.id} || ${index}`}
              renderItem={this._renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={this._hasOrder() ? this.props.isFetching : false}
                  onRefresh={this._fetchOrder}
                />
              }
            />
          </View>
        </View>}
        {processing?.length != 0 && <View>
          <View style={[styles.padding, { backgroundColor: '#50a162' }]}>
            <Text style={styles.text1}>{t('Processing')}</Text>
          </View>
          <View style={styles.padding2}>
            <AnimatedFlatList
              data={processing}
              scrollEventThrottle={1}
              keyExtractor={(item, index) => `${item.id} || ${index}`}
              renderItem={this._renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={this._hasOrder() ? this.props.isFetching : false}
                  onRefresh={this._fetchOrder}
                />
              }
            />
          </View>
        </View>}
        {Completed?.length != 0 && <View>
          <View style={[styles.padding, { backgroundColor: '#00400e' }]}>
            <Text style={styles.text1}> {t('Completed')}</Text>
          </View>
          <View style={styles.padding2}>
            <AnimatedFlatList
              data={Completed}
              scrollEventThrottle={1}
              keyExtractor={(item, index) => `${item.id} || ${index}`}
              renderItem={this._renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={this._hasOrder() ? this.props.isFetching : false}
                  onRefresh={this._fetchOrder}
                />
              }
            />
          </View>
        </View>}

      </ScrollView>
    );
  }
}
