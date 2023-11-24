/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import { Dimensions, Platform } from "react-native";
import Constants from "./Constants";
import Device from "./Device";
import Color from "./Color";
import Config from "./Config";
import { moderateScale, verticalScale } from "react-native-size-matters";

const { height, width, heightWindow, scale } = Dimensions.get("window");

const SPACE_LAYOUT = Config.SpaceLayout; // change it to paddingLeft home screen and product detail

const Styles = {
  window: {
    width,
    height,
    scale,
  },
  width: Dimensions.get("window").width,
  height: Platform.OS !== "ios" ? height : height - 20,
  navBarHeight: Platform !== "ios" ? height - heightWindow : 0,
  headerHeight: (65 * height) / 100,

  thumbnailRatio: 1.2, // Thumbnail ratio, the product display height = width * thumbnail ratio

  // space layout
  spaceLayout: SPACE_LAYOUT,

  app: {
    flexGrow: 1,
    backgroundColor: Device.isIphoneX ? "#FFF" : "#000",
  },
  FontSize: {
    tiny: moderateScale(12),
    small: moderateScale(14),
    medium: moderateScale(16),
    big: moderateScale(18),
    large: moderateScale(20),
  },
  IconSize: {
    TextInput: 25,
    ToolBar: 18,
    Inline: 20,
    SmallRating: 14,
  },
  /**
   * size layout
   * card: 1,
    twoColumn: 2,
    simple: 3,
    list: 4,
    advance: 5,
    threeColumn: 6,
    horizon: 7,
    twoColumnHigh: 8,
    miniBanner: 9,
   */
  LayoutCard: {
    [`layout${Constants.Layout.card}`]: {
      width: width - SPACE_LAYOUT,
      height: 150,
    },
    [`layout${Constants.Layout.twoColumn}`]: {
      width: 180,
      height: 150,
    },
    [`layout${Constants.Layout.simple}`]: {
      width: width - SPACE_LAYOUT,
      height: 50,
    },
    [`layout${Constants.Layout.list}`]: {
      width: (width / 100) * 30,
      height: (width / 100) * 30 - 20,
    },
    [`layout${Constants.Layout.advance}`]: {
      width: 115,
      height: 145,
    },
    // apply three column for see all screen
    [`layout${Constants.Layout.threeColumn}`]: {
      width: (width - 55) / 3,
      height: 135,
    },
    [`layout${Constants.Layout.twoColumnHigh}`]: {
      width: 180,
      height: 220,
    },
    [`layout${Constants.Layout.miniBanner}`]: {
      width: width - SPACE_LAYOUT,
      height: 250,
    },
  },
};

Styles.Common = {
  TextHeaders: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: 'black',
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 10
  },
  Column: {},
  ColumnCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  ColumnCenterTop: {
    alignItems: "center",
  },
  ColumnCenterBottom: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ColumnCenterLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  ColumnCenterRight: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  Row: {
    flexDirection: "row",

    ...Platform.select({
      ios: {
        top: !Config.showStatusBar
          ? Device.isIphoneX
            ? -20
            : -8
          : Device.isIphoneX
            ? -15
            : 0,
      },
      android: {
        top: 0,
      },
    }),
  },
  RowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  RowCenterTop: {
    flexDirection: "row",
    justifyContent: "center",
  },
  RowCenterBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  RowCenterLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  RowCenterRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  RowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // More traits

  // main screen style
  appContainer: {
    flex: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
  // layout
  SpacingLayout: {
    marginLeft: Styles.spaceLayout,
  },

  IconSearchView: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 10,
    borderRadius: 50,

    shadowOffset: { width: 0, height: -4 },
    shadowColor: "rgba(0,0,0, .3)",
    elevation: 10,
    shadowOpacity: 0.1,
    zIndex: 9999,
  },
  IconSearch: {
    width: 20,
    height: 20,
    margin: 12,
    zIndex: 9999,
  },
  logo: {
    width: width * 0.70,
    height: Platform.OS === "ios" ? 20 : 40

  },
  title: {
    width: Platform.OS === "ios" ? 180 : 200,
    height: Platform.OS === "ios" ? 20 : 22,
    textAlign: "center",
    // fontFamily: Constants.fontFamilyBold,

  },
  headerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    marginVertical: verticalScale(5),
    elevation: 0,
    borderBottomWidth: 0.1
  },
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
  },
  headerStyleWishList: {
    textAlign: "center",
    alignSelf: "center",
    marginBottom: !Config.showStatusBar
      ? Device.isIphoneX
        ? 40
        : 15
      : Device.isIphoneX
        ? 25
        : 5,
  },
  toolbarIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
    marginBottom: 2,
    marginLeft: 16,
  },
  iconBack: {
    width: 24,
    marginLeft: 20,
  },
  toolbarFloat: {
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width,
  },
  viewCover: {
    backgroundColor: "#FFF",
    zIndex: 99999,
    bottom: 0,
    left: 0,
    width,
    height: 20,
    // position: "absolute",
  },
  viewCoverWithoutTabbar: {
    backgroundColor: "#FFF",
    zIndex: 99999,
    bottom: 0,
    left: 0,
    width,
    height: 35,
    position: "absolute",
  },
  /**
   * shadow
   */
  shadowCard: {
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 10 },
    shadowRadius: 10,
    paddingBottom: 10, // needed for shadow
  },

  /**
   * checkout styles
   */
  CheckoutBoxContainer: {
    flex: 1,
  },
  CheckoutBox: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: Color.blackDivide,
    shadowOpacity: 1.0,
    marginBottom: 100,
    margin: 20,
  },
  CheckoutBoxScrollView: {
    padding: 10,
  },
  CheckoutButtonBottom: {
    backgroundColor: Color.green,
    height: Device.isIphoneX ? 59 : 50,
  },
  CheckoutButtonText: {
    // fontFamily: Constants.fontFamilyBold,

    fontSize: 20,
    color: "#FFF",
    letterSpacing: 1.2,
  },
  CheckoutHeader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width,
  },
  CheckoutHeaderBg: {
    height: height / 3.5,
    width,
    marginTop: -20,
    borderRadius: 50,
  },
  /**
   * textinput
   */
  Textinput: {
    flex: 1,
    fontSize: 16,
    // fontFamily: Constants.fontFamily,
    height: 44,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#cfcfe2",
  },
};

export default Styles;
