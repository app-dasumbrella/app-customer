/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { isEmpty, cloneDeep } from "lodash";
import CheckBox from "@react-native-community/checkbox";
import * as Animatable from "react-native-animatable";
import DropDownPicker from "react-native-dropdown-picker";

//import Tcomb from "tcomb-form-native";
import {
  removeCartItem,
  checkoutLinkUser,
  updateCheckoutShippingAddress,
  logoutUserAndCleanCart,
  createUserAddress,
  updateUserAddress,
  updateUserDefaultAddress,
  getUserInfo,
  deleteUserAddress,
  getOrders,
  setAdressStatic
} from "@redux/operations";
import { getAddressInput } from "@redux/selectors";
import { Validator, Languages, Tools, Styles, Color, Constants } from "@common";
import { Button } from "@components";
import { toast } from "../Omni";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { t } from "i18next";
import { moderateScale, verticalScale } from "react-native-size-matters";


const { width, height } = Styles.window;
const vh = height / 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  rowEmpty: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  label: {
    marginTop: moderateScale(5),
    marginBottom: verticalScale(5),
    fontSize: moderateScale(15),
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
    fontWeight: 'bold'
  },
  headers: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
  },
  formContent: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 50,
  },
  inputWrap: {
    // flexDirection: "row",
    borderColor: Color.blackTextDisable,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    color: Color.blackTextPrimary,
    borderColor: "#9B9B9B",
    height: 44,
    padding: 10,
    flex: 1,
    textAlign: "left",
    letterSpacing: 1,
    fontSize: 15,
  },
  firstInput: {
    alignItems: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? -20 : 10,
    right: 20,
    left: 20,
  },
  inputAndroid: {
    width: width - 50,
    height: vh * 7,
    paddingLeft: 10,
    marginTop: 10,
    position: "relative",
  },
  lastInput: {
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? -20 : 10,
    right: 20,
    left: 20,
  },
  btnNextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  btnNextText: {
    fontWeight: "bold",
  },
  picker: {
    width: width - 80,
  },
  formAddress: {
    borderColor: "#d4dce1",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 200,
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  formContainer: {
    padding: 0,
  },
  bottomView: {
    height: 44,
    borderTopWidth: 1,
    borderTopColor: "#f3f7f9",
    width: Styles.window.width,
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.BuyNowButton,
    flex: 1,
  },
});



const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: "transparent",
  placeholderTextColor: Color.blackTextSecondary,
};

