/**
 * /* OPERATIONS = REDUX THUNKS
 * This file defines the public interface of the duck -- what can be dispatched from components
 * Simple operations are just about forwarding an action creator, ex: simpleQuack
 * Complex operations involve returning a thunk that dispatches multiple actions in a certain order, ex: complexQuack
 * https://github.com/alexnm/re-ducks/blob/fbf0f3ab05c283446ffaec02974c1b7f29272bf1/example-duck/operations.js
 * @format
 */

import { toast } from "@app/Omni";
import { Languages } from "@common";
import Api, { api2, loadtoken } from "../../services/Api";
import * as actions from "./actions";
import * as actions2 from "../payment/actions";
import * as actions3 from "../user/actions";
import * as _ from "lodash";
//import TagManager from "react-gtm-module";
//import { gtmaddtocart, gtmAddToCart } from "../../utils/gtmOptions";
import { getProductOpt } from "../../ultils/productOptions";
/**
 *  @function checkCheckout check checkout completed or existed
 *
 * @param {*} { checkoutId }
 */
export const checkCheckout =
  ({ checkoutId }) =>
    (dispatch) => {
      try {
        dispatch(actions.checkCheckoutPending());

      } catch (error) {
        dispatch(actions.checkCheckoutFailure(error));
      }
    };

/**
 * add all cart
 */
export const addAllToCart =
  ({ list, checkoutId }) =>
    (dispatch) => {
      try {
        // const lineItems = [];
        // list.map((o) => {
        //   const item = o.product || o;
        //   const defaultVariant = item.variants && item.variants[0];
        //   return lineItems.push({
        //     variantId: defaultVariant.id,
        //     quantity: 1,
        //   });
        // });
        // dispatch(
        //   addToCart({
        //     items: lineItems,
        //     checkoutId,
        //   })
        // );
      } catch (error) {
        console.warn(error);
      }
    };

export const addToCart =
  (
    { cartId, cartItems, product, selectedVariant, quantity, selectedVariant2 },
    callback
  ) =>
    (dispatch) => {
      try {
        let newaddons = []
        selectedVariant2?.map(payl => {
          if (payl?.quantity != 0) {
            newaddons.push(payl)
          }
          else {
            newaddons.push({})
          }
        })
        let newlist = [];
        let filtered = cartItems.filter((item) => item.cartId == cartId);
        let withoutitem = cartItems.filter((item) => item.variant.id != cartId);
        //    //console.log(filtered,'filtered');

        //   //console.log(withoutitem,'withoutitem');
        if (filtered.length == 0) {
          newlist = [
            ...cartItems,
            {
              cartId,
              product,
              variant: selectedVariant,
              quantity,
              addon: newaddons,
            },
          ];
        } else {
          newlist = [...withoutitem];
        }
        //  //console.log(newlist,'newlist');

        let totalPrice = 0,
          totalPricereg = 0,
          withoutA = 0,
          totalquantity = 0;

        newlist.map((i) => {
          if (i.variant.sale_price != 0) {
            totalquantity = totalquantity + Number(i.quantity);
            totalPricereg =
              totalPricereg +
              Number(i.variant.regular_price) * Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.sale_price) * Number(i.quantity);
            withoutA =
              withoutA + Number(i.variant.sale_price) * Number(i.quantity);
          } else {
            totalquantity = totalquantity + Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.regular_price) * Number(i.quantity);

            withoutA =
              withoutA + Number(i.variant.regular_price) * Number(i.quantity);
          }

          if (i.addon && i.addon.length != 0) {
            i.addon.map((itemadd) => {
              if (itemadd?.quantity != 0) {
                if (itemadd && itemadd.sale_price) {
                  totalquantity = totalquantity + Number(itemadd.quantity);

                  totalPrice +=
                    Number(itemadd.sale_price) * Number(itemadd.quantity);
                  //   totalPricereg +
                  //    Number(itemadd.regular_price) * Number(itemadd.quantity);
                }
              }
            });
          }
        });

        let checkout = {
          lineItems: newlist,

          totalPrice,
          subtotalPrice: totalPricereg,
          withoutA,
          totalquantity,
        };
        dispatch(actions2.verifySuccess(""));
        dispatch(actions.createCheckoutSuccess(checkout));
        callback({ error: false });
        // const lineItems = items || [
        //   { variantId: variant.id, quantity: parseInt(quantity || 1, 10) },
        // ];
        // if (checkoutId) {
        //   return dispatch(addCheckout({ checkoutId, lineItems })).then((data) => {
        //     return data;
        //   });
        // }
        // return dispatch(createCheckout({ lineItems })).then((checkout) => {
        //   if (checkout && checkout.id) {
        //     return dispatch(
        //       addCheckout({ checkoutId: checkout.id, lineItems })
        //     ).then((data) => {
        //       return data;
        //     });
        //   }
        // });
      } catch (error) {
        dispatch(actions.createCheckoutFailure(error));
      }
    };

