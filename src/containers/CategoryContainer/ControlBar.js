/**
 * Created by InspireUI on 03/03/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
} from "react-native";
import { connect } from "react-redux";
import { categorySwitchLayoutMode } from "@redux/actions";
import CategoryPickerContainer from "../CategoryPickerContainer";
import { Color, Images, Styles, Config } from "@common";

const controlBarHeight = 50;

const mapStateToProps = (state) => {
  return {
    categoryLayoutMode: state.category.categoryLayoutMode,
  };
};

/**
 * TODO: refactor
 */
@connect(
  mapStateToProps,
  { categorySwitchLayoutMode }
)
export default class ControlBar extends Component {
  static propTypes = {
    categorySwitchLayoutMode: PropTypes.func.isRequired,
    isVisible: PropTypes.bool,
  };

  state = { modalVisible: false };

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  _openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  _closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {
      categorySwitchLayoutMode,
      categoryLayoutMode,
      isVisible,
      name,
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          { height: isVisible ? controlBarHeight : 0 },
        ]}>
        <TouchableOpacity
          onPress={this._openModal}
          style={styles.iconAndTextWrap}>
          <Image
            source={Images.IconFilter}
            style={[styles.iconStyle, styles.dark]}
          />
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity
              onPress={() =>
                categorySwitchLayoutMode(Config.CategoryLayout.CardMode)
              }
              style={styles.modeButton}>
              <Image
                source={Images.IconCard}
                style={[
                  styles.iconStyle,
                  categoryLayoutMode === Config.CategoryLayout.CardMode &&
                  styles.dark,
                ]}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() =>
              categorySwitchLayoutMode(Config.CategoryLayout.ListMode)
            }
            style={styles.modeButton}>
            <Image
              source={Images.IconList}
              style={[
                styles.iconStyle,
                categoryLayoutMode === Config.CategoryLayout.ListMode &&
                styles.dark,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              categorySwitchLayoutMode(Config.CategoryLayout.GridMode)
            }
            style={styles.modeButton}>
            <Image
              source={Images.IconGrid}
              style={[
                styles.iconStyle,
                categoryLayoutMode === Config.CategoryLayout.GridMode &&
                styles.dark,
              ]}
            />
          </TouchableOpacity>
        </View>
        <CategoryPickerContainer
          ref={(comp) => (this._modal = comp)}
          modalVisible={this.state.modalVisible}
          openModal={this._openModal}
          closeModal={this._closeModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: controlBarHeight,
    backgroundColor: Color.navigationBarColor,
    borderColor: Color.lightDivide,
    borderTopWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 5,

    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modeButton: {
    ...Styles.Common.ColumnCenter,
    borderColor: Color.lightDivide,
    borderLeftWidth: 1,
    width: controlBarHeight - 10,
    height: controlBarHeight - 10,
  },
  iconAndTextWrap: {
    ...Styles.Common.RowCenter,
    marginHorizontal: 20,
  },
  text: {
    color: Color.black,
    paddingLeft: 10,
  },
  iconStyle: {
    resizeMode: "contain",
    width: 18,
    height: 18,
    opacity: 0.2,
  },
  dark: {
    opacity: 0.9,
  },
});
