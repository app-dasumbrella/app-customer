/** @format */

import { StyleSheet, Platform } from "react-native";
import { Device, Styles } from "@common";

const width = Styles.window.width;
const height = Styles.window.height;

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

const entryBorderRadius = 4;
const slideHeight = height * 0.58;
const slideWidth = wp(82);
const itemHorizontalMargin = wp(2);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default StyleSheet.create({
  modalBoxWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: "#FFF",
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: Device.ToolbarHeight + 20,
    zIndex: 9999,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    overflow: "hidden",
  },
  slider: {
    width: slideWidth,
    paddingBottom: 20,
  },
  sliderContentContainer: {
    height: slideHeight,
  },
  slideStyle: {
    borderTopLeftRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    overflow: "hidden",
  },
});
