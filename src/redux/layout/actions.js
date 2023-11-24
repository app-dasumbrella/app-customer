/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * all product layout horizontal
 */
export const layoutAllPending = () => ({
  type: types.ALL_FETCHING,
});
export const layoutAllfeature= (data) => ({
  type: types.FETCH_SUCCESSFEATURE,
  payload:data
});

export const layoutAllSuccess = (data) => ({
  type: types.ALL_FETCH_SUCCESS,
  payload:data
});

export const layoutAllFailure = (error) => ({
  type: types.ALL_FETCH_FAILURE,
  payload: error,
  error: true,
});

/**
 * each product layout
 */
export const fetchProductsLayoutSuccess = (data, meta) => ({
  type: types.FETCH_SUCCESS,
  payload: {
    data,
  },
  meta,
});

export const fetchProductsLayoutFailure = (error) => ({
  type: types.FETCH_FAILURE,
  payload: error,
  error: true,
});

/**
 * load more product
 */
export const loadMorePending = (meta) => ({
  type: types.MORE_FETCHING,
  meta,
});

export const loadMoreSuccess = (data, meta) => ({
  type: types.MORE_FETCH_SUCCESS,
  payload: {
    data,
  },
  meta,
});

export const loadMoreFailure = (error) => ({
  type: types.MORE_FETCH_FAILURE,
  payload: error,
  error: true,
});

export const switchLayoutMode = (layout) => ({
  type: types.SWITCH_MODE,
  payload: layout,
});