/**
 * @function addCheckout
 * @param {String} checkoutId
 * @param {Array} lineItems
 */
export const addCheckout =
  ({ lineItems, checkoutId }) =>
    (dispatch) => {
      try {
        // dispatch(actions.addCheckoutPending());
        // return GraphqlAPI.addCheckout({ checkoutId, lineItems })
        //   .then((json) => {
        //     if (json.error) {
        //       dispatch(actions.addCheckoutFailure(json.error));
        //       toast(json.error);
        //       return json;
        //     }
        //     const { checkout } = json;
        //     dispatch(actions.addCheckoutSuccess(checkout));
        //     toast(Languages.AddtoCardSuccess);
        //     return checkout;
        //   })
        //   .catch((error) => {
        //     dispatch(actions.addCheckoutFailure(error));
        //   });
      } catch (error) {
        dispatch(actions.addCheckoutFailure(error));
      }
    };

/**
 * @function createCheckout
 * @param {Array} lineItems
 * @return data checkout
 */
export const createCheckout =
  ({ lineItems }) =>
    (dispatch) => {
      //dispatch(actions.createCheckoutPending());
      return;
      // dispatch(actions.createCheckoutSuccess(checkout));


      //  dispatch(actions.createCheckoutFailure(error));
    };

/**
 * @function removeCartItem
 *
 * @param {*} { id, checkoutId }
 */
export const removeCartItem =
  ({ cartItems, cartId, product, id, variant }) =>
    (dispatch) => {
      try {
        dispatch(actions.removeCheckoutPending());
        let filteered = cartItems.filter((item) => item.cartId != cartId);
        let newlist = [...filteered];
        let totalPrice = 0,
          totalPricereg = 0,
          withoutA = 0,
          totalquantity = 0;
        newlist.map((i) => {
          if (i.variant.sale_price != 0) {
            totalquantity = totalquantity + Number(i.quantity);
            totalPricereg =
              totalPricereg +
              Number(i.variant.regular_price) * Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.sale_price) * Number(i.quantity);
            withoutA =
              withoutA + Number(i.variant.sale_price) * Number(i.quantity);
          } else {
            totalquantity = totalquantity + Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.regular_price) * Number(i.quantity);

            withoutA =
              withoutA + Number(i.variant.regular_price) * Number(i.quantity);
          }

          if (i.addon && i.addon.length != 0) {
            i.addon.map((itemadd) => {
              if (itemadd && itemadd.sale_price) {
                totalquantity = totalquantity + Number(itemadd.quantity);

                totalPricereg = totalPricereg +
                  Number(itemadd.regular_price) * Number(itemadd.quantity);
                totalPrice +=
                  Number(itemadd.sale_price) * Number(itemadd.quantity);
                // totalPrice +=
                //   Number(itemadd.sale_price) *
                //   (Number(itemadd.quantity) * Number(i.quantity));
              }
            });
          }
        });
        let checkout = {
          lineItems: newlist,
          totalPrice: totalPrice,
          subtotalPrice: totalPricereg,
          withoutA,
          totalquantity,
        };
        dispatch(actions2.verifySuccess(""));
        dispatch(actions.removeCheckoutSuccess(checkout));
      } catch (error) {
        dispatch(actions.createCheckoutFailure(error));
      }
    };

