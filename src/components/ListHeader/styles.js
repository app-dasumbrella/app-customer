/** @format */

import { StyleSheet } from "react-native";
import { Constants, Color, Styles } from "@common";

export default {
  // RenderHedearListView
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: Styles.spaceLayout,
  },
  headerRight: {
    flex: 1 / 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    flexDirection: "row",
  },
  headerRightText: (theme) => ({
    fontSize: 11,
    marginRight: 0,
    marginTop: 0,
    color: theme.primaryColor,
    alignSelf: "flex-end",
    fontFamily: Constants.fontFamily,
    letterSpacing: 0.5,
  }),
  icon: {
    marginRight: 8,
    marginTop: 2,
    backgroundColor: "transparent",
  },
  tagHeader: {
    fontSize: 21,
    color: "#454553",
    letterSpacing: 2,
    fontFamily: Constants.fontFamily,
  },
};
