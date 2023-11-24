/** @format */

import React from "react";
import { View } from "react-native";
import { Images, Styles, Events } from "@common";
import NavBarIcon from "./Icon";

const NavBarSelectLayoutIcon = () => (
  <View style={Styles.Common.toolbarIcon}>
    <NavBarIcon
      icon={Images.IconGrid}
      size={17}
      onPress={Events.openModalLayout}
    />
  </View>
);

export default NavBarSelectLayoutIcon;
