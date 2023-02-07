/** @format */

import React from "react";
import { withTheme } from "@callstack/react-theme-provider";
import { TouchableOpacity, Text, View } from "react-native";
import { Constants } from "@common";
import { moderateScale } from 'react-native-size-matters'
const ProductSize = withTheme((props) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.container,
        props.style,
        props.selected && { backgroundColor: props.primaryColor, borderWidth: 0.8 },
      ]}
      activeOpacity={0.8}
      underlayColor="transparent"
    >
      <Text
        style={[
          styles.text,
          props.selected && { color: props.color },
          props.text?.length > 2 && { paddingHorizontal: 8 },
          props.style2,
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
    {props && props.price && (
      <Text
        style={{
          marginLeft: 8,
          fontWeight: "bold",
        }}
      >
        ${props?.price?.sale_price}
      </Text>
    )}
  </View>
));

const styles = {
  active: (theme) => ({
    borderColor: theme.primaryColor,
    borderWidth: 1,
  }),
  container: {
    width: 100,

    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
  },
  containerLong: {
    width: null,

    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  text: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    fontFamily: Constants.fontFamily,
    color: '#000'
  },
};

export default ProductSize;
