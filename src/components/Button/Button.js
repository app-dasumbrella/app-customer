/** @format */

import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { Color, Constants } from "@common";
import { withTheme } from "@callstack/react-theme-provider";

const Button = (props) => {
  if (props.type === "border") {
    return <BorderButton {...props} />;
  } else if (props.type === "image") {
    return <ImageButton {...props} />;
  } else if (props.type === "text") {
    return <TextButton {...props} />;
  } else if (props.type === "tab") {
    return <TabButton {...props} />;
  } else if (props.type === "icon") {
    return <IconButton {...props} />;
  } else if (props.type === "bottom") {
    return (
      <View style={[styles.bottomButtonView, props.bottomStyles]}>
        {props.reder && props.reder()}
        <StandardButton {...props} />
      </View>
    );
  }
  return <StandardButton {...props} />;
};

Button.propTypes = {
  type: PropTypes.string,
};

const IconButton = (props) => (
  <TouchableOpacity
    disabled={props.disabled || props.isLoading}
    onPress={props.onPress}
    style={[
      !props.transparent && styles.button,
      props.style,
      props.inactive && { backgroundColor: "#C6D8E4" },
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon}
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color="#FFF" />
      )}
    </View>
  </TouchableOpacity>
);

const TextButton = withTheme((props) => (
  <TouchableOpacity
    disabled={props.disabled || props.isLoading}
    onPress={props.onPress}
    style={[
      !props.transparent && styles.button,
      props.inactive && { backgroundColor: "#C6D8E4" },
      props.style,
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon && (
        <Image
          source={props.icon}
          defaultSource={props.defaultSource}
          style={[
            styles.imageIcon,
            { tintColor: props.color },
            I18nManager.isRTL && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}
      <Text
        {...props}
        style={[
          props.transparent ? styles.textTransparent(props.theme) : styles.text,
          props.textStyle,
        ]}>
        {props.text}
      </Text>
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color={props.theme.primaryColor} />
      )}
    </View>
  </TouchableOpacity>
));

const BorderButton = (props) => (
  <TouchableOpacity
    disabled={props.disabled || props.isLoading}
    onPress={props.onPress}
    style={[
      styles.button,
      props.style,
      props.inactive && { backgroundColor: "#C6D8E4" },
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon && (
        <Image
          source={props.icon}
          defaultSource={props.defaultSource}
          style={[
            styles.imageIcon,
            { tintColor: props.color },
            I18nManager.isRTL && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}
      <Text {...props} style={[styles.text, props.textStyle]}>
        {props.text}
      </Text>
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color="#FFF" />
      )}
    </View>
  </TouchableOpacity>
);

const StandardButton = (props) => (
  <TouchableOpacity
    disabled={props.disabled || props.isLoading}
    onPress={props.onPress}
    style={[
      styles.button,
      props.style,
      props.inactive && { backgroundColor: "#C6D8E4" },
    ]}
    activeOpacity={0.9}
    underlayColor="#ccc">
    <View style={styles.buttonView}>
      {props.icon && (
        <Image
          source={props.icon}
          defaultSource={props.defaultSource}
          style={[
            styles.imageIcon,
            { tintColor: props.color },
            I18nManager.isRTL && {
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}
      <Text {...props} style={[styles.text, props.textStyle]}>
        {props.text}
      </Text>
      {props.isLoading && (
        <ActivityIndicator style={styles.loading} color="#FFF" />
      )}
    </View>
  </TouchableOpacity>
);

const ImageButton = (props) => (
  <TouchableOpacity
    disabled={props.disabled}
    onPress={props.onPress}
    activeOpacity={0.8}
    underlayColor="#eeeeee"
    style={props.buttonStyle}>
    <Image
      {...props}
      defaultSource={props.defaultSource}
      style={[
        props.imageStyle,
        props.isAddWishList && { tintColor: Color.heartActiveWishList },
        props.isAddToCart && { tintColor: Color.TabActive },
      ]}
      resizeMode="contain"
    />
    {props.isLoading && (
      <ActivityIndicator style={styles.loading} color="#FFF" />
    )}
  </TouchableOpacity>
);

const TabButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    activeOpacity={0}
    selected={props.selected}>
    <View
      style={[
        styles.tabButton,
        props.buttonStyle,
        props.selected && styles.tabActive,
      ]}>
      <Text
        style={[
          styles.tabButtonText,
          props.textStyle,
          props.selected && styles.tabActiveText,
        ]}>
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabActiveText: {
    color: Color.TabActiveText,
  },
  tabActive: {
    marginTop: 1,
    borderBottomWidth: 2,
    borderBottomColor: Color.TabActive,
  },
  button: {
    backgroundColor: "#0B4A7D",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon: {
    resizeMode: "contain",
    width: 20,
    marginRight: 8,
  },
  text: {
    color: "white",
    fontSize: 17,
    marginTop: 3,
    // fontFamily: Constants.fontFamilyBold,

    letterSpacing: 0.5,
  },
  textTransparent: (theme) => ({
    color: theme.primaryColor,
    fontSize: 11,
    // fontFamily: Constants.fontFamilyBold,

    letterSpacing: 0.5,
  }),
  borderButton: {
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  tabButton: {
    height: 50,
    justifyContent: "center",
  },
  tabButtonText: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    fontSize: 12,
  },
  loading: {
    marginLeft: 5,
  },
  bottomButtonView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Button;
