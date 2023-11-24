/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";
import { compareWishList } from "./utils";

const initialState = {
  list: [],
  total: 0,
  totalPrice: 0,
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case types.WISHLIST_ADD: {
      const isExisted = state.list.some((wishlistItem) =>
        compareWishList(wishlistItem, action)
      );
      return isExisted
        ? state
        : Object.assign({}, state, {
            list: [...state.list, wishlistItem(undefined, action)],
            total: state.total + 1,
          });
    }

    case types.WISHLIST_REMOVE: {
      const index1 = state.list.findIndex((item) =>
        compareWishList(item, action)
      ); // check if existed
      return index1 == -1
        ? state // This should not happen, but catch anyway
        : Object.assign({}, state, {
            list: state.list.filter((item) => !compareWishList(item, action)),
            total: state.total - 1,
          });
    }

    case "CLEAN_OLD_STORE":
    case types.WISHLIST_EMPTY: {
      return {
        list: [],
        total: 0,
      };
    }

    default:
      return state;
  }
};

/**
 * TODO: refactor
 */
const wishlistItem = (
  state = { product: undefined, variation: undefined },
  action
) => {
  switch (action.type) {
    case types.WISHLIST_ADD:
      return {
        ...state,
        product: action.payload.product,
      };
    default:
      return state;
  }
};
