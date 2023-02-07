/**
 * Created by InspireUI on 03/03/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { Styles, Color, Icons } from "@common";
import { Icon } from "../../Omni";
import { Images } from "@common";
import { moderateScale } from "react-native-size-matters";

export default class RowItem extends Component {
  render() {

    const { onPress, category, isSelect, isFirst } = this.props;
    return (
      <View style={[styles.container, isFirst ? { borderTopWidth: 0 } : {}]}>
        <TouchableOpacity style={styles.subContainer} onPress={onPress}>
          <View style={styles.checkboxWrap}>
            {isSelect ? (
              <Image
                source={Images.Check}
                resizeMode={'contain'}
                style={{ width: moderateScale(12), height: moderateScale(12) }}
              />
            ) : null}
          </View>
          <Text style={styles.text}>
            {(isFirst ? "" : "--- ") + category.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: Color.blackDivide,
    borderTopWidth: 1,
  },
  subContainer: {
    ...Styles.Common.RowCenterLeft,
    padding: 20,
  },
  checkboxWrap: {
    height: 20,
    width: 20,
    borderColor: Color.blackTextSecondary,
    borderWidth: 1,
    borderRadius: 5,
    ...Styles.Common.ColumnCenter,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextPrimary,
  },
});

RowItem.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  isSelect: PropTypes.bool,
  isFirst: PropTypes.bool,
};
