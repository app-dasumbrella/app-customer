/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import moment from "moment";
import { findIndex, filter } from "lodash";

export const isExpired = (expiresAt) => {
  const b = moment(expiresAt);
  const c = b.diff(moment());
  if (c > 0) {
    return false;
  }

  return true;
};

/**
 * update and add address in userInfo
 * reuse old address id, because when update it is return new address id
 */
export const addAndUpdateUserAddress = ({ userInfo, address, id }) => {
  //console.log( userInfo, address, id,' userInfo, address, id')

  if (!userInfo || !address || !id) return {};

  const newAddresses = userInfo.addresses;
  let newDefaultAddress = userInfo.defaultAddress;

  const index = findIndex(newAddresses, (o) => {
    return o.id === id;
  });

  if (index !== -1) {
    newAddresses[index] = {
      ...newAddresses[index],
      ...address,
    };
    if (newDefaultAddress.id === id) {
      newDefaultAddress = newAddresses[index];
    }
  } else {
    newAddresses.push(address);
  }
//console.log(newAddresses,'mmmm')
  return {
    ...userInfo,
    defaultAddress: newDefaultAddress,
    addresses: newAddresses,
  };
};

export const deleteUserAddress = ({ userInfo, id }) => {
  if (!userInfo || !id) return {};

  const newAddresses = filter(userInfo.addresses, (o) => {
    return o.id !== id;
  });

  return {
    ...userInfo,
    // defaultAddress: newDefaultAddress,
    addresses: newAddresses,
  };
};
