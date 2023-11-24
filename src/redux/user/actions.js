/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * login user
 */
export const loginPending = () => ({
  type: types.LOGIN_FETCHING,
});

export const loginSuccess = (customer) => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    // accessToken: customer.accessToken,
    // expiresAt: customer.expiresAt,
    userInfo: customer.userInfo,
    logintype: customer.logintype,
  },
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
  error: true,
});

/**
 * register user
 */
export const registerPending = () => ({
  type: types.REGISTER_FETCHING,
});

export const registerSuccess = (data) => ({
  type: types.REGISTER_SUCCESS,
  payload: data
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
  error: true,
});

/**
 * register user
 */
export const userInfoPending = () => ({
  type: types.USER_INFO_FETCHING,
});

export const userInfoSuccess = (user) => ({
  type: types.USER_INFO_SUCCESS,
  payload: user
});

export const userInfoFailure = (error) => ({
  type: types.USER_INFO_FAILURE,
  payload: error,
  error: true,
});

/**
 * logout
 */
export const logoutUser = (payload) => ({
  type: types.LOGOUT,
  payload
});

/**
 * create user address
 */
export const createUserAddressPending = () => ({
  type: types.USER_CREATE_ADDRESS_FETCHING,
});

export const createUserAddressSuccess = (address) => ({
  type: types.USER_CREATE_ADDRESS_SUCCESS,
  payload: {
    address,
    id: address.id
  },
});

export const createUserAddressFailure = (error) => ({
  type: types.USER_CREATE_ADDRESS_FAILURE,
  payload: error,
  error: true,
});

/**
 * update user address
 */

export const updateUserAddressPending = () => ({
  type: types.USER_UPDATE_ADDRESS_FETCHING,
});
export const listUserAddressSuccess = (address) => ({
  type: types.USER_LIST_ADDRESS_SUCCESS,
  payload: address,
});
export const updateUserAddressSuccess = (address, id) => ({
  type: types.USER_UPDATE_ADDRESS_SUCCESS,
  payload: {
    address,
    id,
  },
});

export const updateUserAddressFailure = (error) => ({
  type: types.USER_UPDATE_ADDRESS_FAILURE,
  payload: error,
  error: true,
});

/**
 * update user default address
 */
export const updateUserDefaultAddressPending = () => ({
  type: types.USER_UPDATE_DEFAULT_ADDRESS_FETCHING,
});

export const updateUserDefaultAddressSuccess = (user) => ({
  type: types.USER_UPDATE_DEFAULT_ADDRESS_SUCCESS,
  payload: user,
});

export const updateUserDefaultAddressFailure = (error) => ({
  type: types.USER_UPDATE_DEFAULT_ADDRESS_FAILURE,
  payload: error,
  error: true,
});

/**
 * delete user address
 */
export const deleteUserAddressPending = () => ({
  type: types.USER_DELETE_ADDRESS_FETCHING,
});

export const deleteUserAddressSuccess = (id) => ({
  type: types.USER_DELETE_ADDRESS_SUCCESS,
  payload: {
    id,
  },
});

export const deleteUserAddressFailure = (error) => ({
  type: types.USER_DELETE_ADDRESS_FAILURE,
  payload: error,
  error: true,
});
export const storedummyAdd = (error) => ({
  type: types.USER_DUMMY_ADDRESS_SUCCESS,
  payload: error,
});

export const storedStaticAdd = (error) => ({
  type: types.USER_STATIC_ADDRESS_SUCCESS,
  payload: error,
});





