/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { Config } from "@common";
import * as types from "./types";

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  selectedCategory: null,
  categoryLayoutMode: Config.CategoryLayout.ListMode,
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case types.CATEGORY_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.CATEGORY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: payload.collections,
      };
    }

    case types.CATEGORY_FAILURE: {
     // //console.log(payload);
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }

    case types.CATEGORY_SELECT: {
      return {
        ...state,
        selectedCategory: payload.category,
      };
    }

    case types.CATEGORY_SWITCH_LAYOUT_MODE: {
      return {
        ...state,
        categoryLayoutMode: payload.mode,
      };
    }

    default: {
      return state;
    }
  }
};
