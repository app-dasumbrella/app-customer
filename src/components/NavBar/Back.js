/** @format */

import React from "react";
import { TouchableOpacity, Image, I18nManager } from "react-native";
import { Images, Styles } from "@common";

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const NavBarBack = ({ navigation, iconBack, buttonStyle, imageStyle }) => (
  <TouchableOpacity
    style={buttonStyle}
    hitSlop={hitSlop}
    onPress={() => {
      navigation.pop();
    }}>
    <Image
      resizeMode="contain"
      source={iconBack || Images.icons.back}
      style={[
        { width: 10 },
        Styles.Common.toolbarIcon,
        iconBack && Styles.Common.iconBack,
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
        imageStyle,
      ]}
    />
  </TouchableOpacity>
);

export default NavBarBack;
