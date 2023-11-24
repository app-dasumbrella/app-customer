/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "@components";
import { Languages } from "@common";
import styles from "./styles";

export default class ShopButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          text={this.props.text ? this.props.text : Languages.ShopNow}
          style={[styles.button, this.props.style]}
          textStyle={styles.buttonText}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}
