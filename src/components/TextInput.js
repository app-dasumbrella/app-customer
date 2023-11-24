/** @format */

import React from "react";
import { TextInput, View } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { Color, Styles } from "@common";

const Input = (props) => {
  return <StandardTextInput {...props} />;
};

const StandardTextInput = withTheme((props) => (
  <View style={[styles.container,props.Contstyle]}>
    <TextInput
      style={[
        Styles.Common.Textinput,
        styles.textinput(props.theme),
        props.inputStyle,
      ]}
      placeholderTextColor={Color.TextDefault}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      {...props}
    />
  </View>
));

const styles = {
  container: {
  //  borderColor: "#cfcfe2",
    //borderBottomWidth: 1,
    flex: 1,
    height: 40,
    
  },
  textinput: (theme) => ({
    textAlign: "left",
    backgroundColor: "transparent",
    color: theme.primaryColor,
  }),
};

export default Input;
