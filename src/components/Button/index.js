/**
 * Created by InspireUI on 17/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Color } from "@common";
import { Icon } from "@app/Omni";

class Button extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const {
      text,
      icon,
      onPress,
      button,
      containerStyle,
      textStyle,
      containerColor,
      textColor,
      isLoading,
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          button,
          { backgroundColor: containerColor },
          containerStyle,
        ]}
        disabled={isLoading}
        onPress={onPress}>
        {icon ? (
          <Icon name={icon} color={textColor} size={24} style={styles.icon} />
        ) : (
          <View />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
        {isLoading && <ActivityIndicator />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    borderRadius: 22,
    padding: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  icon: {
    marginRight: 10,
  },
});

Button.defaultProps = {
  text: "Button",
  onPress: () => "Button pressed!",
  containerStyle: {},
  textStyle: {},
  containerColor: Color.theme2,
  textColor: "white",
};

export default Button;
