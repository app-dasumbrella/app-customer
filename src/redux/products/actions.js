/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * load all product
 */
export const productAllPending = () => ({
  type: types.ALL_FETCHING,
});

export const productAllSuccess = (data) => ({
  type: types.ALL_FETCH_SUCCESS,
  payload: {
    ...data,
  },
});

export const productAllFailure = (error) => ({
  type: types.ALL_FETCH_FAILURE,
  payload: error,
  error: true,
});

/**
 * load more all product
 */
export const productAllMorePending = () => ({
  type: types.MORE_ALL_FETCHING,
});

export const productAllMoreSuccess = (data) => ({
  type: types.MORE_ALL_FETCH_SUCCESS,
  payload: {
    ...data,
  },
});

export const productAllMoreFailure = (error) => ({
  type: types.MORE_ALL_FETCH_FAILURE,
  payload: error,
  error: true,
});

/**
 * load product by collection id
 */
export const productPending = () => ({
  type: types.FETCHING,
});

export const productSuccess = (data) => ({
  type: types.FETCH_SUCCESS,
  payload: {
    ...data,
  },
});

export const productFailure = (error) => ({
  type: types.FETCH_FAILURE,
  payload: error,
  error: true,
});

/**
 * load more product by collection id
 */
export const productMorePending = () => ({
  type: types.MORE_FETCHING,
});

export const productMoreSuccess = (data) => ({
  type: types.MORE_FETCH_SUCCESS,
  payload: {
    ...data,
  },
});

export const productMoreFailure = (error) => ({
  type: types.MORE_FETCH_FAILURE,
  payload: error,
  error: true,
});

/**
 * @function cleanProducts clean all product to fetch another
 */
export const cleanProducts = () => ({
  type: types.CLEAN_PRODUCT,
});