export const removeAddonCartItem =
  ({ cartItems, cartId, product, id, variant, add }) =>
    (dispatch) => {
      try {
        let newlist = [...cartItems];
        let finallist = [];
        let totalPrice = 0,
          withoutA = 0,
          totalPricereg = 0,
          totalquantity = 0

        newlist.map((i) => {
          if (i.cartId != cartId) {
            finallist.push(i);
          } else {
            let filteered = i.addon.filter((item) => item?.id != add.id);
            i.addon = filteered;
            finallist.push(i);
          }
          if (i.variant.sale_price != 0) {
            totalquantity = totalquantity + Number(i.quantity);
            totalPricereg =
              totalPricereg +
              Number(i.variant.regular_price) * Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.sale_price) * Number(i.quantity);
            withoutA =
              withoutA + Number(i.variant.sale_price) * Number(i.quantity);
          } else {
            totalquantity = totalquantity + Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.regular_price) * Number(i.quantity);

            withoutA =
              withoutA + Number(i.variant.regular_price) * Number(i.quantity);
          }

          if (i.addon && i.addon.length != 0) {
            i.addon.map((itemadd) => {
              if (itemadd && itemadd.sale_price) {
                totalquantity = totalquantity + Number(itemadd.quantity);

                totalPricereg = totalPricereg +
                  Number(itemadd.regular_price) * Number(itemadd.quantity);
                totalPrice +=
                  Number(itemadd.sale_price) * Number(itemadd.quantity);
              }
            });
          }
        });
        let checkout = {
          lineItems: finallist,
          totalPrice: totalPrice,
          subtotalPrice: totalPricereg,
          withoutA,
          totalquantity
        };
        dispatch(actions2.verifySuccess(""));
        dispatch(actions.removeCheckoutSuccess(checkout));
      } catch (error) {
        dispatch(actions.createCheckoutFailure(error));
      }
    };

/**
 * @function updateCartItem
 *
 * @param {*} { quantity, checkoutId, variant, id }
 */
export const updateCartItem =
  ({ cartItems, quantity, cartId, product, variant, langcode, id, currency, removed }) =>
    (dispatch) => {
      try {
        // dispatch(actions.updateCheckoutPending());
        let itemindex = cartItems.findIndex((x) => x.cartId == cartId);

        cartItems[itemindex] = { ...cartItems[itemindex], quantity };
        //  let filteered = cartItems.filter((item) => item.product.id != product.id);
        let newlist = cartItems;
        let totalPrice = 0,
          withoutA = 0,
          totalPricereg = 0,
          totalquantity = 0;
        newlist.map((i) => {
          if (i.variant.sale_price != 0) {
            totalquantity = totalquantity + Number(i.quantity);
            totalPricereg =
              totalPricereg +
              Number(i.variant.regular_price) * Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.sale_price) * Number(i.quantity);
            withoutA =
              withoutA + Number(i.variant.sale_price) * Number(i.quantity);
          } else {
            totalquantity = totalquantity + Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.regular_price) * Number(i.quantity);

            withoutA =
              withoutA + Number(i.variant.regular_price) * Number(i.quantity);
          }

          if (i.addon && i.addon.length != 0) {
            i.addon.map((itemadd) => {
              if (itemadd && itemadd.sale_price) {
                totalquantity = totalquantity + Number(itemadd.quantity);

                totalPrice +=
                  Number(itemadd.sale_price) * Number(itemadd.quantity);
              }
            });
          }
        });

        let checkout = {
          lineItems: cartItems,
          totalPrice: totalPrice,
          subtotalPrice: totalPricereg,
          withoutA,
          totalquantity,
        };
        let prod = []
        cartItems.map(op => {
          let prodindex = op?.variant?.indexselect;
          let item_variant = getProductOpt(op?.variant?.selectedOptions?.[0]?.name?.toLowerCase(), langcode,
            op?.variant?.options?.[0]?.values?.[prodindex]?.label,
            op?.variant?.options?.[0]?.values?.[prodindex]?.label_alt,
            op?.variant?.options?.[0]?.values?.[prodindex]?.value,
            op?.variant?.options?.[0]?.values?.[prodindex]?.value_alt)
          if (_.isEmpty(op)) {
          } else {
            prod.push({
              name: op?.product?.title,
              id: op?.variant?.id == undefined ? op?.product?.id : op?.variant?.id,
              price: op?.variant?.sale_price == 0 ? op?.variant.regular_price : op?.variant?.sale_price,
              variant: item_variant,
              quantity: op?.quantity,
            });
          }
        })
        if (!removed) {
          // let dl6 = gtmAddToCart(currency, prod)
          // let dl7 = gtmaddtocart(currency, prod)
          // TagManager.dataLayer({ ecommerce: null })
          // TagManager.dataLayer(dl6);
          // TagManager.dataLayer({ ecommerce: null })
          // TagManager.dataLayer(dl7);
          // console.log(dl6, "GA4")
          // console.log(dl7, "UA")
        }
        dispatch(actions2.verifySuccess(""));
        dispatch(actions.updateCheckoutSuccess(checkout));
      } catch (error) {
        console.log(error);
        dispatch(actions.updateCheckoutFailure(error));
      }
    };

