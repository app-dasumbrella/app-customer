/** @format */

import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, Image, View } from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { Styles } from "@common";
import * as Animatable from "react-native-animatable";

@withTheme
export default class NavBarIcon extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.number &&
      this.refs.menu &&
      this.props.number !== nextProps.number
    ) {
      this.refs.menu.fadeInDown(600);
    }
  }

  render() {
    const { bubbletextstyle, bubblestyle, onPress, number, icon, color, size, style, theme } = this.props;
    const iconColor = color || "#333";

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
        <View style={[{ justifyContent:'center', alignItems:'center' },icon, style]}>
          <Image
            source={icon}
            style={[
              styles.icon,
               {
                width: size || Styles.IconSize.ToolBar,
                height: size || Styles.IconSize.ToolBar,
              },
            ]}
            resizeMode="contain"
          />
         
        </View>
        {!number ? null : (
            <Animatable.View ref="menu" style={[styles.numberWrap(theme),bubblestyle]}>
              <Text style={[styles.number,bubbletextstyle]}>{number}</Text>
            </Animatable.View>
          )}
          </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  iconWrap: {
    flex: 1,
    alignItems: "center",
  },
  numberWrap: (theme) => ({
    ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: -1,
    right: 6,
    height: 19,
    minWidth: 19,
    backgroundColor: theme.primaryColor,
    borderRadius: 19,
  }),
  number: {
    color: "white",
    fontSize: 12,
    marginBottom:5
  },
};

NavBarIcon.defaultProps = {
  number: 0,
};
