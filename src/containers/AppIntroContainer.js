/** @format */

import React, { Component } from "react";
import { View, Text, I18nManager } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
// import { Ionicons } from "@expox/vector-icons";
import { connect } from "react-redux";
import { finishIntro } from "../redux/actions";
import LinearGradient from 'react-native-linear-gradient';
import { Config } from "../common";

@connect(
  null,
  { finishIntro }
)
export default class AppIntroContainer extends Component {
  _renderItem = (props) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}>
      {/* <Ionicons
        style={{ backgroundColor: "transparent" }}
        name={props.icon}
        size={200}
        color="white"
      /> */}
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        {/* <Ionicons
          name={
            I18nManager.isRTL ? "md-arrow-round-back" : "md-arrow-round-forward"
          }
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        /> */}
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        {/* <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        /> */}
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        slides={Config.intro}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this.props.finishIntro}
      />
    );
  }
}

const styles = {
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
};
