/**
 * Initialize store
 *
 * @format
 */

import { Alert } from "react-native";
import storage from "redux-persist/es/storage";
import { getStoredState } from "redux-persist";
import { GraphqlAPI } from "@services";
import { Constants, AppConfig } from "@common";

export const getCurrentStore = () => {};

export const compareStore = () => {
  return getStoredState({ key: "app", storage, serialize: true }).then(
    (store) => {
      return store;
    }
  );
};

export const initializeAndTestStore = () => {
  return compareStore().then((store) => {
    const { shopify, isNewStore } = store;
    ////console.log("shopify", shopify);
    return GraphqlAPI&&GraphqlAPI.initClient(
      Constants.isDefaultStore ? AppConfig.Shopify : shopify
    )
      .then((data) => {
       // //console.log("initialized", data);
        if (shopify.fullName && isNewStore && !Constants.isDefaultStore) {
          Alert.alert(`Hello ${shopify.fullName}`, "Thanks for using our app!");
        }

        return {
          shopify,
          isNewStore,
        };
      })
      .catch((error) => {
        console.warn(error.toString());
        return error;
      });
  });
};