function AddressModal(props) {
  let propsAdd = props?.navigation?.getParam("address", {}) || props
  const {
    showemail,
    fromCheckout,
    sameAddressUpdate,
    address,
    accessToken,
    userInfo,
    order,
    app,
    cancel,
    callbackFromCheckout,
    setOpenPanel,
    validates3,
    refAdd,
    paddNavheight,
    setAdressStatic,
    userDummy,
    staticAddress
  } = props;
  let { theme } = app || {}
  let { primaryColor } = theme || {}
  const { access_token, email, LoggedUser } = userInfo || {};
  let kname = userInfo && userInfo.data && userInfo.data.name || ''
  let { state_enabled, city_enabled, countries } = app || {};
  const [selectedTab, setselectedTab] = useState("Shipping Address");
  const [showaddress, setAddress] = useState(false);
  const [fullname, setfullname] = useState(propsAdd?.address?.name || kname || staticAddress?.name || "");
  const [phonenumber, setphonenumber] = useState(propsAdd?.phone_number || propsAdd?.phonenumber || "");
  const [streetaddress, setstreetaddress] = useState(propsAdd?.address?.address1 || propsAdd?.streetaddress || "");
  const [bfullname, setbfullname] = useState(propsAdd?.address?.name || kname || "");
  const [bphonenumber, setbphonenumber] = useState(propsAdd?.phonenumber || "");
  const [Town, setTown] = useState(propsAdd?.address?.Town || propsAdd?.address?.city || "");
  const [province, setprovince] = useState(propsAdd?.address?.province || propsAdd?.address?.state || "");
  const [ZIP, setZIP] = useState(propsAdd?.address?.zipcode || propsAdd?.ZIP || "");
  const [Region, setRegion] = useState(props.Region || "");
  const [validated, setValidated] = useState(validates3 || false);
  const [updatedadd, setupdatedadd] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailAdress, setemailAdress] = useState(props.email || email || staticAddress?.email || "");
  const [country_code, setcountry_code] = useState(propsAdd?.address?.country_code || "");
  const [bcountry_code, setbcountry_code] = useState(propsAdd?.address?.country_code || "");
  const [reason, setreason] = useState("");

  const [addressId, setaddressId] = useState(propsAdd?.id || "");
  const [sameAddress, setsameAddress] = useState(sameAddressUpdate || false);
  const [shipping_name, setshipping_name] = useState(props.shipping_name || "");

  const [billing_address, setbilling_address] = useState(
    props.billing_address || ""
  );
  const [billing_city, setbilling_city] = useState(props.billing_city || "");
  const [billing_country, setbilling_country] = useState(
    props.billing_country || ""
  );
  const [billing_zipcode, setbilling_zipcode] = useState(
    props.billing_zipcode || ""
  );
  const [billing_state, setbilling_state] = useState(props.billing_state || "");
  const [err, setError] = useState("");
  useEffect(() => {
    if (LoggedUser) {

      setfullname(kname)
      setemailAdress(email)
    } else {
      setemailAdress(staticAddress?.email || userDummy?.email || email)
    }
  }, [userInfo])
  const setDummyAdd = (val) => {
    if (!LoggedUser || userInfo?.addresses?.length == 0) {
      setAdressStatic({
        phone_number: phonenumber,
        name: fullname,
        address: streetaddress,
        city: city_enabled == "yes" ? Town : "",
        state: state_enabled == "yes" ? province : "",
        country: Region,
        country_code: country_code,
        zipcode: ZIP,
        email: val,
        billing_address,
        billing_city: city_enabled == "yes" ? billing_city : "",
        bfullname,
        bphonenumber,
        billing_country,
        billing_zipcode,
        bcountry_code,
        billing_state: state_enabled == "yes" ? billing_state : "",
      })
    }
  }
  let ref = React.useRef(null);

  let countriesT = []
  countries.map(item => {
    if (countriesT?.filter(i => i.label == item.label)?.length == 0)
      countriesT.push({ ...item, value: item?.label })
  })

  let {
    getOrders,
    deleteUserAddress,
    isloading,
    getUserInfo,
    onHide,
    isFetching,
    type,
    updateUserDefaultAddress,
  } = props || {};

  useEffect(() => {
    if (countries && countries.length == 1) {
      setRegion(countries && countries[0] && countries[0].label);
      setcountry_code(countries && countries[0] && countries[0].code);
    }
  }, []);
  console.log(countries)
  // useEffect(() => {
  //   if (validates3) {
  //     ref && ref.current && ref.current.click();
  //   }
  // }, [validates3]);
  const handleSubmit = () => {
    try {
      let newAddress = {};
      if (sameAddress) {
        newAddress = {
          //  type: type||'billing',
          phone_number: phonenumber,
          name: fullname,
          address: streetaddress,
          city: city_enabled == "yes" ? Town : "",
          state: state_enabled == "yes" ? province : "",
          country: Region,
          country_code: country_code,
          zipcode: ZIP,
          addbill: true,
          billing_address,
          billing_city: city_enabled == "yes" ? billing_city : "",
          bfullname,
          bphonenumber,
          billing_country,
          billing_zipcode,
          bcountry_code,
          billing_state: state_enabled == "yes" ? billing_state : "",
        };
      } else {
        newAddress = {
          // type: type||'billing',
          phone_number: phonenumber,
          name: fullname,
          address: streetaddress,
          city: city_enabled == "yes" ? Town : "",
          state: state_enabled == "yes" ? province : "",
          country: Region,
          country_code: country_code,
          zipcode: ZIP,
        };
      }

      //  refAdd?.current?.scrollIntoView({ behavior: 'smooth', top: 0 })

      if (fromCheckout) {
        callbackFromCheckout(false, "");
      }

      setValidated(true);
      if (fromCheckout) {
        callbackFromCheckout(true, {
          address: newAddress,
          emailAdress
        });
      } else {
        if (addressId != "") {
          props.updateUserAddress(
            {
              address: newAddress,
              customer_address_id: addressId,
              email,
              access_token,
              customer_id: userInfo.data.id,
            },
            (data) => {
              if (data && data.customerAddress) {
                props.navigation.pop()

              } else {
                toast(data?.response?.data?.msg);
              }
            }
          );
        } else {
          props.createUserAddress(
            {
              address: newAddress,
              email,
              access_token,
              customer_id: userInfo.data.id,
              LoggedUser
            },
            (data) => {

              if (data.err) {
                //setreason(data.reason);
              }
              if (data && data.customerAddress) {
                props.navigation.pop()
                //  updateUserDefaultAddress({
                //   id: data.customerAddress.id,
                //   address: data.customerAddress,
                // });



              } else {
                toast(data?.response?.data?.msg);
              }
            }
          );
        }
      }
    } catch (err) {
      console.log("err", err)
    }
  };

  const clear = () => {
    setAddress(false);
    setRegion("");
    setZIP("");
    setfullname("");
    setphonenumber("");
    setstreetaddress("");
    setTown("");
    setupdatedadd(false);
    setprovince("");
    setaddressId("");
  };

  return (
    <View style={{ paddingHorizontal: '5%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="none"
      //  contentContainerStyle={{ height: height }}
      >
        <View style={styles.rowEmpty}>
          {/* <Text style={styles.label}>
              {Languages.YourDeliveryInfo.toUpperCase()}
            </Text> */}
        </View>
        <Text style={styles.label}> {type == "shipping" ? t("RecipientName") : t("Name")} *</Text>
        <View style={styles.inputWrap}>

          <TextInput
            {...commonInputProps}
            ref={(comp) => (this.username = comp)}
            placeholder={t("Entername")}
            onChangeText={(e) => {
              setDummyAdd()
              setfullname(e)
            }}

            value={fullname}
          />
        </View>
        <Text style={styles.label}> {t("Phonenumber")} *</Text>
        <View style={styles.inputWrap}>

          <TextInput
            {...commonInputProps}
            placeholder={t("Phonenumber")}
            value={phonenumber}
            keyboardType={'number-pad'}
            onChangeText={(e) => {
              const re = /^[0-9+\b]+$/;
              if (e === '' || re.test(e)) {
                setDummyAdd()
                setphonenumber(e)
              }
            }}

          />
        </View>
        {showemail &&
          <>
            <Text style={styles.label}>{t("Email")} *</Text>

            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                placeholder="Email"
                value={emailAdress}
                required
                onChangeText={(e) => {
                  setDummyAdd(e)
                  setemailAdress(e)
                }}
              />
            </View>
          </>
        }
        <Text style={styles.label}>{t("Streetaddress")} *</Text>

        <View style={styles.inputWrap}>
          <TextInput
            {...commonInputProps}
            placeholder={t("HOUSE")}
            value={streetaddress}
            required
            onChangeText={(e) => {
              setDummyAdd()
              setstreetaddress(e)
            }}
          />
        </View>


        {city_enabled == "yes" && (
          <>
            <Text style={styles.label}>{t("TOWN")} *</Text>

            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                placeholder=""
                value={Town}
                onChangeText={(e) => {
                  setDummyAdd()
                  setTown(e)
                }}
              />
            </View>
          </>

        )}
        {state_enabled == "yes" && (<>
          <Text style={styles.label}>{t("State")} *</Text>

          <View style={styles.inputWrap}>
            <TextInput
              {...commonInputProps}
              placeholder=""
              value={province}
              onChangeText={(e) => {
                setDummyAdd()
                setprovince(e)
              }}
            />
          </View>
        </>
        )}
        <Text style={styles.label}>{t("ZIP")} *</Text>

        <View style={styles.inputWrap}>
          <TextInput
            {...commonInputProps}
            placeholder=""
            value={ZIP}
            onChangeText={(e) => {
              setDummyAdd()
              setZIP(e)
            }}
          />
        </View>
        <Text style={styles.label}>{t("Country")} *</Text>

        {countries?.length != 1 ? <DropDownPicker
          dropDownContainerStyle={{
            backgroundColor: "#fff",
          }}
          open={open}
          value={Region

          }
          placeholder={'Select a country'}
          items={countriesT}
          setOpen={() => setOpen(!open)}
          setValue={setRegion}
          onClose={() => setOpen(false)}
        />
          :
          <View style={styles.inputWrap}>
            <TextInput
              {...commonInputProps}
              placeholder=""
              value={Region}
              onChangeText={(e) => {
                setDummyAdd()
                setRegion(e)
              }}
            />
          </View>}



        {fromCheckout && <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CheckBox
            style={{ borderWidth: 1, borderColor: 'black' }}
            disabled={false}
            tintColors={'black'}
            value={sameAddress}
            onValueChange={(newValue) => {
              props.setP(newValue)
              setsameAddress(newValue)
              setbilling_address(staticAddress?.billing_address || '')
              setbilling_country(staticAddress?.billing_country || '')
              setbilling_zipcode(staticAddress?.billing_zipcode || '')
              setbilling_city(staticAddress?.billing_city || '')
              setbilling_state(staticAddress?.billing_state || '')
              setbcountry_code(staticAddress?.bcountry_code || '')
              setsameAddress(sameAddress ? false : true);
            }}
          />
          <Animatable.Text
            animation="fadeInDown"
            style={[
              {
                color: 'black',
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 5,
                fontSize: moderateScale(14),
              },
            ]}
          >
            {t("ShippingAddressDiff")}
          </Animatable.Text>


        </View>}
        {/* <Dropdown
                  value={Region}
                  options={countries}
                  onChange={(e) => {
                    let code =
                      countries && countries.filter((i) => i.label == e.value);
                    setRegion(e.value);
                    setcountry_code(code && code[0] && code[0].code);
                    setDummyAdd()
                  }}
                  placeholder={t("Selectacountry")}
                />
                {validated && Region == "" && <Form.Label className="mt-1 ml-1" style={{
                  color: 'red', fontWeight: '500',

                }}>{'Select a country'}</Form.Label>} */}



        {/* {fromCheckout && (
              <Form.Group as={Col} className="mb-3 p-0 ">
                <Form.Check
                  type="checkbox"
                  label={t("ShippingAddressDiff")}
                  checked={sameAddress}
                  onChange={() => {
                    setselectedTab(
                      !sameAddress ? "Shipping Address" : "Billing Address"
                    );
                    setbilling_address(staticAddress?.billing_address || '')
                    setbilling_country(staticAddress?.billing_country || '')
                    setbilling_zipcode(staticAddress?.billing_zipcode || '')
                    setbilling_city(staticAddress?.billing_city || '')
                    setbilling_state(staticAddress?.billing_state || '')
                    setbcountry_code(staticAddress?.bcountry_code || '')
                    setsameAddress(sameAddress ? false : true);
                  }}
                />
              </Form.Group>
            )} */}

        {/* {fromCheckout && sameAddress && (
              <div className="mt-4 mb-4 primarycolor">
                <span>
                  <strong className="text-uppercase">
                    {"Shipping Address"}
                  </strong>
                </span>
              </div>
            )} */}
        {fromCheckout && sameAddress && <Text style={styles.headers}> SHIPPING ADDRESS</Text>}

        {sameAddress && (
          <>
            <Text style={styles.label}> {type == "shipping" ? t("RecipientName") : t("Name")} *</Text>
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.username = comp)}
                placeholder={t("Entername")}
                onChangeText={(e) => {
                  setDummyAdd()
                  setbfullname(e)
                }}

                value={bfullname}
              />
            </View>
            <Text style={styles.label}> {t("Phonenumber")} *</Text>
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                placeholder={t("Phonenumber")}
                value={bphonenumber}
                onChangeText={(e) => {
                  const re = /^[0-9+\b]+$/;
                  if (e === '' || re.test(e)) {
                    setDummyAdd()
                    setbphonenumber(e)
                  }
                }}
              />
            </View>
            <Text style={styles.label}>{t("Streetaddress")} *</Text>
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                placeholder={t("HOUSE")}
                value={billing_address}
                required
                onChangeText={(e) => {
                  setDummyAdd()
                  setbilling_address(e)
                }}
              />
            </View>

            {city_enabled == "yes" && (<>
              <Text style={styles.label}>{t("TOWN")} *</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  placeholder=""
                  value={billing_city}
                  onChangeText={(e) => {
                    setDummyAdd()
                    setbilling_city(e)
                  }}
                />
              </View>
            </>
            )}
            {state_enabled == "yes" && (<>
              <Text style={styles.label}>{t("State")} *</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  placeholder=""
                  value={billing_state}
                  onChangeText={(e) => {
                    setDummyAdd()
                    setbilling_state(e)
                  }}
                />
              </View>
            </>
            )}
            <Text style={styles.label}>{t("ZIP")} *</Text>
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                placeholder=""
                value={billing_zipcode}
                onChangeText={(e) => {
                  setDummyAdd()
                  setbilling_zipcode(e)
                }}
              />
            </View>
            <Text style={styles.label}>{t("Country")} *</Text>
            {countries?.length != 1 ? <DropDownPicker
              dropDownContainerStyle={{
                backgroundColor: "#fff",
              }}
              open={open}
              value={Region

              }
              placeholder={'Select a country'}
              items={countriesT}
              setOpen={() => setOpen(!open)}
              setValue={setRegion}
              onClose={() => setOpen(false)}
            />
              :
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  placeholder=""
                  value={Region}
                  onChangeText={(e) => {
                    setDummyAdd()
                    setRegion(e)
                  }}
                />
              </View>}




            {/* <Dropdown
                  value={billing_country}
                  options={countries}
                  onChange={(e) => {
                    let code =
                      countries && countries.filter((i) => i.label == e.value);
                    setbilling_country(e.value);
                    setbcountry_code(code && code[0] && code[0].code);
                    setDummyAdd()
                  }}
                  placeholder={t("Selectacountry")}
                /> */}

          </>
        )}
        {/* 
        <Form.Row>
      
        </Form.Row> */}
        {/* <Row className="justify-content-center ">
            <div>{reason}</div>
          </Row>
          <Row className="justify-content-center ">
            {(isloading || isFetching) && <Spinner animation="border" />}
          </Row> */}


        {/* <GooglePlacesAutocomplete
            fetchDetails
              placeholder="Search Address"
              onPress={(data, details = null) => {
                // {"location": {"lat": 1.3239884, "lng": 103.7920182}, "viewport": {"northeast": {"lat": 1.325337380291502, "lng": 103.7933671802915}, "southwest": {"lat": 1.322639419708498, "lng": 103.7906692197085}}}
                // LOG  {"address_components": [{"long_name": "Sixth Avenue", "short_name": "Sixth Ave", "types": [Array]}, {"long_name": "Bukit Timah", "short_name": "Bukit Timah", "types": [Array]}, {"long_name": "Singapore", "short_name": "Singapore", "types": [Array]}, {"long_name": "Singapore", "short_name": "SG", "types": [Array]}], "adr_address": "<span class=\"street-address\">Sixth Ave</span>, <span class=\"country-name\">Singapore</span>", "formatted_address": "Sixth Ave, Singapore", "geometry": {"location": {"lat": 1.3239884, "lng": 103.7920182}, "viewport": {"northeast": [Object], "southwest": [Object]}}, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png", "icon_background_color": "#7B9EB0", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet", "name": "Sixth Avenue", "place_id": "EhRTaXh0aCBBdmUsIFNpbmdhcG9yZSIuKiwKFAoSCRERDWJ2GtoxEQYSGXODQnnTEhQKEgl1k4uKIxHaMRHE9atSz2l4iA", "reference": "EhRTaXh0aCBBdmUsIFNpbmdhcG9yZSIuKiwKFAoSCRERDWJ2GtoxEQYSGXODQnnTEhQKEgl1k4uKIxHaMRHE9atSz2l4iA", "types": ["route"], "url": "https://maps.google.com/?q=Sixth+Ave,+Singapore&ftid=0x31da1a76620d1111:0xd379428373191206", "utc_offset": 480, "vicinity": "Singapore"}
                //console.log(details&&details.geometry);
                let value = {...this.state.value,
                  address1: details&&details.address_components&&details.address_components&&details.address_components[0].long_name,
                  city:details&&details.address_components&&details.address_components&&details.address_components[1].long_name,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng, 
                  country: details&&details.address_components&&details.address_components&&details.address_components[2].long_name,
                };
                this.setState({value,details });
              }}
            
              query={{
                key: "AIzaSyB3Vubk-11kWQXWYexHCLdRuaIvKSkD8dU",
                language: "en",
                components: "country:sg|country:my",
                types: 'address',
              }}
              //  referer='https://shop.dev.originmattress.com.my/'
              // requestUrl={{
              //   useOnPlatform: 'web', // or "all"
              //   url:
              //     'https://shop.dev.originmattress.com.my/'
              // }}
              enablePoweredByContainer={false}
            /> */}
        {!fromCheckout && <View style={{ marginBottom: 150 }}>
          {!fromCheckout && <Button
            //inactive={this.state.added}
            //disabled={this.state.added}
            style={[Styles.Common.CheckoutButtonBottom, { backgroundColor: primaryColor, marginTop: moderateScale(15) }]}
            text={addressId == "" ? `${t("Add")} ${t("Address")}` : `${t("Update")} ${t("Address")}`}
            onPress={() => handleSubmit()}
          //isLoading={this.props.isFetching}
          //type="bottom"
          />}
        </View>}
      </ScrollView>

      {!fromCheckout && <View style={{ marginBottom: 100 }}></View>}
    </View>
  );
}

const mapStateToProps = ({ carts, country, user, app }) => {
  return {
    cartItems: carts.cartItems,
    totalPrice: carts.totalPrice,
    checkoutId: carts.checkoutId,
    isFetching: carts.isFetching,
    isloading: user.isFetching,
    countries: country.list,
    accessToken: user.accessToken,
    userInfo: user.userInfo,
    order: carts.order,
    app: app && app.settings,
    userDummy: user?.dummyAddress,
    staticAddress: user?.staticAddress


  };
};

export default connect(mapStateToProps, {
  removeCartItem,
  checkoutLinkUser,
  logoutUserAndCleanCart,
  createUserAddress,
  updateCheckoutShippingAddress,
  updateUserAddress,
  updateUserDefaultAddress,
  deleteUserAddress,
  getUserInfo,
  getOrders,
  setAdressStatic
})(AddressModal);

