/** @format */

import { Color, Constants } from "@common";

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
};
