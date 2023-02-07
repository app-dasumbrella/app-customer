/** @format */

import { StyleSheet, I18nManager } from "react-native";
import { Color, Constants, Styles } from "@common";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 50,
    paddingLeft: 20,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Color.DirtyBackground,
    marginBottom: 5,
    marginRight: 20,
  },
  fullName: {
    fontSize: 24,
    fontFamily: Constants.fontFamily,
    color: Color.SideMenuText,
    backgroundColor: "transparent",
    marginBottom: 6,
    textAlign: "left",
  },
  email: {
    backgroundColor: "transparent",
    fontSize: 13,
    textAlign: "left",
    color: Color.SideMenuTextActived,
    fontFamily: Constants.fontFamily,
  },
  headerCategory: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textHeaderCategory: {
    fontFamily: Constants.fontFamily,
    fontSize: Styles.FontSize.big,
    color: Color.SideMenuTextActived,
    paddingRight: I18nManager.isRTL ? 20 : 0,
    paddingLeft: I18nManager.isRTL ? 20 : 0,
    textAlign: "left",
  },
  textContainer: {
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    flex: 1,
  },
});
