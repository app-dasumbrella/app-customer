/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { createSelector } from "reselect";

const getWishlistSelector = (state) => state.wishlist.list;

const getProductIdSelector = (state, product) => product.id;

const getIsWishlistSelector = createSelector(
  getWishlistSelector,
  getProductIdSelector,
  (list, productId) => {
    const isWishlist = list.find((item) => item.product.id === productId);

    return isWishlist;
  }
);

export { getIsWishlistSelector };
