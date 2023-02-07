/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { Languages } from "@common";
import { cleanCart, verifySuccess } from "../actions";
import * as actions from "./actions";
import * as actions2 from "../user/actions";
import { checkCardExisted, formatCreditCard } from "./utils";
import Api, { api2, loadtoken } from "../../services/Api";
import axios from "axios";
import { Base64 } from "js-base64";
import base64 from "react-native-base64";
import { Platform } from "react-native";
const Buffer = require("buffer").Buffer;

/**
 * @function getPaymentSettings get payment setting
 */
export const getPaymentSettings = () => (dispatch) => {
  try {
    dispatch(actions.paymentSettingPending());
  } catch (error) {
    dispatch(actions.paymentSettingFailure(error));
  }
};

/**
 * @function addCreditCard add credit card with webservice
 * @param {Object} params {cardVaultUrl, creditCard}
 */
export const addCreditCard = (params) => (dispatch) => {
  try {
    dispatch(actions.addCreditCardPending());
  } catch (error) {
    dispatch(actions.addCreditCardFailure(error));
  }
};

export const gettimeslots = (payload, callback) => (dispatch) => {
  try {
    Api.post("/deliverydate/status", payload).then((response) => {
      if (response?.status != 200) {
        Api
          .post("/setting", { lang: payload.lang })
          .then((res) => {
            Api.post("/deliverydate/status", { site_token: res.data?.site?.token }).then((response2) => {
              dispatch(actions.deliverydateSuccess(response2.data));
              callback({ err: false, data: response2.data });
            })
          })
      } else {
        if (response.data && response.data) {
          dispatch(actions.deliverydateSuccess(response.data));
          callback({ err: false, data: response.data });
        }
      }
    });
  } catch (error) {
    //console.log(error);
    dispatch(actions.addCreditCardFailure(error));
  }
};

/**
 * @function checkoutWithCreditcard
 */
export const checkoutWithCreditcard =
  ({ checkoutId, payment }) =>
    (dispatch) => {
      try {
        dispatch(actions.completeCreditCardPending());
      } catch (error) {
        dispatch(actions.completeCreditCardFailure(error));
      }
    };

/**
 * @function checkoutFree
 */
