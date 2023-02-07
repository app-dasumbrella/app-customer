/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
import { Device, Config, Constants } from "@common";

const isAndroid = Platform.OS === "android";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  headerLabel: {
    color: "#333",
    fontSize: 28,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 22,
    position: "absolute",
    ...Platform.select({
      ios: {
        top: 60,
      },
      android: {
        top: 50,
      },
    }),
  },
  headerAndroid: {
    flexDirection: "row",
    height: Config.showStatusBar ? 72 : 50,
    backgroundColor: "#fff",
  },
  headerLabelStatic: {
    color: "#333",
    fontSize: 20,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 55,
    marginTop: isAndroid ? -5 : 12,
    paddingTop: Config.showStatusBar ? 23 : 2,
    fontWeight: "bold"
  },

  headerView: {
    width,
    ...Platform.select({
      ios: {
        height: 60,
      },
      android: {
        height: Config.showStatusBar ? 70 : 50,
      },
    }),
  },
  flatlist: {
    paddingTop: 40,
  },
  homeMenu: {
    marginLeft: 16,
    position: "absolute",
    ...Platform.select({
      ios: {
        top: Device.isIphoneX ? 50 : 22,
      },
      android: {
        top: Config.showStatusBar ? 30 : 10,
      },
    }),
    zIndex: 9,
  },
});
