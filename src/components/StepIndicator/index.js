/** @format */

import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Color } from "@common";
import styles from "./styles";

const widthScreen = Dimensions.get("window").width;

/**
 * TODO: refactore later
 */
export default class StepIndicator extends Component {
  constructor(props) {
    super(props);

    const defaultStyles = {
      stepIndicatorSize: 30,
      borderPadding: 6,
      color: Color.stepActive,
    };

    this.customStyles = Object.assign(defaultStyles, props.customStyles);
    this.stepStrokeWidth = 10;
    this.imageMargin = this.customStyles.stepIndicatorSize / 2;

    const allIndicatorWidth =
      props.steps.length * this.customStyles.stepIndicatorSize +
      2 * props.steps.length * this.customStyles.borderPadding;
    this.marginContent =
      widthScreen -
      allIndicatorWidth -
      (props.steps.length - 1) * this.stepStrokeWidth;

    this.containerWidth = widthScreen;
    if (this.marginContent >= 50) {
      this.containerWidth = widthScreen - this.marginContent + 50;
      this.marginContent = 25;
    } else if (this.marginContent < 20) {
      this.marginContent = 10;
      this.stepStrokeWidth =
        (widthScreen - allIndicatorWidth - this.marginContent * 2) /
        (props.steps.length - 1);
    }

    if (Platform.OS === "ios") {
      this.labelWidth =
        this.marginContent * 2 +
        this.customStyles.stepIndicatorSize +
        2 * this.customStyles.borderPadding;
    } else {
      this.labelWidth = this.marginContent * 2;
    }
  }

  render() {
    const content = [];
    const label = [];

    for (let i = 0; i < this.props.steps.length; i++) {
      const item = this.props.steps[i];
      content.push(this.renderStepIndicator(i, item));
      label.push(
        <Text
          key={i}
          style={[
            styles.label,
            { width: this.labelWidth },
            i <= this.props.currentIndex && { color: Color.green },
          ]}
        >
          {item.label}
        </Text>
      );
      if (i != this.props.steps.length - 1) {
        content.push(this.renderProgressBar(i));
      }
    }

    return (
      <View style={[styles.container, { width: this.props.width }]}>
        <View style={styles.indicatorContainer}>{content}</View>
      </View>
    );
  }

  renderStepIndicator = (index, item) => {
    const indicatorContainer = {
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <TouchableOpacity
        // onPress={() => {
        //   if (this.props.currentIndex == 3) {
        //   } else {
        //     index < this.props.currentIndex && this.props.onChangeTab(index);
        //   }
        // }}
        onPress={() =>
          index < this.props.currentIndex && this.props.onChangeTab(index)
        }
        style={indicatorContainer}
        key={`indicator-${index}`}
      >
        <Text
          style={[
            styles.label,
            index <= this.props.currentIndex && { color: "#FFF" },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  renderProgressBar = (index) => {
    const progressBarContainer = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth,
      justifyContent: "center",
      zIndex: 3,
    };

    const progressBarBorder = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth + 4,
      position: "absolute",
      top: 7,
      left: -2,
      right: -2,
      borderTopWidth: 1.5,
      borderColor: index < this.props.currentIndex ? "#FFF" : "#CED7DD",
    };

    return (
      <View style={progressBarContainer} key={`progress-${index}`}>
        <View style={progressBarBorder} />
      </View>
    );
  };
}

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0,
};
