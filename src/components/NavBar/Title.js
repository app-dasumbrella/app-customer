/** @format */

import React from "react";
import { Animated } from "react-native";
import { Styles } from "@common";

const NavBarTitle = (props) => {
  const scrollAnimation =
    props && props.navigation
      ? props.navigation.getParam("animatedHeader")
      : new Animated.Value(1);

  return (
    <Animated.Text
      style={[Styles.Common.title, props.style, { opacity: scrollAnimation }]}>
      {props.title ? props.title.toUpperCase() : ""}
    </Animated.Text>
  );
};

export default NavBarTitle;
