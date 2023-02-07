/** @format */

import { Color, Constants } from "@common";
import { moderateScale, verticalScale } from "react-native-size-matters";

export default {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  rowItem: {
    flex: 1,
  },
  rowEmpty: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: Color.Text,
    fontFamily: Constants.fontFamilyBold,
  },
  labelText:{
    fontSize:moderateScale(14),
    fontWeight:'bold',
    color:'black',
    marginBottom:moderateScale(8)
  },
  label2: {
    fontSize: 10,
    color: Color.Text,
    fontFamily: Constants.fontFamily,
  },
  value: {
    fontSize: 18,
    color: Color.headerTintColor,
    fontFamily: Constants.fontFamily,
  },
  summary: {
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#d4dce1",
  },
  priceItems: (theme) => ({
    color: theme.primaryColor,
    fontSize: 18,
    fontFamily: Constants.fontFamilyBold,
  }),
  shippingMethod: {
    marginBottom: 20,
  },
  marginVerticals:{
    marginVertical: verticalScale(5)
  }
};
