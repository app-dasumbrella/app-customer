/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";
import Color from "@common/Color";
import styles from "./styles";

const Spinkit = ({ style }) => (
  <View style={[styles.spinner, style || null]}>
    <ActivityIndicator color={Color.spin} />
  </View>
);

Spinkit.propTypes = {
  style: PropTypes.any,
};

export default Spinkit;
