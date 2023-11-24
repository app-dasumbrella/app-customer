/**
 * created by Inspire UI (dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * add to cart
 */
// export const addToCart = (item) => ({
//   type: types.CART_ADD_ITEM,
//   payload: {
//     item,
//   },
// });

/**
 * checkout check
 */
export const checkCheckoutPending = () => ({
  type: types.CHECKOUT_CHECK_FETCHING,
});

export const checkCheckoutSuccess = (completedAt) => ({
  type: types.CHECKOUT_CHECK_SUCCESS,
  payload: {
    completedAt,
  },
});

export const checkCheckoutFailure = (error) => ({
  type: types.CHECKOUT_CHECK_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout create
 */
export const createCheckoutPending = () => ({
  type: types.CHECKOUT_CREATE_FETCHING,
});

export const createCheckoutSuccess = (checkout) => ({
  type: types.CHECKOUT_CREATE_SUCCESS,
  payload: {
    cartItems: checkout.lineItems,
    totalPrice: checkout.totalPrice,
    checkoutId: checkout.id,
    subtotalPrice: checkout.subtotalPrice,
    withoutA: checkout.withoutA,
    totalquantity: checkout.totalquantity

  },
});

export const createCheckoutFailure = (error) => ({
  type: types.CHECKOUT_CREATE_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout add
 */
export const addCheckoutPending = () => ({
  type: types.CHECKOUT_ADD_FETCHING,
});

export const addCheckoutSuccess = (checkout) => ({
  type: types.CHECKOUT_ADD_SUCCESS,
  payload: {
    cartItems: checkout.lineItems,
    totalPrice: checkout.totalPrice,
    subtotalPrice: checkout.subtotalPrice,
    withoutA: checkout.withoutA,
    totalquantity: checkout.totalquantity

  },
});

export const addCheckoutFailure = (error) => ({
  type: types.CHECKOUT_ADD_FAILURE,
  payload: error,
  error: true,
});


export const orderNumberSuccess = (error) => ({
  type: types.ORDERNUMBER,
  payload: error,
});

/**
 * checkout update
 */
export const updateCheckoutPending = () => ({
  type: types.CHECKOUT_UPDATE_FETCHING,
});

export const updateCheckoutSuccess = (checkout) => ({
  type: types.CHECKOUT_UPDATE_SUCCESS,
  payload: {
    cartItems: checkout.lineItems,
    totalPrice: checkout.totalPrice,
    subtotalPrice: checkout.subtotalPrice,
    withoutA: checkout.withoutA,
    totalquantity: checkout.totalquantity
  },
});

export const updateCheckoutFailure = (error) => ({
  type: types.CHECKOUT_UPDATE_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout remove
 */
export const removeCheckoutPending = () => ({
  type: types.CHECKOUT_REMOVE_FETCHING,
});

export const removeCheckoutSuccess = (checkout) => ({
  type: types.CHECKOUT_REMOVE_SUCCESS,
  payload: {
    cartItems: checkout.lineItems,
    totalPrice: checkout.totalPrice,
    subtotalPrice: checkout.subtotalPrice,
    withoutA: checkout.withoutA,
    totalquantity: checkout.totalquantity
  },
});

export const removeCheckoutFailure = (error) => ({
  type: types.CHECKOUT_REMOVE_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout apply coupon
 */
export const applyCouponCheckoutPending = () => ({
  type: types.CHECKOUT_APPLY_COUPON_FETCHING,
});

export const applyCouponCheckoutSuccess = (data, discountCode) => ({
  type: types.CHECKOUT_APPLY_COUPON_SUCCESS,
  payload: {
    ...data,

  },
});

export const applyCouponCheckoutFailure = (error) => ({
  type: types.CHECKOUT_APPLY_COUPON_FAILURE,
  payload: error,
  error: true,
});

/**
 * checkout remove coupon
 */
export const removeCouponCheckoutPending = () => ({
  type: types.CHECKOUT_REMOVE_COUPON_FETCHING,
});

export const removeCouponCheckoutSuccess = (data) => ({
  type: types.CHECKOUT_REMOVE_COUPON_SUCCESS,
  payload: data,
});

export const removeCouponCheckoutFailure = (error) => ({
  type: types.CHECKOUT_REMOVE_COUPON_FAILURE,
  payload: error,
});

/**
 * checkout update shipping address
 */
export const updateShippingAddressCheckoutPending = () => ({
  type: types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_FETCHING,
});

export const updateShippingAddressCheckoutSuccess = ({
  availableShippingRates,
  shippingAddress,
}) => ({
  type: types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_SUCCESS,
  payload: {
    availableShippingRates,
    shippingAddress,
  },
});

export const updateShippingAddressCheckoutFailure = (error) => ({
  type: types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_FAILURE,
  payload: error,
});

/**
 * checkout update shipping line
 */
export const updateShippingLineCheckoutPending = () => ({
  type: types.CHECKOUT_UPDATE_SHIPPING_LINE_FETCHING,
});

export const updateShippingLineCheckoutSuccess = (data) => ({
  type: types.CHECKOUT_UPDATE_SHIPPING_LINE_SUCCESS,
  payload: data,
});

export const updateShippingLineCheckoutFailure = (error) => ({
  type: types.CHECKOUT_UPDATE_SHIPPING_LINE_FAILURE,
  payload: error,
});

/**
 * checkout update shipping line
 */
export const checkoutLinkUserPending = () => ({
  type: types.CHECKOUT_LINK_USER_FETCHING,
});

export const checkoutLinkUserSuccess = () => ({
  type: types.CHECKOUT_LINK_USER_SUCCESS,
});

export const checkoutLinkUserFailure = (error) => ({
  type: types.CHECKOUT_LINK_USER_FAILURE,
  payload: error,
});

/**
 * checkout update shipping line
 */
export const orderPending = () => ({
  type: types.ORDER_FETCHING,
});
export const orderbyidPending = () => ({
  type: types.ORDER_BYID_FETCH,
});


export const orderSuccess = (data) => ({
  type: types.ORDER_SUCCESS,
  payload: data,
});

export const orderFailure = (error) => ({
  type: types.ORDER_FAILURE,
  payload: error,
});
export const orderbyidSuccess = (payload) => ({
  type: types.ORDER_BYID_SUCCESS,
  payload: payload,
});


/**
 * clean cart
 */
export const cleanCart = () => ({
  type: types.CART_CLEAN,
});
