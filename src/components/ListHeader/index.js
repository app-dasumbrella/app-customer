/** @format */

import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { Languages } from "@common";
import styles from "./styles";

@withTheme
export default class ProductListHeader extends Component {
  render() {
    const { title, onPress, hideSeeAll, theme } = this.props;

    if (!title) return null;

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.tagHeader}>{title}</Text>
        </View>
        {!hideSeeAll && (
          <TouchableOpacity onPress={onPress} style={styles.headerRight}>
            <Text style={styles.headerRightText(theme)}>
              {Languages.seeAll.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
