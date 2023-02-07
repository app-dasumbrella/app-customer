/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Color } from "@common";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  fullName: {
    fontWeight: "600",
    color: Color.blackTextPrimary,
    backgroundColor: "transparent",
    fontSize: 30,
    marginBottom: 6,
  },
  address: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#9B9B9B",
    fontWeight: "600",
  },
  textContainer: {
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  textButton: {
    fontSize: 14,
  },
  avatar: {
    height: width / 4,
    width: width / 4,
    borderRadius: width / 4 / 2,
    borderColor: "#fff",
    borderWidth: 0.5,
    marginBottom: 6,
  },
  loginText: {
    color: "#666",
    textAlign: "center",
  },

  /**
   * row item
   */
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F5F5F5",
    paddingHorizontal: 20,
    height: 60,
  },
  leftText: {
    fontSize: 16,
    color: "#9B9B9B",
  },
  rightText: {
    fontSize: 16,
    color: Color.blackTextPrimary,
    fontWeight: "300",
    alignSelf: "flex-start",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
});
