/** @format */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { withTheme } from "@callstack/react-theme-provider";
import { getDefaultShippingAddress } from "@redux/selectors";
import { Button, CheckoutProductItem, TextInput } from "@components";
import { Languages, Tools, Styles, Color, Constants, Images } from "@common";
import {
  gettimeslots,
  checkoutFree,
  applyCoupon,
  removeCoupon, createUserAddress,
  getOrderbyid,
  checkoutOutOfserviceFree,
  deliverycache,
  clearHash,
  clearcart,
  register,

} from "@redux/operations";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import CouponInput from "./CouponInput";
import RadioButton from "react-native-radio-button";
import * as _ from "lodash";
import parentStyle from "../styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
let { width } = Dimensions.get("window");
import { moderateScale } from "react-native-size-matters";
import { format } from "date-fns";
import { withTranslation } from "react-i18next";
import { toast } from "../../../Omni";
import { getTimeFormat } from "../../../ultils/timeUtils";
import HTML from "react-native-render-html"
import UserAddressFormContainer from "../../../containers/UserAddressFormContainer";
const mapStateToProps = (state) => {
  return {
    cartItems: state.carts.cartItems,
    isFetching: state.carts.isFetching,
    totalPrice: state.carts.totalPrice,
    subtotalPrice: state.carts.subtotalPrice,
    shippingSelected: state.carts.shippingSelected,
    shippingAddress: getDefaultShippingAddress(state),
    userInfo: state.user.userInfo,
    deliverydate: state.payment && state.payment.deliverydate,
    appstate: state.app && state.app.appsettings,
    apps: state.app && state.app.settings && state.app.settings.settings,
    app: state.app && state.app.settings,
    payment:
      state.app &&
      state.app.settings &&
      state.app.appsettings.settings &&
      state.app.appsettings.settings.payment,
    payments: state.payment,
    list: state.app.productsettings.list,
    discount: state.carts?.discount,
    discountCode: state.carts.discountCode,
    checkoutId: state.carts.checkoutId,
    couponFetching: state.carts.couponFetching,
    couponApplied: state.carts.couponApplied,
    carts: state.carts,
    language: state?.app.language,
    cacheddelivery: state.payment && state.payment.cacheddelivery,
    userDummy: state?.user?.dummyAddress,
    staticAddress: state?.user?.staticAddress

  };
};

