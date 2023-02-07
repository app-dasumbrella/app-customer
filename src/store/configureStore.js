/** @format */

import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import app from "@redux/app/reducers";
import products from "@redux/products/reducers";
import category from "@redux/category/reducers";
import layout from "@redux/layout/reducers";
import carts from "@redux/carts/reducers";
import user from "@redux/user/reducers";
import country from "@redux/country/reducers";
import wishlist from "@redux/wishlist/reducers";
import payment from "@redux/payment/reducers";
//import reducers from "@redux";
import { persistCombineReducers, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";


export const reducers = combineReducers({
  app,
  products,
  category,
  layout,
  carts,
  user,
  country,
  wishlist,
  payment,
});
const middleware = [
  thunk,
];
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const configureStore = () => {
  let store = null;

  store = compose(applyMiddleware(...middleware))(createStore)(persistedReducer);


  return store;
};

export default configureStore();