export const checkoutFree =
  (
    {
      cartItems,
      coupans,
      access_token,
      selectedtimeslot,
      email,
      customer_address_id,
      delivery,
      site_shipping_id,
      payment,
      billingid,
      notes,
      time_enabled,
      showroom_code,
      lang,
      payCode

    },
    callback
  ) =>
    (dispatch) => {
      try {
        let products = [],
          addons = [];
        let couponsarray = [];
        coupans?.map(dt => {
          if (dt != "" && dt != undefined) {
            couponsarray.push({ code: dt.code });
          }
        })
        //const slots = selectedtimeslot.split("-");
        cartItems.map((item) => {
          products.push({
            id: item.variant.id,
            quantity: item.quantity,
            delivery_date: delivery,
            time_start:
              time_enabled == "yes"
                ? selectedtimeslot && selectedtimeslot.start
                : "",
            time_end:
              time_enabled == "yes"
                ? selectedtimeslot && selectedtimeslot.end
                : "",
            is_addon: 0,
            addon_for_product: "",
          });
          item &&
            item.addon.map((itaddd) => {
              if (itaddd && itaddd.id) {
                products.push({
                  id: itaddd.id,
                  quantity: itaddd.quantity,
                  delivery_date: delivery,
                  time_start: time_enabled == "yes" ? selectedtimeslot.start : "",
                  time_end: time_enabled == "yes" ? selectedtimeslot.end : "",
                  is_addon: 1,
                  addon_for_product: item.variant.parent_id,
                });
                // addons.push({
                //   id: itaddd.id,
                //   quantity: item.quantity,
                // });
              }
            });
        });

        dispatch(actions.completeFreePending());
        let bilID = billingid == "" ? customer_address_id : billingid
        let payload = {
          access_token,
          email,
          customer_address_id,
          products,
          coupons: couponsarray,
          site_shipping_id,
          customer_billing_address_id: bilID,

          note: notes,
          source: showroom_code?.code ? "showroom" : "",
          showroom_code: showroom_code?.code ? showroom_code?.code : "",
          lang,
          pay_mode: payCode

        };
        let encodedAuth = new Buffer(`${payload}`).toString("base64");
        let latestHash = encodedAuth; //Base64.btoa(products);
        let { prevHash, prevOrderID, prevcustomer_billing_address_id, prevcustomer_address_id } = payment || {};

        if (latestHash != prevHash) {

          Api.post("/order/add", payload).then((response) => {
            if (response.data.success) {
              // alert('Order Successfully Placed')
              dispatch(
                actions.completeFreeSuccess({
                  prevHash: latestHash,
                  prevOrderID: response.data.data.order_number,
                  prevcustomer_billing_address_id:
                    billingid == "" ? customer_address_id : billingid,
                  prevcustomer_address_id: customer_address_id
                })
              );

              callback({
                err: false,
                id: response.data.data.order_number,
                data: response.data.data,
                msg: "",
              });
            } else {
              if (response.data.error == "token_expired" || response.data.error == "not_found") {
                callback({ err: true, res: response, msg: "Token not found." });
                // api2.post("/renew", { email, access_token }).then((response) => {
                //   if (response.data) {
                //     console.log(response.data);
                //     if (
                //       (response.data && response.data.status == 405) ||
                //       (response.data && response.data.status == 500)
                //     ) {
                //     } else {
                //       dispatch(actions2.userInfoSuccess(response.data));
                //       let payloads = {
                //         access_token: response.data.access_token,
                //         email,
                //         customer_address_id,
                //         products,
                //         coupons: couponsarray,
                //         site_shipping_id,
                //         customer_billing_address_id: billingid,
                //         note: "testing",
                //       };
                //       Api.post("/order/add", payloads).then((response) => {
                //         if (response.data.success) {
                //           // alert('Order Successfully Placed')
                //           dispatch(
                //             actions.completeFreeSuccess({
                //               prevHash: latestHash,
                //               prevOrderID: response.data.data.order_number,
                //             })
                //           );

                //           callback({
                //             err: false,
                //             id: response.data.data.order_number,
                //             data: response.data.data,
                //           });
                //         } else {
                //           callback({ err: true, res: response });
                //         }
                //       });
                //     }
                //   }
                // });
              } else {
                callback({ err: true, res: response, msg: response?.data?.data?.msg });
              }
            }
          });
        } else {
          if (prevcustomer_address_id != customer_address_id || bilID != prevcustomer_billing_address_id) {
            Api.post("/order/add", payload).then((response) => {
              if (response.data.success) {
                // alert('Order Successfully Placed')
                dispatch(
                  actions.completeFreeSuccess({
                    prevHash: latestHash,
                    prevOrderID: response.data.data.order_number,
                    prevcustomer_billing_address_id:
                      billingid == "" ? customer_address_id : billingid,
                    prevcustomer_address_id: customer_address_id
                  })
                );

                callback({
                  err: false,
                  id: response.data.data.order_number,
                  data: response.data.data,
                  msg: "",
                });
              } else {
                if (response.data.error == "token_expired" || response.data.error == "not_found") {
                  callback({ err: true, res: response, msg: "Token not found." });

                } else {
                  callback({ err: true, res: response, msg: "" });
                }
              }
            });
          } else {
            callback({ err: false, id: prevOrderID, msg: "" });
          }

        }

        //console.log(payment);
      } catch (error) {
        console.log(error, "errr");
        dispatch(actions.completeFreeFailure(error));
      }
    };

export const checkoutOutOfserviceFree =
  (
    {
      amount,
      service,
      access_token,
      email
    },
    callback
  ) =>
    (dispatch) => {
      try {
        Api.post("/payment/service_status", {
          amount,
          service,
          email,
          access_token
        }).then((response) => {
          if (!response.data.success) {

            callback({ err: true, msg: response.data.msg });

          }

        });

      } catch (error) {

      }
    };

export const clearcart = (data) => (dispatch) => {
  dispatch(cleanCart());
};
export const clearHash = (data) => (dispatch) => {
  dispatch(actions.clearHashes());
};

export const deliverycache = (data) => (dispatch) => {
  dispatch(actions.deliverycacheSuccess(data));
};


export const Verifypayment = (data, callback) => (dispatch) => {
  try {
    // dispatch(actions.orderPending());
    Api.post("/payment/verify", data).then((res) => {
      //console.log(res.data);
      if (res.data) {
        if (res.data.success) {
          dispatch(actions.verifySuccess(res.data));
        }
        callback(res.data);
        //   dispatch(actions.orderSuccess(res.data));
      } else {
        // dispatch(actions.orderSuccess([]));
      }
    });
    //
  } catch (error) {
    //    dispatch(actions.orderFailure(error));
  }
};
