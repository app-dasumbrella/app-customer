import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Button } from "@components";

import styles from "./styles";

 class UserProfileButton extends Component {
  static propTypes = {
    label:PropTypes.string,
    onPress: PropTypes.func.isRequired
  };


  render() {
    const {label, onPress } = this.props;

    return (
      <View style={styles.row}>
        <Button
            onPress={onPress}
            style={styles.button}
            textStyle={styles.textButton}
            type="text"
            transparent
            text = {label}
          />
      </View>
    );
  }
}
export default UserProfileButton;