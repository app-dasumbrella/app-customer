/** @format */

import React from "react";
import { TouchableOpacity, Image, I18nManager } from "react-native";
import { Images, Styles } from "@common";
import { toggleDrawer } from "@app/Omni";
import { moderateScale, verticalScale } from "react-native-size-matters";

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const NavBarMenu = () => (
  <TouchableOpacity onPress={toggleDrawer} >
    <Image
      source={Images.icons.menu}
      style={[
        Styles.Common.toolbarIcon,
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

export default NavBarMenu;
// /style={{ position: 'absolute', left: moderateScale(-55), top: verticalScale(16) }}