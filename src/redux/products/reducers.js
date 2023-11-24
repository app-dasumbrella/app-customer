/** @format */

import * as types from "./types";

const initialState = {
  list: [],
  isFetching: false,
  error: null,
  hasNextPage: false,
  cursor: null,
};

export default (state = initialState, action) => {
  const { error, meta, type, payload } = action;

  switch (type) {
    case types.FETCHING:
    case types.ALL_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        cursor: null,
      };
    }

    case types.MORE_FETCHING:
    case types.MORE_ALL_FETCHING: {
      return {
        ...state,
        error: null,
        cursor: null,
      };
    }

    case types.FETCH_SUCCESS:
    case types.ALL_FETCH_SUCCESS: {
      return {
        ...state,
        list: payload.list,
       // hasNextPage: payload.hasNextPage,
       // cursor: payload.cursor,
        isFetching: false,
        error: null,
      };
    }

    case types.MORE_FETCH_SUCCESS:
    case types.MORE_ALL_FETCH_SUCCESS: {
      return {
        ...state,
        list: [...state.list, ...payload.list],
        hasNextPage: payload.hasNextPage,
        cursor: payload.cursor,
        isFetching: false,
        error: null,
      };
    }

    case types.FETCH_FAILURE:
    case types.MORE_FETCH_FAILURE:
    case types.MORE_ALL_FETCH_FAILURE:
    case types.ALL_FETCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: payload,
        cursor: null,
      };
    }

    case types.CLEAN_PRODUCT: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
