/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * wishlist
 */
export const addWishlistItem = (product) => ({
  type: types.WISHLIST_ADD,
  payload: {
    product,
  },
});

export const removeWishlistItem = (product) => ({
  type: types.WISHLIST_REMOVE,
  payload: {
    product,
  },
});

export const emptyWishlistItem = () => ({
  type: types.WISHLIST_EMPTY,
});
