/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from "./types";

const initialState = {
  list: {},
  isFetching: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.COUNTRY_FETCHING:
      return {
        ...state,
        isFetching: false,
      };

    case types.COUNTRY_SUCCESS:
      return {
        ...state,
        list: payload.countries,
        isFetching: false,
      };

    case types.COUNTRY_FAILURE:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};
