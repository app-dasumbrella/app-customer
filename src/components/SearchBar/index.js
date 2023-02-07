/** @format */

import React, { Component } from "react";
import { TextInput, View, I18nManager } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Languages, Color, Icons } from "@common";
import styles from "./styles";

export default class SearchBar extends Component {
  render() {
    const { text, focus, onChangeText } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          ref={(comp) => (this._textInput = comp)}
          autoFocus={focus}
          placeholder={Languages.SearchPlaceHolder}
          placeholderTextColor={Color.blackTextSecondary}
          style={[
            styles.textinput,
            I18nManager.isRTL ? { marginRight: 120 } : { marginLeft: 10 },
          ]}
          value={text}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
        />
        <View
          style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
          <Icon name={Icons.Ionicons.Search} size={24} />
        </View>
      </View>
    );
  }
}