export const updateAddonCartItem =
  ({ cartItems, quantity, cartId, variant, id, langcode, removed, currency }) =>
    (dispatch) => {
      try {
        //console.log("In addon Update cart");

        dispatch(actions.updateCheckoutPending());
        //console.log(cartItems, quantity, cartId, variant, id);
        // let itemindex = cartItems.findIndex((x) => x.variant.id == variant.id);
        // cartItems[itemindex] = { ...cartItems[itemindex], quantity };
        //  let filteered = cartItems.filter((item) => item.product.id != product.id);
        let finallist = [];
        let newlist = cartItems;
        let totalPrice = 0;
        let totalPricereg = 0,
          withoutA = 0;
        let totalquantity = 0;
        newlist.map((i) => {
          if (i.cartId != cartId) {
            finallist.push(i);
          } else {
            let indexed = i.addon.findIndex((item) => item?.id == variant?.id);
            //console.log("kkkk",indexed);
            i.addon[indexed] = { ...i.addon[indexed], quantity };
            finallist.push(i);
          }
          if (i.variant.sale_price != 0) {
            totalquantity = totalquantity + Number(i.quantity);
            totalPricereg =
              totalPricereg +
              Number(i.variant.regular_price) * Number(i.quantity);
            totalPrice =
              totalPrice + Number(i.variant.sale_price) * Number(i.quantity);
            withoutA =
              withoutA + Number(i.variant.sale_price) * Number(i.quantity);
          } else {
            totalquantity = totalquantity + Number(i.quantity);

            totalPrice =
              totalPrice + Number(i.variant.regular_price) * Number(i.quantity);

            withoutA =
              withoutA + Number(i.variant.regular_price) * Number(i.quantity);
          }

          if (i.addon && i.addon.length != 0) {
            i.addon.map((itemadd) => {
              if (itemadd && itemadd.sale_price) {
                totalquantity = totalquantity + Number(itemadd.quantity);

                //  totalPricereg +
                //  Number(itemadd.regular_price) * Number(itemadd.quantity);
                totalPrice +=
                  Number(itemadd.sale_price) * Number(itemadd.quantity);
              }
            });
          }
        });
        let checkout = {
          lineItems: cartItems,
          totalPrice: totalPrice,
          subtotalPrice: totalPricereg,
          withoutA,
          totalquantity,
        };
        let prod = []
        cartItems.map(op => {
          let prodindex = op?.variant?.indexselect;
          let item_variant = op?.variant?.selectedOptions?.[0]?.name?.toLowerCase() != 'simple' ? getProductOpt(op?.variant?.selectedOptions?.[0]?.name?.toLowerCase(), langcode,
            op?.variant?.options?.[0]?.values?.[prodindex]?.label,
            op?.variant?.options?.[0]?.values?.[prodindex]?.label_alt,
            op?.variant?.options?.[0]?.values?.[prodindex]?.value,
            op?.variant?.options?.[0]?.values?.[prodindex]?.value_alt) : ''
          if (_.isEmpty(op)) {
          } else {
            prod.push({
              name: op?.product?.title,
              id: op?.variant?.id == undefined ? op?.product?.id : op?.variant?.id,
              price: op?.variant?.sale_price == 0 ? op?.variant.regular_price : op?.variant?.sale_price,
              variant: item_variant,
              quantity: op?.quantity,
            });
          }
          op?.addon?.map(ut => {
            if (_.isEmpty(ut)) {
            } else {
              let prodindex2 = ut?.indexselect;
              let k1 = ut?.product?.options?.[0]?.values?.[prodindex2]
              let item_variant2 = ut?.details?.types?.toLowerCase() != 'simple' ? getProductOpt(ut?.details?.types?.toLowerCase(), langcode,
                k1?.label,
                k1?.label_alt,
                k1?.value,
                k1?.value_alt) : ''
              prod.push({
                name: ut?.product?.title,
                id: ut?.id == undefined ? ut?.product?.id : ut?.id,
                price: ut?.details?.price,
                variant: item_variant2,
                quantity: ut?.quantity,
              });
            }

          })
        })
        if (!removed) {
          // let dl9 = gtmAddToCart(currency, prod)
          // let dl10 = gtmaddtocart(currency, prod)
          // TagManager.dataLayer({ ecommerce: null })
          // TagManager.dataLayer(dl9);
          // TagManager.dataLayer({ ecommerce: null })
          // TagManager.dataLayer(dl10);
          // console.log(dl9, "GA4")
          // console.log(dl10, "UA")
        } else {

        }
        dispatch(actions2.verifySuccess(""));
        dispatch(actions.updateCheckoutSuccess(checkout));
      } catch (error) {
        dispatch(actions.updateCheckoutFailure(error));
      }
    };

