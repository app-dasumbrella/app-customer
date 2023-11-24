/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, I18nManager, Text } from "react-native";
import { Styles, Color, Constants, Languages } from "../../../common";
import { IconIO } from "../../../Omni";

class DrawerButtonChild extends Component {
  render() {
    const { onPress, text, iconRight, uppercase } = this.props;
    const transText = text !== "" && Languages[text] ? Languages[text] : text;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, I18nManager.isRTL && { paddingRight: 20 }]}>
          {uppercase ? transText.toUpperCase() : transText}
        </Text>
        {iconRight && <IconIO name={iconRight} size={24} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Styles.Common.RowCenterBetween,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flex: 1,
  },
  text: {
    color: Color.SideMenuText,
    fontSize: Styles.FontSize.tiny,
    // fontFamily: Constants.fontFamily,
  },
});

DrawerButtonChild.propTypes = {
  text: PropTypes.string,
  iconRight: PropTypes.string,
  uppercase: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

DrawerButtonChild.defaultProps = {
  text: "Default button name",
  uppercase: false,
  onPress: () => console.log("Pressed"),
};

export default DrawerButtonChild;
