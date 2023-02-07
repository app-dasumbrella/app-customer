/**
 * @format
 * @author: luyxtran264@gmail.com
 */

import { persistCombineReducers, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

// ducks style
import app from "./app";
import products from "./products";
import category from "./category";
import layout from "./layout";
import carts from "./carts";
import user from "./user";
import country from "./country";
import wishlist from "./wishlist";
import payment from "./payment";
const config = {
  key: "root",
  storage,
  blacklist: [
    "app",
    "layout",
    "products",
    "category",
    "user",
    "payment",
    "netInfo",
    "toast",
    "nav",
  ],
  whitelist: ['carts']
};

const appPersistConfig = {
  key: "app",
  storage,
  blacklist: ["isOpenSidemenu"],
};

const layoutPersistConfig = {
  key: "layout",
  storage,
  blacklist: ["isFetching", "error"],
};

const cartPersistConfig = {
  key: "carts",
  storage,
  blacklist: ["isFetching", "error"],
  whitelist: ['cartItems']
};

const productsPersistConfig = {
  key: "products",
  storage,
  blacklist: ["isFetching", "error", "cursor"],
};

// const categoryPersistConfig = {
//   key: "category",
//   storage,
//   blacklist: ["isFetching", "error"],
// };

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["isFetching", "error"],
};

const paymentPersistConfig = {
  key: "payment",
  storage,
  blacklist: ["paymentMethods", "error", "payments"],
};


export default persistCombineReducers(config, {
  app: persistReducer(appPersistConfig, app),
  products: persistReducer(productsPersistConfig, products),
  category,
  layout: persistReducer(layoutPersistConfig, layout),
  carts: persistReducer(cartPersistConfig, carts),
  user: persistReducer(userPersistConfig, user),
  country,
  wishlist,
  payment: persistReducer(paymentPersistConfig, payment),
});
