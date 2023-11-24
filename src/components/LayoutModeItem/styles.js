/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Color } from "@common";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  newsIcons: {
    marginLeft: 2,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 3,
  },
  imageIcon: {
    marginLeft: 2,
    marginRight: 0,
    marginTop: 0,
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    marginBottom: 10,
    shadowColor: "#000",
    width: 30,
    resizeMode: "contain",
    zIndex: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageIconActive: {
    color: "#fff",
  },
  textActive: {
    color: Color.headerTintColor,
  },
  rowView: {
    width: width / 2 - 40,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: 100,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  rowActive: {
    backgroundColor: "rgba(42, 181, 179, 0.8)",
    borderRadius: 9,
  },
  text: {
    fontSize: 12,
    fontWeight: "200",
    lineHeight: 12,
    color: Color.blackTextPrimary,
  },
});