/**
 * @function applyCoupon
 *
 * @param {*} { discountCode, checkoutId }
 */
export const applyCoupon =
  (
    {
      coupans,
      cartItems,
      access_token,
      email,
      customer_id,
      delivery,
      shipping_id,
      site_token,
      totalPrice,
      totalShipping
    },
    callback
  ) =>
    (dispatch) => {
      console.log(coupans);
      try {
        let products = [];
        cartItems.map((item) => {
          products.push({
            id: item.variant.id,
            quantity: item.quantity,
            delivery_date: delivery,
            is_addon: 0,
            addon_for_product: "",
          });
          item &&
            item.addon.map((itaddd) => {
              if (itaddd && itaddd.id) {
                products.push({
                  id: itaddd.id,
                  quantity: itaddd.quantity,
                  is_addon: 1,
                  addon_for_product: item.variant.parent_id,
                });
              }
            });
        });
        let payload = {
          site_token,
          email,
          customer_id,
          products,
          code: coupans,
          site_shipping_id: shipping_id,
        };

        dispatch(actions.applyCouponCheckoutPending());
        Api.post("/coupon/validate", payload)
          .then((response) => {
            if (response.data.success) {
              delete response.data["total"];
              dispatch(actions2.clearHashes(""));
              dispatch(
                actions.applyCouponCheckoutSuccess({
                  discountCode: coupans,
                  data: response.data,
                  totalPrice,
                  totalShipping
                })
              );
              callback({ msg: "", error: false });
            } else {
              if (response.data.msg == "Token not found.") {
                callback({ msg: response.data.msg, error: true });
                // api2.post("/renew", { email, access_token }).then((response) => {
                //    if (response.data) {
                //     if (
                //       (response.data && response.data.status == 405) ||
                //       (response.data && response.data.status == 500)
                //     ) {
                //     } else {
                //       dispatch(actions3.userInfoSuccess(response.data));

                //       let payload2 = {
                //         access_token:response.data.access_token,
                //         email,
                //         customer_id,
                //         products,
                //         code: coupans,
                //         site_shipping_id: shipping_id,
                //       };
                //       Api.post("/coupon/validate", payload2).then((response) => {
                //         if (response.data.success) {
                //           delete response.data["total"];
                //           dispatch(
                //             actions.applyCouponCheckoutSuccess({
                //               discountCode: coupans,
                //               data: response.data,
                //             })
                //           );
                //           dispatch(actions2.verifySuccess(""));
                //           callback({ msg: "", error: false });
                //         } else {
                //           callback({ msg: response.data.msg, error: true });
                //           dispatch(
                //             actions.applyCouponCheckoutFailure(response.data)
                //           );
                //         }
                //       });
                //     }
                //   }
                // });
              } else if (response.data.msg == "Please refresh page") {
                Api.post("/setting", { lang: "en" }).then(
                  (res) => {
                    let payload2 = {
                      site_token: res.data.data.site.token,
                      email,
                      customer_id,
                      products,
                      code: coupans,
                      site_shipping_id: shipping_id,
                    };
                    Api.post("/coupon/validate", payload2)
                      .then((response) => {
                        if (response.data.success) {
                          delete response.data["total"];
                          dispatch(actions2.clearHashes(""));
                          dispatch(
                            actions.applyCouponCheckoutSuccess({
                              discountCode: coupans,
                              data: response.data,
                              totalPrice,
                              totalShipping
                            })
                          );
                          callback({ msg: "", error: false });
                        }
                      })
                  })
              } else {
                callback({ msg: response.data.msg, error: true });
                dispatch(actions.applyCouponCheckoutFailure(response.data));
              }
            }
            //console.log(response);
          })
          .catch((err) => dispatch(actions.applyCouponCheckoutFailure(err.data)));

        //     toast(Languages.applyCouponSuccess);
      } catch (error) {
        //console.log(error);
        dispatch(actions.applyCouponCheckoutFailure(error));
      }
    };

