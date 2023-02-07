/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";

export const countryPending = () => ({
  type: types.COUNTRY_FETCHING,
});

export const countrySuccess = (countries) => ({
  type: types.COUNTRY_SUCCESS,
  payload: {
    countries,
  },
});

export const countryFailure = (error) => ({
  type: types.COUNTRY_FAILURE,
  payload: error,
  error: true,
});