@withTheme
@withTranslation()
@connect(mapStateToProps, {
  gettimeslots,
  checkoutFree,
  applyCoupon,
  removeCoupon,
  deliverycache,
  clearHash,
  checkoutOutOfserviceFree,
  createUserAddress,
  getOrderbyid,
  clearcart,
  register

})
export default class Checkout extends Component {
  // need add shipping address
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      show: false,
      showitem1: true,
      showitem: true,
      showitem2: true,
      showitem4: true,
      showitem3: true,
      shippingMethod: "",
      couponCode: "",
      payCode: '',
      selectedtimeslot: 0,
      allowedDates: []
    };
  }
  componentDidMount() {
    let {
      userInfo,
      gettimeslots,
      deliverydate,
      setselecteddate,
      appstate,
      apps,
      app,
      language,
      clearHash,
      cacheddelivery,
    } = this.props || {};
    let { email, access_token, defaultAddress, LoggedUser } = userInfo || {};
    let { data } = userInfo || {}
    let { name } = data || {}
    let { site } = appstate || {};
    let { shipping } = apps || {};
    let { state_enabled, city_enabled, countries } = app || {};
    let { token } = site || {};

    gettimeslots({
      site_token: token, lang: language?.code
    }, (res) => {
      let ald = []
      res?.data?.allowed_dates?.map(it => ald.push(new Date(it)))
      this.setState({ allowedDates: [...ald] })
    });
    this.setState({
      selecteddate: deliverydate && deliverydate?.timeslots?.[0],
      shippingMethod: shipping && shipping[0],
      itemskey: 20,
      nopayment: true,
      fullname: name,
      email,
      delivery: deliverydate?.date || "",
      date: deliverydate?.date,
      billingid: defaultAddress && defaultAddress.id,
      notes: ""
    });
    if (countries && countries.length == 1) {
      this.setState({ Region: countries && countries[0] && countries[0].label });
      this.setState({ country_code: countries && countries[0] && countries[0].code });
    }
    console.log(cacheddelivery, 'selected', userInfo)

    if (cacheddelivery && !LoggedUser) {
      this.setState({ delivery: new Date(cacheddelivery), date: new Date(cacheddelivery) })
    }
    let sd4 = moment(new Date(this.props.payments?.prevHashDate)).unix()
    let sd3 = moment().unix();
    if (sd3 - sd4 > 86400) {
      clearHash()
    }
    if (userInfo) {
      console.log(cacheddelivery, 'cacheddelivery')
      if (cacheddelivery) {
        this.setState({ delivery: new Date(cacheddelivery), date: new Date(cacheddelivery) })
        //     setselectedtimeslot(0)

        let datestring = moment().add(1, "days").format("YYYY-MM-DD");
        let sd1 =
          moment(cacheddelivery).unix()

        let sd2 = moment().unix();

        let dif = sd1 - sd2
        if (dif < 86400) {
          this.setState({ delivery: new Date(datestring), date: new Date(datestring) });
          gettimeslots({
            site_token: token, lang: language?.code
          }, (res) => {
            let ald = []
            res?.data?.allowed_dates?.map(it => ald.push(new Date(it)))
            this.setState({ allowedDates: [...ald] })

          });
        }

        // else {
        //   setdelivery("");
        // }
      }
    }
    let {

      order_prep_hours,
    } = (app?.settings && app?.settings?.deliverydate?.[0]) || {};
    let dayr = Math.floor(order_prep_hours / 24);

    let d = new Date(moment().add(dayr, "day"));
    let b = "";
    if (d.getMonth() < 10) b = `0${d.getMonth() + 1}`;
    else b = d.getMonth() + 1;
    let datestring = `${d.getFullYear()}-${b}-${d.getUTCDate()}`;
    // this.setState({ date: d });
    // gettimeslots({ date: datestring, site_token: token }, () => {
    //   this.setState({
    //     selecteddate:
    //       deliverydate && deliverydate.timeslots && deliverydate.timeslots[0],
    //   });
    //   setselecteddate(
    //     deliverydate && deliverydate.timeslots && deliverydate.timeslots[0]
    //   );
    // });
  }
  _renderPriceItems = () => {
    return (
      <Text style={styles.priceItems(this.props.theme)}>
        {Tools.getPrice(this.props.subtotalPrice)}
      </Text>
    );
  };

  createAccount = (data) => {
    const {
      userInfo, register, createUserAddress
    } = this.props;
    let { email, access_token } = userInfo || {};
    if (!userInfo) {
      const user = {
        email: data.emailAdress,
        fullName: data.address?.name,
        password: data.emailAdress,
        LoggedUser: false,
      };
      register(user, (response) => {
        if (response) {
          createUserAddress(
            {
              address: data.address,
              email: response.email,
              access_token: response.access_token,
              customer_id: response.data.id,
            },
            (responseaddreess) => {
              // setoverlayloaders(false);
              if (responseaddreess.err) {
                seterror(responseaddreess.reason);
              }
              if (responseaddreess && responseaddreess.customerAddress) {
                this.finalCheckout(
                  responseaddreess.customerAddress.id,
                  response.access_token,
                  data.emailAdress
                );
              }
            }
          );
        }
      });
    } else {
      createUserAddress(
        {
          address: data.address,
          email: data.emailAdress,
          access_token,
          customer_id: userInfo && userInfo.data.id,
        },
        (responseaddreess) => {
          if (responseaddreess.err) {
            this.setState({ error: responseaddreess.reason });
          }
          if (responseaddreess && responseaddreess.customerAddress) {
            this.finalCheckout(
              responseaddreess.customerAddress.id,
              access_token,
              email
            );
          }
        }
      );
    }
  }


  finalCheckout = (addressID, access_token, email) => {
    console.log(this.state.billingid, "finalCheckout finalCheckout", addressID)

    let {
      cartItems,
      checkoutFree,
      userInfo,
      register,
      getOrderbyid,
      clearcart,
      language,
      showroom_code,
      app,
      carts,
      payments,
      deliverydate
    } = this.props || {};
    let { delivery, payCode, selectedtimeslot, billingid } = this.state || {}
    let objDateFormated = format(new Date(moment(delivery).toISOString()), "yyyy-MM-dd")

    let { couponApplied, discount, discountCodes } = carts || {};
    let {
      time_enabled,
    } = (app?.settings && app?.settings?.deliverydate?.[0]) || {};
    let objdata = {
      time_enabled,
      payment: payments,
      cartItems,
      access_token,
      billingid: billingid ? billingid : addressID,
      email,
      notes: this.state.notes,
      customer_address_id: addressID,
      delivery: moment(this.state.delivery).format("YYYY-MM-DD"),
      coupans: discountCodes,
      selectedtimeslot: deliverydate?.all?.[objDateFormated]?.[selectedtimeslot],
      site_shipping_id: this.state.shippingMethod?.id,
      showroom_code,
      lang: language?.code,
      payCode
    }
    this.setState({ overlayloaders: true })
    //    this.props.navigation.navigate("PaymentScreen", { orderId: 20413 })

    checkoutFree(
      objdata,
      (response) => {
        this.setState({ overlayloaders: false })
        console.log("treess", response)
        if (!response.err) {
          if ((
            response &&
            response.data &&
            response?.data?.order_status != "pending"
          ) || (payCode != '')) {
            clearcart();
            getOrderbyid(
              {
                order_number: response.id,
                email,
                access_token,
              },
              (response) => {
                if (response && response.success == true) {
                  //  this.props.onChangeTab(3);
                  this.props.navigation.replace("FinishScreen")
                  this.props.setID(response.id);
                  // history.push("/thank-you");
                }
              }
            );
          } else {
            this.props.setID(response.id);
            this.props.navigation.navigate("PaymentScreen", { orderId: response.id })
            //            this.props.onChangeTab(this.props.index + 1);

          }

        } else {

          if (response?.res?.data?.data?.error == "token_expired" || response?.res?.data?.data?.error == "not_found") {
            const user = {
              email: email,
              fullName: userInfo?.data?.name,
              password: email,
              LoggedUser: false,
            };

            register(user, (regres) => {
              if (regres) {
                this.finalCheckout(addressID, email, regres.access_token)
              }
            })
          } else {
            this.setState({ error: response && response.res.data && response.res.data.msg });
          }
          this.setState({ loader: false });
        }
      }
    );
  };



  _onPress = () => {
    const {
      shippingAddress,
      shippingSelected,
      userInfo,
      navigation,
      checkoutFree,
      payment,
      payments,
      app,
    } = this.props;
    let { nopayment, delivery } = this.state || {}

    if (!userInfo) {

      if (nopayment) {
        if (delivery != "") {
          this.setState({ validates3: true });
        } else {
          toast("Select Preferred Delivery Date");
        }
      } else {
        toast("Service unavailable at the moment");
      }
    } else {

      if (nopayment) {
        console.log(" oool CGE")

        this.beforeCreateCheck();
      } else {
        toast("Service unavailable at the moment");
      }
    }


    // if (!shippingAddress) {
    //   alert(Languages.ShippingAddressError);
    // } else if (!shippingSelected) {
    //   alert(Languages.ShippingMethodError);
    // }

  }

  getDiscounts = () => {
    let { carts } = this.props || {};

    let { couponApplied, discount, discountCodes } = carts || {};

    let { shippingMethod } = this.state
    let discT = 0
    let totalP = Number(this.props.totalPrice)

    let shipping = Number(shippingMethod &&
      shippingMethod.cost
      ? shippingMethod &&
      shippingMethod.cost
      : 0)
    let absorbShipping = 0
    discountCodes.map(i => {
      // if (i.absorb_shipping == "1") {
      //   absorbShipping = 1
      // }
      discT = discT + Number(i.displayValue)
    })
    let finalVal = (totalP + shipping - discT)
    let FinalShipping = shipping
    let finalT = finalVal

    return Number(
      finalT > 0 ? finalT : 0
    )
  }
  beforeCreateCheck = () => {
    const {
      register, createUserAddress
    } = this.props;
    const {
      userInfo, userDummy, staticAddress
    } = this.props;
    let { email, defaultAddress, access_token } = userInfo || {};
    const { date } = this.state
    if (userInfo && userInfo?.data?.access_token) {
      if (defaultAddress && defaultAddress.id) {
        if (date != "" && date != undefined) {
          this.finalCheckout(
            defaultAddress && defaultAddress.id,
            userInfo?.data?.access_token,
            email
          );
        } else {
          toast("Select Preferred Delivery Date")
          this.setState({ error: "Select Preferred Delivery Date" });
        }
      } else {
        if (userInfo?.addresses?.length == 0) {
          if (date != undefined) {

            let newAddress = {};
            newAddress = {
              phone_number: staticAddress?.phone_number,
              name: staticAddress?.name,
              address: staticAddress?.address,
              city: staticAddress?.city,
              state: staticAddress?.state,
              country: staticAddress?.country,
              country_code: staticAddress?.country_code,
              zipcode: staticAddress?.zipcode,
            };
            createUserAddress(
              {
                address: newAddress,
                email: email,
                access_token: access_token,
                customer_id: userInfo?.data?.id,
              },
              (responseaddreess) => {
                // setoverlayloaders(false);
                if (responseaddreess.err) {
                  // seterror(responseaddreess.reason);
                }
                if (responseaddreess && responseaddreess.customerAddress) {
                  this.finalCheckout(
                    responseaddreess.customerAddress.id,
                    access_token,
                    email
                  );
                }
              }
            );
            // toast("Enter address details")
            this.setState({ validates3: true });
          } else {
            toast("Select Preferred Delivery Date")

          }
        } else seterror("Select Shipping address");
      }
    } else {
      setvalidates(true);
      if (
        phonenumber &&
        phonenumber.length != 0 &&
        emails &&
        emails.length !== 0 &&
        fullname &&
        fullname.length !== 0
      ) {
        setvalidates2(true);
      } else {
        toast("Select Shipping address")

      }
    }
  };
  onChange = (event, selected) => {
    let { gettimeslots, appstate, app, setselecteddate, language, deliverycache } = this.props || {}
    let { site } = appstate || {};
    let { token } = site || {};
    let { time_enabled } = (app?.settings && app?.settings?.deliverydate?.[0]) || {};

    this.setState({
      show: false,
    });
    deliverycache(selected)
    this.props.setdelivery(selected);
    this.setState({ date: selected, delivery: selected });
    try {
      if (time_enabled == "yes") {
        gettimeslots(
          {
            lang: language?.code,
            site_token: token,
          },
          (kep) => {

            let ald = []
            kep?.data?.allowed_dates?.map(it => ald.push(new Date(it)))
            //setAllowedDate(() => [...ald])

            this.setState({
              AllowedDate: [...ald],
              selecteddate:
                kep &&
                kep.data &&
                kep.data.timeslots &&
                kep.data.timeslots[0],
              selectedtimeslot: 0
            });
            setselecteddate(
              kep &&
              kep.data &&
              kep.data.timeslots &&
              kep.data.timeslots[0].timeslot
            );
          }
        );
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  _handleCoupon = () => {
    const {
      checkoutId,
      setcoupans,
      cartItems,
      userInfo,
      shipping_id,
      selectedShipping,
      site_token,
      totalPrice,
      applyCoupon,
      carts
    } = this.props;
    const { access_token, email } = userInfo || {};

    let { discountCodes } = carts || {}
    let { couponCode, shippingMethod } = this.state
    if (couponCode.length != 0) {
      let filDis = discountCodes?.filter(cop => cop?.code.toLowerCase() == couponCode.toLowerCase())
      if (couponCode && filDis?.length == 0) {
        applyCoupon(
          {
            coupans: couponCode,
            totalPrice: totalPrice,
            totalShipping: shippingMethod &&
              shippingMethod.cost
              ? shippingMethod &&
              shippingMethod.cost
              : 0,
            cartItems,
            access_token,
            email,
            site_token: site_token,
            customer_id: userInfo?.data?.id,
            shipping_id:
              shippingMethod && shippingMethod.id,
          },
          (er) => {
            console.log("error", er)
            if (er.error) {
              if (er.msg == "Token not found.") {
                // logoutUserAndCleanCart();
                // props.setModals(true);
              } else {
                //seterrors(er.msg);
              }
            } else {
              this.setState({ couponCode: "" });
              // seterrors("");
            }
          }
        );
      } else {
        console.log("here1")
        toast(`${t("AlreadyApp")} ${coupans}`)
        this.setState({ derror: `${t("AlreadyApp")} ${coupans}` })
      }
    } else {
      console.log("here3")
      toast(t("PECC"))
      this.setState({ derror: t("PECC") })
    }
  }
  renderAddress = () => {
    const { app, t, staticAddress } = this.props;
    let { state_enabled, city_enabled, countries } = app || {};
    let { ZIP, addressId, phonenumber, fullname, streetaddress, Town, province, Region } = this.state
    return (<>
      <UserAddressFormContainer
        showemail
        //  validates3={validates3}
        //  setvalidates3={setvalidates3}
        fromCheckout
        ZIP={staticAddress?.zipcode}
        addressId={addressId}
        phonenumber={staticAddress?.phone_number}
        fullname={staticAddress?.name}
        streetaddress={staticAddress?.address}
        Town={staticAddress?.city}
        province={staticAddress?.state}
        Region={staticAddress?.country}
        setP={(t) => this.setState({ sameset: t })}
        callbackFromCheckout={(e, data) => {
          // setvalidates3(false);
          if (e) {
            this.createAccount(data);
          }
        }}
        sameAddressUpdate={false}
      />
      {/* <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{this.state.type == "shipping" ? t("RecipientName") : t("Name")} *</Text>
        <TextInput
          onChangeText={(text) => this.setState({ fullname: text })}
          value={this.state.fullname}
          placeholder={t("Entername")}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        />
      </View>





      <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("Email")} *</Text>
        <TextInput
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
          placeholder={t("Email")}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        />
      </View>

      <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("Phonenumber")} *</Text>
        <TextInput
          onChangeText={(text) => this.setState({ phonenumber: text })}
          value={this.state.phonenumber}
          placeholder={t("Phonenumber")}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        />
      </View>

      <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("Streetaddress")} *</Text>
        <TextInput
          value={this.state.streetaddress}
          placeholder={t("HOUSE")}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
          onChangeText={(text) => this.setState({ streetaddress: text })}

        />
      </View>

      {city_enabled == "yes" && <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("TOWN")} *</Text>
        <TextInput
          onChangeText={(text) => this.setState({ Town: text })}
          value={this.state.Town}
          placeholder={""}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        />
      </View>}

      {state_enabled == "yes" && <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("State")} *</Text>
        <TextInput
          onChangeText={(text) => this.setState({ province: text })}

          value={this.state.province}
          placeholder={""}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        />
      </View>}
      <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("ZIP")} *</Text>
        <TextInput
          value={this.state.ZIP}
          placeholder={""}
          onChangeText={(text) => this.setState({ ZIP: text })}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        />
      </View>
      <View style={styles.marginVerticals}>
        <Text
          style={styles.labelText}
        >{t("Country")} *</Text>
        {countries && countries.length == 1 ? <TextInput
          disabled={true}
          value={countries?.[0]?.label}
          placeholder={""}
          inputStyle={{
            borderWidth: 0.9,
            paddingLeft: 15,
            color: "black",
            width: width * 0.8,
          }}
        /> :
          <TextInput
            value={this.state.Region}
            placeholder={""}
            inputStyle={{
              borderWidth: 0.9,
              paddingLeft: 15,
              color: "black",
              width: width * 0.8,
            }}
          />
        }
      </View> */}
    </>)
  }
  renderAddRow = (key, value) => {
    let { t } = this.props
    return (
      <View style={{ flexDirection: 'row', width: width * 0.6, marginVertical: moderateScale(3) }}>
        <Text style={{ minWidth: moderateScale(75), color: 'black', fontWeight: 'bold', fontSize: moderateScale(14) }}>{t(key)}</Text>
        <Text style={{ color: 'black', flexWrap: 'wrap' }}> :  {value} </Text>
      </View>)
  }
  renderSelectedAdd = (item) => {
    return (<View>
      {this.renderAddRow("Name", item?.address?.name)}
      {this.renderAddRow("Phone", item?.phone_number)}
      {this.renderAddRow("Address", `${item?.address?.address1} ${item?.address?.city}  ${item?.address?.state}, ${item?.address?.zipcode}, ${item?.address?.country}`)}


    </View>)
  }
  render() {
    const contentWidth = Dimensions.get("window").width;
    let tagsStyles = {
      body: {
        color: 'black'
      },
      span: {
        color: '#565150'
      },
      p: {
        color: '#565150',
        // lineHeight: 1.9
      }
    }
    const {
      totalPrice,
      cartItems,
      userInfo,
      deliverydate,
      setselecteddate,
      setcoupans,
      apps,
      app,
      payments,
      list,
      appstate,
      carts,
      discount,
      couponFetching,
      couponApplied,
      checkoutOutOfserviceFree,
      removeCoupon,
      staticAddress,
      userDummy,
      clearHash
    } = this.props;
    let { site } = appstate || {};
    let { state_enabled, city_enabled, countries } = app || {};
    let { payment, bnpl, manual_payment } = app?.settings || {};
    let { token } = site || {};
    let { shipping } = apps || {};
    let { currency, theme } = app || {};
    let { numberFormat, primaryColor } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    let { discountCodes } = carts || {};

    const { access_token, email, customer_id, defaultAddress } = userInfo || {};
    const finalPrice = Tools.getFinalPrice(null, totalPrice);
    const {
      date,
      show,
      showitem,
      showitem1,
      showitem2,
      showitem3,
      showitem4,
      selecteddate,
      billingid,
      delivery,
      selectedtimeslot,
      shippingMethod,
      sameset
    } = this.state;
    let {

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
    let dayr = Math.floor(order_prep_hours / 24);
    const { t, i18n } = this.props;
    console.log(state_enabled, city_enabled, sameset, delivery, 'delivery')

    let objDateFormated = format(new Date(moment(delivery).toISOString()), "yyyy-MM-dd")
    console.log(objDateFormated, selectedtimeslot, deliverydate?.all?.[objDateFormated])
    return (
      <View style={Styles.Common.CheckoutBoxContainer}>
        <View style={{ padding: 10 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 5 }}
          >
            <Text style={Styles.Common.TextHeaders}>{t('Checkout')}</Text>

            <View
              style={{
                borderColor: `rgba(0,0,0,0.2)`,
                borderWidth: 0.8,
                paddingBottom: moderateScale(15),
                marginBottom: 10,
              }}
            >
              <View style={{ backgroundColor: primaryColor, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: moderateScale(16),
                    paddingVertical: moderateScale(8),
                    paddingHorizontal: moderateScale(10),
                  }}
                >
                  {t("YourDetails")}
                </Text>
                {userInfo && userInfo?.addresses?.length != 0 && <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      let address = userInfo?.addresses?.data?.filter(it => it?.id == defaultAddress?.id)
                      this.props.navigation.navigate("UserAddressScreen")
                    }}

                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: moderateScale(10) }}>
                    <Image source={Images.icons.edit} name="pencil-alt" style={{ width: moderateScale(20), height: moderateScale(18) }} size={moderateScale(20)} resizeMode={'contain'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: moderateScale(10) }}
                    onPress={() => this.props.navigation.navigate("UserAddressFormScreen")}
                  >
                    <Image source={Images.icons.plus} name="pencil-alt" style={{ width: moderateScale(20), height: moderateScale(18) }} size={moderateScale(20)} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>}

              </View>
              <View
                style={{
                  paddingTop: moderateScale(10),
                  paddingHorizontal: moderateScale(20),
                }}
              >
                <View style={{ marginBottom: 15 }}>
                  {!userInfo && (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Login");
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: moderateScale(15),
                          marginLeft: -3,
                        }}
                      >
                        {t("ALREADYACCOUNT")}

                        <Text
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: moderateScale(15),
                          }}
                        >
                          {" "} {t("LogInCreate")}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  )}

                  {
                    userInfo?.addresses?.data?.map((item, index) => {
                      if (defaultAddress?.id == item.id)
                        return this.renderSelectedAdd(item)
                    })}
                  {!userInfo && this.renderAddress()}
                  {((userInfo?.addresses?.data?.length == 0) || (userInfo?.addresses?.length == 0)) && this.renderAddress()}

                </View>

              </View>

            </View>
            <View
              style={{
                borderColor: `rgba(0,0,0,0.2)`,
                borderWidth: 0.8,
                paddingBottom: moderateScale(15),
                marginBottom: 10,
              }}
            >
              <View style={{ backgroundColor: primaryColor }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: moderateScale(16),
                    paddingVertical: moderateScale(8),
                    paddingHorizontal: moderateScale(10),
                  }}
                >
                  {date_label}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: moderateScale(15),
                  paddingHorizontal: moderateScale(20),
                }}
              >
                <View style={{ marginBottom: 15 }}>
                  <TouchableOpacity
                    style={{
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      this.setState({ show: true });
                    }}
                  >
                    <TextInput
                      value={date ? format(
                        new Date(
                          moment(date)
                            .toISOString()
                        ),
                        format_date
                      ) : ""}
                      editable={false}
                      placeholder={date_placeholder}
                      inputStyle={{
                        borderWidth: 0.9,
                        paddingLeft: 15,
                        color: "black",
                        width: width * 0.8,
                      }}
                    />
                  </TouchableOpacity>

                  {_.isDate(date) && range_enabled == "yes" && (
                    <Text style={{ marginBottom: 5, color: '#333' }}>
                      {t("PDD")}:{" "}
                      {format(
                        new Date(
                          moment(date)
                            .subtract(range_lower, "day")
                            .toISOString()
                        ),
                        format_date
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(
                          moment(date).add(range_upper, "day").toISOString()
                        ),
                        format_date
                      )}
                    </Text>
                  )}

                  {_.isDate(date) && range_enabled != "yes" && (
                    <Text style={{ marginBottom: 5 }}>
                      {t("PDD")}:{" "}
                      {format(
                        new Date(
                          moment(date)
                            .toISOString()
                        ),
                        format_date
                      )}
                    </Text>
                  )}
                  {time_enabled == "yes" && (
                    <View>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: moderateScale(14),
                          marginBottom: moderateScale(8),
                        }}
                      >
                        {time_placeholder}
                      </Text>
                      {delivery != "" &&
                        time_enabled == "yes" &&
                        deliverydate?.all?.[objDateFormated]?.map((slots, indexs) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                marginVertical: 5,
                              }}
                            >
                              <RadioButton
                                disabled={slots?.allowed != "0"}
                                animation={"bounceIn"}
                                isSelected={
                                  indexs == selectedtimeslot
                                }
                                size={10}
                                innerColor={slots?.allowed != "0" ? primaryColor : 'grey'}
                                outerColor={slots?.allowed != "0" ? primaryColor : 'grey'}
                                onPress={() => {
                                  if (slots?.allowed != "0") {
                                    this.setState({
                                      selecteddate: slots,
                                      selectedtimeslot: indexs
                                    });
                                    setselecteddate(
                                      deliverydate &&
                                      deliverydate.timeslots &&
                                      deliverydate.timeslots[0] &&
                                      deliverydate.timeslots[0].timeslot
                                    );
                                  }
                                }}
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  if (slots?.allowed != "0") {
                                    this.setState({
                                      selecteddate: slots,
                                      selectedtimeslot: indexs
                                    });
                                    setselecteddate(
                                      deliverydate &&
                                      deliverydate.timeslots &&
                                      deliverydate.timeslots[0] &&
                                      deliverydate.timeslots[0].timeslot
                                    );
                                  }
                                }}
                                disabled={slots?.allowed == "0"}
                              >
                                <Text style={{ marginLeft: 10, color: slots?.allowed != "0" ? "black" : 'grey' }}>
                                  {`${getTimeFormat(format_time, slots?.start)} - ${getTimeFormat(format_time, slots?.end)} ${slots?.allowed == "0" ? `(${slots?.remark})` : ''} `}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                    </View>
                  )}
                </View>

                <View style={{ marginBottom: moderateScale(15), }}>
                  {/* <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: moderateScale(14),
                     
                    }}
                  > */}
                  <HTML
                    source={{ html: note }}
                    contentWidth={contentWidth}
                    tagsStyles={{
                      body: {
                        color: 'black'
                      },
                      span: {
                        color: '#565150'
                      },
                      p: {
                        color: '#565150',
                        // lineHeight: 1.9
                      }
                    }}
                  />
                  {/* </Text> */}
                </View>

                <View>
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: moderateScale(15),
                      marginBottom: moderateScale(8),
                    }}
                  >
                    {t("DeliveryNote")}
                  </Text>
                  <TextInput
                    Contstyle={{
                      height: 80,
                    }}
                    value={this.state.deliverynote}
                    editable={true}
                    multiline={true}
                    placeholder={t("DeliveryNotePH")}
                    inputStyle={{
                      borderWidth: 0.9,
                      paddingLeft: 15,
                      color: "black",
                      width: width * 0.8,
                      textAlignVertical: "top",
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                borderColor: `rgba(0,0,0,0.2)`,
                borderWidth: 0.8,
                paddingHorizontal: moderateScale(20),
                paddingVertical: moderateScale(15),
              }}
            >
              <View>
                <CouponInput
                  discountCodes={discountCodes}
                  setcoupans={setcoupans}
                  cartItems={cartItems}
                  access_token={access_token}
                  updatestate={(e) => {
                    this.setState({ couponCode: e });
                  }}
                  selectedShipping={this.state.shippingMethod}
                  placeholder={t("Couponcode")}
                  email={email}
                  customer_id={userInfo?.data?.id}
                  site_token={token}
                  totalPrice={this.props.totalPrice}
                  discode={this.state.couponCode}
                />

                <Button
                  onPress={this._handleCoupon}
                  text={t("Applycoupon")}
                  isLoading={couponFetching}
                  style={{
                    backgroundColor: primaryColor,
                    marginVertical: 10,
                    padding: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: moderateScale(16),
                  marginBottom: moderateScale(8),
                  marginTop: moderateScale(5)
                }}
              >
                {t("Yourorder")}
              </Text>
              {cartItems &&
                showitem1 &&
                cartItems.map((item, index) => {
                  return (
                    <CheckoutProductItem
                      key={index.toString()}
                      addon={item.addon}
                      name={item.product.title}
                      app={app}
                      variant={item.variant}
                      item={item}
                      quantity={item.quantity}
                      price={item.variant.sale_price}
                      lists1={list}
                    />
                  );
                })}
              <View
                style={{
                  flexDirection: "row",
                  borderTopColor: "#000",
                  borderTopWidth: 2,
                  paddingTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: moderateScale(14),
                  }}
                >
                  {t("Subtotal")}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: moderateScale(14),
                    // fontFamily: Constants.fontFamilyBold,

                  }}
                >
                  {" "}
                  {Tools.getPrice(totalPrice, number_of_decimals, currency)}
                </Text>
              </View>

              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: moderateScale(16),
                  marginTop: 10,
                }}
              >
                {t("Shipping")}{" "}
              </Text>
              <View
                style={{
                  paddingTop: 10,
                }}
              >
                {shipping &&
                  shipping.map((items) => (
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 5,
                      }}
                    >
                      <RadioButton
                        animation={"bounceIn"}
                        size={10}
                        isSelected={items == this.state.shippingMethod}
                        innerColor={primaryColor}
                        outerColor={primaryColor}
                        onPress={() => {
                          this.setState({
                            shippingMethod: items,
                          });
                        }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 10,
                            color: "black",
                            fontSize: moderateScale(14),
                          }}
                        >
                          {items.name}{" "}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: moderateScale(14),
                          }}
                        >
                          {" "}
                          {Tools.getPrice(
                            items.cost,
                            number_of_decimals,
                            currency
                          )}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
              {!_.isEmpty(discountCodes) && <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: moderateScale(16),
                  marginTop: 10,
                }}
              >
                {t('Discount')}{" "}
              </Text>}
              <View
                style={{
                  paddingTop: 10,
                }}
              >
                {!_.isEmpty(discountCodes) &&
                  discountCodes?.map((items, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        alignItems: 'center'
                      }}
                    >
                      <TouchableOpacity onPress={() => removeCoupon(index)}>
                        <Image source={Images.icons.close}
                          style={{ width: moderateScale(10), height: moderateScale(10) }}
                          resizeMode={'contain'}
                        >

                        </Image>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >

                        <Text
                          style={{
                            marginLeft: 10,
                            color: "black",
                            fontSize: moderateScale(14),
                          }}
                        >
                          {items.code}{" "}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: moderateScale(14),
                          }}
                        >
                          {" "}
                          {Tools.getPrice(
                            items.displayValue,
                            number_of_decimals,
                            currency
                          )}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  borderTopColor: "#000",
                  borderTopWidth: 1,
                  paddingVertical: 10,
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: moderateScale(14),
                  }}
                >
                  {t("Total")}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: moderateScale(14),
                    // fontFamily: Constants.fontFamilyBold,

                  }}
                >
                  {" "}
                  {Tools.getPrice(
                    _.isEmpty(discountCodes)
                      ? Number(
                        Number(totalPrice) +
                        Number(shippingMethod &&
                          shippingMethod.cost
                          ? shippingMethod &&
                          shippingMethod.cost
                          : 0)
                      )
                      : this.getDiscounts(),

                    number_of_decimals,
                    currency
                  )}
                </Text>
              </View>

              <View style={{ marginTop: moderateScale(20) }}>
                {_.isArray(payment) && payment.map((items, index) => {
                  return (
                    <View>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={{ position: 'absolute', top: 20 }}>
                          <RadioButton
                            animation={"bounceIn"}
                            size={10}
                            isSelected={Number(`2${index}`) == this.state.itemskey}
                            innerColor={primaryColor}
                            outerColor={primaryColor}
                            onPress={() => {
                              this.setState({
                                itemskey: Number(`2${index}`),
                                error: "",
                                nopayment: true
                              });
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.setState({
                            itemskey: Number(`2${index}`),
                            error: "",
                            nopayment: true
                          })}
                          style={{ width: contentWidth - contentWidth * 0.26, marginLeft: 24, borderWidth: 0.3 }}>
                          <View style={{
                            backgroundColor: Number(`2${index}`) == this.state.itemskey ? primaryColor : "white",
                            width: contentWidth - contentWidth * 0.265,
                            borderWidth: 1,
                            borderColor: primaryColor
                          }}>
                            <Text
                              style={{
                                color: Number(`2${index}`) == this.state.itemskey ? "white" : primaryColor,
                                fontWeight: "bold",
                                fontSize: moderateScale(16),
                                paddingVertical: moderateScale(8),
                                paddingHorizontal: moderateScale(10),
                              }}
                            >
                              {items.title}
                            </Text>

                          </View>
                          {Number(`2${index}`) == this.state.itemskey && <View style={{ flex: 1, marginLeft: 5 }}>
                            <HTML
                              tagsStyles={tagsStyles}
                              source={{ html: items.description }}
                              contentWidth={contentWidth - contentWidth * 0.32}
                            />
                          </View>}
                        </TouchableOpacity>
                      </View>

                    </View>
                  )
                })}
                {_.isArray(manual_payment) && manual_payment.map((items, index) => {
                  return (
                    <View>
                      <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ position: 'absolute', top: 20 }}>
                          <RadioButton
                            animation={"bounceIn"}
                            size={10}
                            isSelected={Number(`96${index}`) == this.state.itemskey}
                            innerColor={primaryColor}
                            outerColor={primaryColor}
                            onPress={() => {
                              this.setState({
                                itemskey: Number(`96${index}`),
                                error: "",
                                nopayment: true,
                                payCode: items?.code
                              });
                              clearHash()

                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              itemskey: Number(`96${index}`),
                              error: "",
                              nopayment: true,
                              payCode: items?.code

                            })
                            clearHash()

                          }}
                          style={{ width: contentWidth - contentWidth * 0.26, marginLeft: 24, borderWidth: 0.3 }}>
                          <View style={{
                            backgroundColor: Number(`96${index}`) == this.state.itemskey ? primaryColor : "white",
                            width: contentWidth - contentWidth * 0.265,
                            borderWidth: 1,
                            borderColor: primaryColor
                          }}>
                            <Text
                              style={{
                                color: Number(`96${index}`) == this.state.itemskey ? "white" : primaryColor,
                                fontWeight: "bold",
                                fontSize: moderateScale(16),
                                paddingVertical: moderateScale(8),
                                paddingHorizontal: moderateScale(10),
                              }}
                            >
                              {items.title}
                            </Text>

                          </View>
                          {Number(`96${index}`) == this.state.itemskey && <View style={{ flex: 1, marginLeft: 5 }}>
                            <HTML
                              tagsStyles={tagsStyles}

                              source={{ html: items.description }}
                              contentWidth={contentWidth - contentWidth * 0.32}
                            />
                          </View>}
                        </TouchableOpacity>
                      </View>

                    </View>
                  )
                })}
                {bnpl && bnpl.map((items, index) => {
                  return (
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <RadioButton
                        animation={"bounceIn"}
                        size={10}
                        isSelected={index + 1 == this.state.itemskey}
                        innerColor={primaryColor}
                        outerColor={primaryColor}
                        onPress={() => {
                          this.setState({
                            itemskey: index + 1,
                            error: "",
                            nopayment: false,
                            service: items?.title
                          });
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({
                          itemskey: index + 1,
                          error: "",
                          nopayment: false,
                          service: items?.title

                        })}
                        style={{
                          backgroundColor: index + 1 == this.state.itemskey ? primaryColor : 'white',
                          margin: moderateScale(10),
                          width: '90%',
                          borderWidth: 1,
                          borderColor: primaryColor
                        }}>
                        <Text
                          style={{
                            color: index + 1 == this.state.itemskey ? "white" : primaryColor,
                            fontWeight: "bold",
                            fontSize: moderateScale(16),
                            paddingVertical: moderateScale(8),
                            paddingHorizontal: moderateScale(10),
                          }}
                        >
                          {items.title}
                        </Text>
                      </TouchableOpacity>
                    </View>)
                })}
              </View>
            </View>


            {/* <View
              style={[styles.row, styles.borderBottom, { paddingBottom: 20 }]}
            >
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginBottom: userInfo?.defaultAddress?.id ? 5 : 25,
                  }}
                  onPress={() => {
                    this.setState({ showitem2: !showitem2 });
                  }}
                >
                  <Icon
                    style={[
                      styles.icon,
                      I18nManager.isRTL && {
                        transform: [{ rotate: "180deg" }],
                      },
                    ]}
                    color="#000"
                    size={22}
                    name={
                      !showitem2 ? "chevron-small-right" : "chevron-small-down"
                    }
                  />
                  <Text style={[styles.label, { marginVertical: 3 }]}>
                    {Languages.ShippingAddress.toUpperCase()}
                  </Text>
                </TouchableOpacity>
                {showitem2 && (
                  <ShippingAddress
                    handlePressAdd={() =>
                      this.props.navigation.push("UserAddressFormScreen")
                    }
                    primaryColor={primaryColor}
                    loggedin={userInfo && userInfo.access_token}
                    shippingAddress={userInfo ? userInfo.defaultAddress : null}
                  />
                )}
              </View>
            </View> */}
            {/*<View style={[styles.row, styles.borderBottom]}>
               <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showitem: !showitem });
                  }}
                  style={{ flexDirection: "row", marginBottom: 5 }}
                >
                  <Icon
                    style={[
                      styles.icon,
                      I18nManager.isRTL && {
                        transform: [{ rotate: "180deg" }],
                      },
                    ]}
                    color="#000"
                    size={22}
                    name={
                      !showitem ? "chevron-small-right" : "chevron-small-down"
                    }
                  />
                  <Text style={[styles.label]}>{"Prefered Delivery Date"}</Text>
                </TouchableOpacity>
                {showitem && (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "83%",
                      }}
                    >
                      <Text style={{ marginVertical: 10 }}>
                        {moment(date).format("DD-MM-YYYY")}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ show: true });
                        }}
                      >
                        <Text
                          style={[
                            styles.label2,
                            {
                              color: primaryColor,
                              fontSize: 12,
                              marginVertical: 10,
                            },
                          ]}
                        >
                          CHANGE
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {time_enabled == "yes" && (
                      <View>
                        {deliverydate?.timeslots?.map((slots) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                marginLeft: 10,
                                marginVertical: 5,
                              }}
                            >
                              <RadioButton
                                animation={"bounceIn"}
                                isSelected={
                                  selecteddate?.timeslot == slots.timeslot
                                }
                                size={10}
                                innerColor={primaryColor}
                                outerColor={primaryColor}
                                onPress={() => {
                                  this.setState({
                                    selecteddate: slots,
                                  });
                                  setselecteddate(
                                    deliverydate &&
                                      deliverydate.timeslots &&
                                      deliverydate.timeslots[0] &&
                                      deliverydate.timeslots[0].timeslot
                                  );
                                }}
                              />
                              <Text style={{ marginLeft: 10 }}>
                                {slots.timeslot}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </>
                )}
              </View>

            
            </View> */}
            {show && (
              <DateTimePicker
                value={date ? date : new Date(moment().add(dayr, "day"))}
                minimumDate={new Date(moment().add(dayr, "day"))}
                mode={"date"}
                display="default"
                onChange={this.onChange}
              />
            )}
            <View style={{ height: 100 }}></View>
            {/* <View style={[styles.row, styles.borderBottom]}>
              <View>
                <TouchableOpacity
                  style={{ flexDirection: "row", marginBottom: 5 }}
                  onPress={() => {
                    this.setState({ showitem3: !showitem3 });
                  }}
                >
                  <Icon
                    style={[
                      styles.icon,
                      I18nManager.isRTL && {
                        transform: [{ rotate: "180deg" }],
                      },
                    ]}
                    color="#000"
                    size={22}
                    name={
                      !showitem3 ? "chevron-small-right" : "chevron-small-down"
                    }
                  />
                  <Text style={[styles.label]}>
                    {"Shipping Method".toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.row, styles.borderBottom]}>
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showitem4: !showitem4 });
                  }}
                  style={{ flexDirection: "row", marginBottom: 5 }}
                >
                  <Icon
                    style={[
                      styles.icon,
                      I18nManager.isRTL && {
                        transform: [{ rotate: "180deg" }],
                      },
                    ]}
                    color="#000"
                    size={22}
                    name={
                      !showitem4 ? "chevron-small-right" : "chevron-small-down"
                    }
                  />
                  <Text style={[styles.label]}>
                    {"Apply Coupon".toUpperCase()}
                  </Text>
                </TouchableOpacity>
                {showitem4 && (
                  <View>
                    <CouponInput
                      shipping_id={this.state.shippingMethod?.id}
                      site_token={token}
                      extrastyle={{ color: primaryColor }}
                      setcoupans={setcoupans}
                      cartItems={cartItems}
                      access_token={access_token}
                      email={email}
                      customer_id={userInfo?.data?.id}
                    />
                    {!_.isEmpty(discount) && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                        }}
                      >
                        Saved{" "}
                        {Tools.getPrice(
                          Number(discount),

                          number_of_decimals,
                          currency
                        )}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View> */}
          </ScrollView>

          <View style={[styles.row, styles.summary]}>
            <Text style={parentStyle.label}>{Languages.TotalPrice}</Text>
            <Animatable.Text animation="fadeInDown" style={parentStyle.value}>
              {Tools.getPrice(
                _.isEmpty(discount)
                  ? Number(
                    Number(totalPrice) +
                    Number(this.state.shippingMethod.cost)
                  )
                  : Number(
                    Number(totalPrice) +
                    Number(this.state.shippingMethod.cost) -
                    Number(discount)
                  ),

                number_of_decimals,
                currency
              )}
            </Animatable.Text>
          </View>
        </View >

        <Button
          style={[
            Styles.Common.CheckoutButtonBottom,
            { backgroundColor: primaryColor },
          ]}
          text={t('Placeorder')}
          onPress={() => {

            if (!userInfo) {

              if (this.state.nopayment) {
                if (this.state.delivery != "") {
                  let valided = true
                  if (sameset) {
                    if (staticAddress?.phone_number?.length < 6) {
                      valided = false
                    }
                    if (staticAddress?.name?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.address?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.country?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.zipcode?.length == 0) {
                      valided = false
                    }
                    if (city_enabled == "yes" && staticAddress?.city?.length == 0) {
                      valided = false
                    }
                    if (state_enabled == "yes" && staticAddress?.state?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.bphonenumber?.length < 6) {
                      valided = false
                    }
                    if (staticAddress?.bfullname?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.billing_address?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.billing_country?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.billing_zipcode?.length == 0) {
                      valided = false
                    }
                    if (city_enabled == "yes" && staticAddress?.billing_city?.length == 0) {
                      valided = false
                    }
                    if (state_enabled == "yes" && staticAddress?.billing_state?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.email?.length == 0 || staticAddress?.email == undefined) {
                      valided = false
                    }
                  } else {
                    if (staticAddress?.phone_number?.length < 6) {
                      valided = false
                    }
                    if (staticAddress?.email?.length == 0 || staticAddress?.email == undefined) {
                      valided = false
                    }
                    if (staticAddress?.name?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.address?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.country?.length == 0) {
                      valided = false
                    }
                    if (staticAddress?.zipcode?.length == 0) {
                      valided = false
                    }
                    if (city_enabled == "yes" && staticAddress?.city?.length == 0) {
                      valided = false
                    }
                    if (state_enabled == "yes" && staticAddress?.state?.length == 0) {
                      valided = false
                    }
                  }
                  if (valided) {
                    let newAddress = {};
                    if (sameset) {
                      newAddress = {
                        //  type: type||'billing',
                        phone_number: staticAddress?.phone_number,
                        name: staticAddress?.name,
                        address: staticAddress?.address,
                        city: city_enabled == "yes" ? staticAddress?.city : "",
                        state: state_enabled == "yes" ? staticAddress?.state : "",
                        country: staticAddress?.country,
                        country_code: staticAddress?.country_code,
                        zipcode: staticAddress?.zipcode,
                        addbill: true,
                        billing_address: staticAddress?.billing_address,
                        billing_city: city_enabled == "yes" ? staticAddress?.billing_city : "",
                        bfullname: staticAddress?.bfullname,
                        bphonenumber: staticAddress?.bphonenumber,
                        billing_country: staticAddress?.billing_country,
                        billing_zipcode: staticAddress?.billing_zipcode,
                        bcountry_code: staticAddress?.bcountry_code,
                        billing_state: state_enabled == "yes" ? staticAddress?.billing_state : "",
                      };
                    } else {
                      newAddress = {
                        // type: type||'billing',
                        phone_number: staticAddress?.phone_number,
                        name: staticAddress?.name,
                        address: staticAddress?.address,
                        city: city_enabled == "yes" ? staticAddress?.city : "",
                        state: state_enabled == "yes" ? staticAddress?.state : "",
                        country: staticAddress?.country,
                        country_code: staticAddress?.country_code,
                        zipcode: staticAddress?.zipcode,
                      };
                    }
                    this.createAccount({
                      address: newAddress,
                      emailAdress: staticAddress?.email
                    })
                  } else {
                    toast('Complete Your Details')
                  }

                  //setvalidates3(true);
                } else {
                  console.log("88PPPMM")

                  this.setState({ error: t("SPDD") });
                  toast(t("SPDD"))
                }
              } else {
                toast(t("SPDD"))

                this.setState({ error: t("SPDD") });
              }
            } else {

              if (this.state.nopayment) {
                console.log("ELESN EN")
                this.beforeCreateCheck();
              } else {
                console.log("INMMMM EN")

                this.setState({ overlayloaders: true })
                let amounts = _.isEmpty(discountCodes)
                  ? Number(
                    Number(this.props.totalPrice) +
                    Number(
                      shippingMethod &&
                        shippingMethod.cost
                        ? shippingMethod &&
                        shippingMethod.cost
                        : 0
                    )
                  )
                  : this.getDiscounts()
                let finalAmt = Number(parseFloat(amounts))
                checkoutOutOfserviceFree({
                  email, access_token,
                  amount: finalAmt,
                  service: this.state.service
                }, (res) => {
                  toast(res?.msg)
                  this.setState({ overlayloaders: false })
                  this.setState({ error: res?.msg });


                })
              }
            }
          }}
          isLoading={this.state.overlayloaders}
          textStyle={Styles.Common.CheckoutButtonText}
          type="bottom"
        />
      </View >
    );
  }
}
