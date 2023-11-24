/** @format */

import React from "react";
import { I18nManager, View, Platform } from "react-native";
import { Styles } from "@common";

const NavBarEmpty = () => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}
  />
);
export default NavBarEmpty;
