/** @format */

import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: null,
    width: null,
  },
  containerFullStretch: {
    flexGrow: 1,
    height: null,
    width: null,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  containerOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  wrapper: {
    backgroundColor: "transparent",
    zIndex: 100,
  },
});
