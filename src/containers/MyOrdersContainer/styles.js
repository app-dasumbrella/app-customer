/** @format */

import { StyleSheet, Platform } from "react-native";
import { Color, Constants, Styles } from "@common";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: "#B7C4CB",
  },
  titleEmpty: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: Constants.fontFamilyBold,
  },
  labelView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: (90 * Styles.window.width) / 100,
    backgroundColor: "rgba(206, 215, 221, 1)",
    borderRadius: 10,
    padding: 5,
    alignItems: "flex-start",
  },
  orderDetailLabel: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: Color.TabActive,
    marginTop: 10,
    marginBottom: 4,
    fontFamily: Constants.fontFamilyBold,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingLeft: 6,
  },
  rowLabel: {
    fontSize: 16,
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
  },
  label: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 16,
    color: Color.Text,
    marginLeft: 8,
  },
  message: {
    fontSize: moderateScale(16),
    textAlign: "center",
    fontFamily: Constants.fontFamily,
    color: Color.Text,
    width: 230,
    marginTop: 10,
    lineHeight: 25,
  },
  flatlist: {
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontFamily: Constants.fontFamilyBold,
    color: Color.TextDefault,
    marginBottom: 5,
  },
  textDetail: {
    color: Color.Text,
    alignSelf: "center",
    marginBottom: 5,
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  checkStatusText: {
    color: Color.Text,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  text1: { color: 'white', fontWeight: 'bold', fontSize: moderateVerticalScale(15) },
  padding: {
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    paddingHorizontal: '6%',
    paddingVertical: moderateVerticalScale(10),
    marginHorizontal: '5%'
  },
  padding2: {
    borderBottomLeftRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
    paddingHorizontal: '6%',
    paddingVertical: moderateVerticalScale(10),
    marginHorizontal: '5%',
    borderWidth: 0.5,
    borderColor: 'grey',
    marginBottom: moderateVerticalScale(20)
  }
});
