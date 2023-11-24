/**
 * created by Inspire UI (dang@inspireui.com)
 * @format
 */

import * as types from "./types";

/**
 * checkout check
 */
export const categoryPending = () => ({
  type: types.CATEGORY_FETCHING,
});

export const categorySuccess = (collections) => ({
  type: types.CATEGORY_SUCCESS,
  payload: {
    collections,
  },
});

export const categoryFailure = (error) => ({
  type: types.CATEGORY_FAILURE,
  payload: error,
  error: true,
});

/**
 * select category
 */
export const selectCategory = (category) => ({
  type: types.CATEGORY_SELECT,
  payload: {
    category,
  },
});

/**
 * switch layout mode
 */
export const categorySwitchLayoutMode = (mode) => ({
  type: types.CATEGORY_SWITCH_LAYOUT_MODE,
  payload: {
    mode,
  },
});
