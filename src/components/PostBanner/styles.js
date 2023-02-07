/** @format */

import { StyleSheet } from "react-native";

import { Constants, Styles } from "@common";

const { width, height } = Styles.window;

const vw = width / 100;

export default StyleSheet.create({
  bannerView: {
    width,
    height: Styles.headerHeight,
    marginBottom: 8,
  },
  banner: {
    height: Styles.headerHeight,
    width,
    backgroundColor: "#ccc",
  },
  paging: {
    top: (-height * 11) / 100,
    right: 10,
  },
  bannerImage: {
    resizeMode: "cover",
    width,
    height: Styles.headerHeight,
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  bannerText: {
    position: "absolute",
    bottom: 0,
    height: Styles.headerHeight / 2,
  },
  bannerGradient: {
    width,
    alignItems: "flex-start",
    height: Styles.headerHeight / 2,
    justifyContent: "flex-end",
  },
  bannerTitle: {
    marginTop: 12,
    marginRight: 12,
    marginBottom: 4,
    marginLeft: 12,
    backgroundColor: "transparent",
    color: "white",
    fontSize: 20,
    textAlign: "left",
    fontFamily: Constants.fontHeader,
  },
  bannerDate: {
    backgroundColor: "transparent",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width - vw * 5,
  },
  price: {
    color: "rgba(255,255,255, 0.7)",
  },
  salePrice: {
    color: "rgba(255,255,255, 0.7)",
    textDecorationLine: "line-through",
    fontSize: Styles.FontSize.tiny,
    lineHeight: 18,
  },
  time: {
    color: "rgba(255,255,255, 0.7)",
  },
});
