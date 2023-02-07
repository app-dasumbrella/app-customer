/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { createSelector } from "reselect";
import { isEmpty } from "lodash";

const getUserInfo = (state) => state.user.userInfo;

const getShippingAddress = (state, address) => {
  if (!address) {
    return state.carts.shippingAddress;
  }
  return address;
};

const getProductVariants = (product) => {
  return product.variants;
};

const getAddressInput = createSelector(
  getUserInfo,
  getShippingAddress,
  (userInfo, address) => {
    let addressInput = {};

    if (!isEmpty(address)) {
      addressInput = {
        ...address,
        country: address.country,
      };
    }

    return addressInput;
  }
);

const getDefaultShippingAddress = createSelector(
  getUserInfo,
  getShippingAddress,
  (userInfo, address) => {
    if (address) return address;

    if (userInfo && userInfo.defaultAddress&&userInfo.defaultAddress.id) return userInfo.defaultAddress;

    return null;
  }
);

const getDefaultProductVariant = createSelector(
  getProductVariants,
  (variants) => {
    if (variants && variants.length > 0) return variants[0];

    return null;
  }
);

export { getAddressInput, getDefaultShippingAddress, getDefaultProductVariant };
