/** @format */

import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { isFunction } from "lodash";
import { Styles, Images } from "@common";

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const NavBarClose = ({
  navigation,
  icon,
  buttonStyle,
  imageStyle,
  onPress,
}) => (
  <TouchableOpacity
    hitSlop={hitSlop}
    style={buttonStyle}
    onPress={() => {
      isFunction(onPress) ? onPress() : navigation.goBack(null);
    }}>
    <Image
      resizeMode="contain"
      source={icon || Images.icons.close}
      style={[
        { width: 10 },
        Styles.Common.toolbarIcon,
        Styles.Common.iconBack,
        imageStyle,
      ]}
    />
  </TouchableOpacity>
);

export default NavBarClose;