/**
 * @function removeCoupon
 *
 * @param {*} { checkoutId }
 */
export const removeCoupon = (index) => (dispatch) => {
  try {
    dispatch(actions.removeCouponCheckoutPending());
    dispatch(actions2.clearHashes(""));
    dispatch(actions.removeCouponCheckoutSuccess(index));
  } catch (error) {
    dispatch(actions.removeCouponCheckoutFailure(error));
  }
};

/**
 * @function updateShippingAddress
 *
 * @param {*} { checkoutId, shippingAddress }
 */
export const updateCheckoutShippingAddress =
  ({ checkoutId, shippingAddress }) =>
    (dispatch) => {
      try {
        dispatch(actions.updateShippingAddressCheckoutPending());

      } catch (error) {
        dispatch(actions.updateShippingAddressCheckoutFailure(error));
      }
    };

/**
 * @function updateShippingLine
 *
 * @param {String, } { checkoutId, ShippingLine }
 */
export const updateCheckoutShippingLine =
  ({ checkoutId, handle }) =>
    (dispatch) => {
      try {
        dispatch(actions.updateShippingLineCheckoutPending());

      } catch (error) {
        dispatch(actions.updateShippingLineCheckoutFailure(error));
      }
    };

/**
 * @function checkoutLinkUser
 */
export const checkoutLinkUser = (data, callback) => (dispatch) => {
  try {
    dispatch(actions.checkoutLinkUserPending());
    let payload = {
      access_token: "",
      email: "sample@example.com",
      customer_address_id: "15",
      products: [
        {
          id: "1",
          quantity: "5",
          delivery_date: "2021-06-29",
          time_start: "12:00",
          time_end: "18:00",
        },
      ],
    };
    Api.post("/order/add", payload)
      .then((response) => {
        // //console.log(response.data)
        // if (response.data.status == 200) {
        //   let data = { ...address, id: response.data.customer_address_id };
        //   dispatch(actions.createUserAddressSuccess(data));
        //   callback({ customerAddress: data ,err:false});
        // }else{
        //   callback({ err:true});
        //   dispatch(actions.createUserAddressFailure(response.data.msg));
        // }
      })
      .catch((err) => {
        //console.log(err);
        //   dispatch(actions.createUserAddressFailure(err.response.msg));
      });
  } catch (error) {
    dispatch(actions.checkoutLinkUserFailure(error));
  }
};

/**
 * @function getOrders get all order of customer
 */

export const getOrders = (data) => (dispatch) => {
  try {
    dispatch(actions.orderPending());
    Api.post("/order/history", data).then((res) => {
      if (res.data) {
        dispatch(actions.orderSuccess(res.data && res.data && res.data.orders));
      } else {
        dispatch(actions.orderSuccess([]));
      }
    });
    //
  } catch (error) {
    dispatch(actions.orderFailure(error));
  }
};

export const getOrderbyid = (data, callback) => (dispatch) => {
  try {
    dispatch(actions.orderbyidPending());
    Api.post("/order/status", data).then((res) => {
      //console.log(res);
      if (res.status == 200) {
        callback({ success: true });
        dispatch(actions.orderbyidSuccess(res.data));
      } else {
        callback({ success: false, msg: res.data?.msg });
      }
    });
    //
  } catch (error) {
    dispatch(actions.orderFailure(error));
  }
};
/**
 * @function setorderNUMber
 */

export const setorderNUMber = (data, callback) => (dispatch) => {
  try {
    dispatch(actions.orderNumberSuccess(data));
  } catch (error) {
    dispatch(actions.orderFailure(error));
  }
};
