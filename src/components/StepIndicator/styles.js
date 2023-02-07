/** @format */

import { StyleSheet } from "react-native";
import { Color, Constants } from "@common";

export default StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 8,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#CED7DD",
    fontSize: 16,
    textAlign: "center",
    fontFamily: Constants.fontHeader,
    marginLeft: 10,
    marginRight: 10,
  },
  labelActive: {
    color: Color.green,
    fontFamily: Constants.fontHeader,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
});
