/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import { Dimensions } from "react-native";

const Constants = {
  nameStore: "EvaStore",
  RTL: false, // default to set redux. Only use first time
 // useReactotron: true,
  Language: "English", // Arabic, English. Default to set redux. Only use first time
  fontFamily: "Dosis",
  fontFamilyBold: "Dosis-Bold",
  fontHeader: "Baloo",
  fontHeaderAndroid: "Baloo",
  isDefaultStore: false,
  EmitCode: {
    Toast: "toast",
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get("window").width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get("window").height * percent;
    },
  },

  LimitAddToCart: 100,
  ShowQuickCart: false, // show hide quick add to cart in product item

  PostImage: {
    small: "small",
    medium: "medium",
    medium_large: "medium_large",
    large: "large",
  },
  Layout: {
    card: 1,
    twoColumn: 2,
    simple: 3,
    list: 4,
    advance: 5,
    threeColumn: 6,
    horizon: 7,
    twoColumnHigh: 8,
    miniBanner: 9,
  },
  pagingLimit: 10,

  fontText: {
    size: 16,
  },
};

export default Constants;
