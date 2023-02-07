/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import _ from "lodash";
import styles from "./styles";
import { Images } from "@common";
import { moderateScale } from "react-native-size-matters";

export default class UserProfileItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.any,
  };

  static defaultProps = {
    icon: false,
  };

  render() {
    const { label, value, onPress, icon } = this.props;

    return (
      <View style={styles.row}>
        <Text style={styles.leftText}>{label}</Text>
        <TouchableOpacity onPress={onPress} style={styles.rightContainer}>
          <Text style={styles.rightText}>{value}</Text>
          {icon &&
            _.isBoolean(icon) && (
              <Image
                style={{ width: moderateScale(20), height: moderateScale(15) }}
                source={Images.icons.next}
                resizeMode={'contain'}
              />
            )}
          {icon && !_.isBoolean(icon) && icon()}
        </TouchableOpacity>
      </View>
    );
  }
}
