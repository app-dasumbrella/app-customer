/** @format */

import { StyleSheet } from "react-native";
import { Styles, Color } from "@common";

export default StyleSheet.create({
  listView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingBottom: Styles.navBarHeight + 10,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Color.background,
  },
});
