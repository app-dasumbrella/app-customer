/** @format */

import { flatten } from "lodash";
import * as types from "./types";
import { getIndex } from "./utils";
// import Reactotron from 'reactotron-react-native'

const initialState = {
  layout: [],
  isFetching: false,
  error: null,
  layoutMode: 7,
};

const layoutReducer = (state = initialState, action) => {
  const { error, meta, type, payload } = action;

  switch (type) {
    case types.ALL_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_SUCCESSFEATURE: {

      return {
        ...state,
        isFetching: false,
        error: null,
        featuredlist: payload
      };
    }
    case types.ALL_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    case types.FETCHING: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === getIndex(state.layout, meta)) {
          layout.push({
            ...item,
            isFetching: true,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.FETCH_SUCCESS: {
      const layout = [];
      const { data } = payload;
      state.layout.map((item, index) => {
        if (index === getIndex(state.layout, meta)) {
          layout.push({
            ...item,
            list: flatten(data.list),
            isFetching: false,
            hasNextPage: data.hasNextPage,
            cursor: data.cursor,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.MORE_FETCHING: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === getIndex(state.layout, meta)) {
          layout.push({
            ...item,
            isFetching: true,
            error: null,
            cursor: null,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.MORE_FETCH_SUCCESS: {
      const layout = [];
      state.layout.map((item, index) => {
        //   Reactotron.log("data.cursor", getIndex(state.layout, meta));
        if (index === getIndex(state.layout, meta)) {
          const { data } = payload;
          layout.push({
            ...item,
            list: item.list.concat(data.list),
            isFetching: false,
            hasNextPage: data.hasNextPage,
            cursor: data.cursor,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.SWITCH_MODE: {
      return {
        ...state,
        layoutMode: payload,
      };
    }

    default:
      return state;
  }
};

export default layoutReducer;
