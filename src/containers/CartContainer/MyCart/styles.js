/** @format */

import { StyleSheet } from "react-native";
import { Color, Constants } from "@common";
import { moderateScale } from 'react-native-size-matters'

export default {
  list: {
    flex: 1,
  },
  couponContent: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputCoupon: {
    marginLeft: 20,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  btnEnter: {
    backgroundColor: "#ffc107",
    height: 40,
    width: 80,
    borderRadius: 20,
    marginRight: 20,
  },
  btnEnterText: {
    fontWeight: "bold",
  },
  hiddenRow: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  iconsBack: {
    tintColor: "#CCCCCC",
    width: 26,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  rowEmpty: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  label: {
    fontSize: 18,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
  },
  value: {
    fontSize: moderateScale(15),
    color: 'black',
  },

  sav: {
    fontSize: moderateScale(14),

  },
  summary: {
    padding: 10,
  },
  button: (theme) => ({
    marginTop: 20,
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: theme.primaryColor,
  }),
  emptyText: {
    margin: 20,
    fontFamily: Constants.fontFamilyBold,
    textAlign: "center",
    fontSize: 18,
    color: 'black'
  },
};
