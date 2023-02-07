/** @format */

import { StyleSheet, I18nManager } from "react-native";
import { Color, Constants } from "@common";

export default StyleSheet.create({
  container: {
    height: 50,
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    borderBottomWidth: 1,
    borderColor: Color.DirtyBackground,
    backgroundColor: "#FFF",
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 20,
    fontFamily: Constants.fontFamily,
    color: Color.blackTextPrimary,
  },
});
