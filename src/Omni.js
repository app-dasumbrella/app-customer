/**
 * Created by InspireUI on 17/02/2017.
 *
 * @format
 */
import { SIDEMENU_CLOSE, SIDEMENU_OPEN, SIDEMENU_TOGGLE } from "./redux/types";

import store from "./store/configureStore";
import { Constants } from "./common";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import _IconIO from "react-native-vector-icons/Ionicons";
import _Timer from "react-timer-mixin";
import { DeviceEventEmitter } from "react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export const Icon = MaterialCommunityIcons;
export const IconIO = _IconIO;
export const Timer = _Timer;
export const EventEmitter = DeviceEventEmitter;

// TODO: replace those function after app go live



/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */
export const request = async (url, data = {}) => {
  try {
    const response = await fetch(url, data);

    return await response.json();
  } catch (err) {
    error(err);
    return { error: err };
  }
};

// Drawer
export const openDrawer = () =>
  store.dispatch({
    type: SIDEMENU_OPEN,
  });
export const closeDrawer = () =>
  store.dispatch({
    type: SIDEMENU_CLOSE,
  });
export const toggleDrawer = () =>
  store.dispatch({
    type: SIDEMENU_TOGGLE,
  });

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */
export const toast = (msg, duration = 4000) =>
  EventEmitter.emit(Constants.EmitCode.Toast, msg, duration);
