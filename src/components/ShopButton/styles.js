/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Color, Constants } from "@common";
import { moderateScale } from 'react-native-size-matters'
export default StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    height: 40,
    width: moderateScale(170),
    borderRadius: 20,
    backgroundColor: Color.BuyNowButton,
  },
  buttonText: {
    fontSize: 15,
    //fontFamily: Constants.fontHeader,
  },
});
