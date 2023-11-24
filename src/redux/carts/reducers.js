/** @format */

import * as types from "./types";
import { getTotalQuantity } from "./utils";

/**
 * TODO: improve structure later
 */
const initialState = {
  cartItems: [],
  total: 0,
  totalPrice: 0,
  subtotalPrice: 0,
  isFetching: false,
  checkoutId: null,
  // shipping
  shippingRates: [],
  shippingFetching: false,
  shippingReady: false,
  shippingLine: null, // shippingLine is Shipping selected
  shippingSelected: null,
  shippingAddress: null,
  webUrl: "",
  // coupon
  couponCode: "",
  couponApplied: false,
  couponFetching: false,
  discountCodes: [],
  // order
  orderbyid: {

    isFetching: true,
    error: null,
  },
  order: {
    list: [],
    isFetching: false,
    hasNextPage: false,
    cursor: null,
    error: null,
  },
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;
  switch (type) {
    // Checkout
    case types.CHECKOUT_LINK_USER_FETCHING:
    case types.CHECKOUT_CHECK_FETCHING:
    case types.CHECKOUT_UPDATE_FETCHING:
    case types.CHECKOUT_ADD_FETCHING:
    case types.CHECKOUT_REMOVE_FETCHING:
    case types.CHECKOUT_CREATE_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.CHECKOUT_LINK_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }

    // return initialState
    case types.CHECKOUT_CHECK_SUCCESS: {
      if (payload.completedAt) {
        return initialState;
      }
      return {
        ...state,
        isFetching: false,
      };
    }

    case types.CHECKOUT_CREATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cartItems: payload.cartItems,
        total: payload.cartItems.length,
        totalPrice: payload.totalPrice,
        checkoutId: payload.checkoutId,
        subtotalPrice: payload.subtotalPrice,
        withoutA: payload.withoutA,
        totalquantity: payload.totalquantity,
        discount: '',
        couponCode: "",
        couponApplied: false,
        couponFetching: false,
        discountCode: ''
      };
    }

    case types.CHECKOUT_LINK_USER_FAILURE:
    case types.CHECKOUT_CHECK_FAILURE:
    case types.CHECKOUT_UPDATE_FAILURE:
    case types.CHECKOUT_REMOVE_FAILURE:
    case types.CHECKOUT_CREATE_FAILURE:
    case types.CHECKOUT_ADD_FAILURE: {
      console.warn(payload);
      return {
        ...state,
        error: payload,
        isFetching: false,
        cartItems: state.cartItems,
      };
    }

    case types.CHECKOUT_UPDATE_SUCCESS:
    case types.CHECKOUT_REMOVE_SUCCESS:
    case types.CHECKOUT_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cartItems: payload.cartItems,
        total: getTotalQuantity(payload.cartItems),
        totalPrice: payload.totalPrice,
        subtotalPrice: payload.subtotalPrice,
        error: null,
        withoutA: payload.withoutA,
        totalquantity: payload.totalquantity,
        discount: '',
        couponCode: "",
        couponApplied: false,
        couponFetching: false,
        discountCode: '',
        discountCodes: []
      };
    }

    // coupon
    case types.CHECKOUT_APPLY_COUPON_FETCHING: {
      return {
        ...state,
        couponFetching: true,
        cartItems: state.cartItems,

      };
    }

    case types.CHECKOUT_APPLY_COUPON_SUCCESS: {

      let finalDiscoutCodes = [], abosrbapplied = false, absorbshipping = 0
      let runningDiscount = 0
      state?.discountCodes.map(items => {
        if (items.absorb_shipping == "1") {
          abosrbapplied = true
        }
        runningDiscount += Number(items.displayValue)
        finalDiscoutCodes.push({
          ...items
        })
      })

      let displayValue = 0
      if (payload?.data?.absorb_shipping == "1" && !abosrbapplied && Number(displayValue) == 0) {
        displayValue = Number(displayValue) + Number(payload?.totalShipping)
        abosrbapplied = true
      }

      let totalwithship = abosrbapplied ? Number(payload?.totalPrice) + Number(payload?.totalShipping) : Number(payload?.totalPrice)
      let currentRowDis = totalwithship - (runningDiscount + Number(payload?.data?.discount))
      //  console.log("currentRowDis", currentRowDis, abosrbapplied)
      if (currentRowDis >= 0) {
        //  console.log("if")
        displayValue = payload?.data?.discount
      } else {
        //   console.log("else")
        displayValue = totalwithship - runningDiscount
      }

      finalDiscoutCodes.push({
        code: payload?.discountCode,
        discount: payload?.data?.discount,
        absorb_shipping: payload?.data?.absorb_shipping,
        displayValue
      })

      return {
        ...state,
        ...payload,
        ...payload.data,
        discountCodes: finalDiscoutCodes,
        couponApplied: true,
        couponFetching: false,
      };
    }

    case types.CHECKOUT_APPLY_COUPON_FAILURE: {
      return {
        ...state,
        couponFetching: false,
        error: payload,
      };
    }

    case types.CHECKOUT_REMOVE_COUPON_FETCHING: {
      return {
        ...state,
        couponFetching: true,
      };
    }

    case types.CHECKOUT_REMOVE_COUPON_SUCCESS: {
      let newDS = []
      state?.discountCodes?.map((it, index) => {
        if (payload != index) {
          newDS.push(it)
        }
      })
      return {
        ...state,
        discount: '',
        couponCode: "",
        discountCodes: newDS,
        couponApplied: false,
        couponFetching: false,
        discountCode: ''
      };
    }

    case types.CHECKOUT_REMOVE_COUPON_FAILURE: {
      return {
        ...state,
        couponFetching: false,
        error: payload,
      };
    }

    // shipping
    case types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_FETCHING: {
      return {
        ...state,
        shippingFetching: true,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_FAILURE: {
      return {
        ...state,
        shippingFetching: false,
        error: payload,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_SUCCESS: {
      return {
        ...state,
        shippingRates: payload.availableShippingRates.shippingRates,
        shippingReady: payload.availableShippingRates.ready,
        shippingAddress: payload.shippingAddress,
        shippingFetching: false,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_LINE_FETCHING: {
      return {
        ...state,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_LINE_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_LINE_SUCCESS: {
      return {
        ...state,
        shippingSelected: payload.shippingLine,
        webUrl: payload.webUrl,
        subtotalPrice: payload.subtotalPrice,
        totalPrice: payload.totalPrice,
        withoutA: payload.withoutA,
        totalquantity: payload.totalquantity,
        discount: '',
        couponCode: "",
        couponFetching: false,
        discountCode: '',
        discountCodes: []

      };
    }

    case "CLEAN_OLD_STORE":
    case types.CART_CLEAN: {
      return {
        ...initialState,
        order: state.order
      };
    }

    /**
     * order
     * TODO: improve split another store
     */
    case types.ORDER_FETCHING: {
      return {
        ...state,
        order: {
          ...state.order,
          isFetching: true,
          error: null,
        },
      };
    }

    case types.ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          payload,
          isFetching: false,
          error: null,
        },
      };
    }
    case types.ORDERNUMBER: {
      return {
        ...state,
        order_number: payload
      };
    }
    case types.ORDER_BYID_SUCCESS: {
      return {
        ...state,
        orderbyid: {
          payload,
          isFetching: false,
          error: null,
        },
      };
    }
    case types.ORDER_BYID_FETCH: {
      return {
        ...state,
        orderbyid: {

          isFetching: true,
          error: null,
        },
      };
    }


    case types.ORDER_FAILURE: {
      return {
        ...state,
        order: {
          error: payload,
          isFetching: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

// const compareCartItem = (cartItem, action) => {
//   if (
//     cartItem &&
//     isObject(cartItem) &&
//     cartItem.variation !== undefined &&
//     action.variation !== undefined &&
//     cartItem.variation != null &&
//     action.variation != null
//   )
//     return (
//       cartItem.product.id === action.product.id &&
//       cartItem.variation.id === action.variation.id
//     );
//   return cartItem.product.id === action.product.id;
// };

// const cartItem = (
//   state = { product: undefined, quantity: 1, variation: undefined },
//   action
// ) => {
//   switch (action.type) {
//     case types.CART_ADD_ITEM:
//       return state.product === undefined
//         ? Object.assign({}, state, {
//             product: action.product,
//             variation: action.variation,
//           })
//         : !compareCartItem(state, action)
//           ? state
//           : Object.assign({}, state, {
//               quantity:
//                 state.quantity < Constants.LimitAddToCart
//                   ? state.quantity + 1
//                   : state.quantity,
//             });
//     case types.CART_REMOVE_ITEM:
//       return !compareCartItem(state, action)
//         ? state
//         : Object.assign({}, state, { quantity: state.quantity - 1 });
//     default:
//       return state;
//   }
// };
