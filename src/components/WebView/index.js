/** @format */

import React, { Component } from "react";
import { View, Image } from "react-native";
import HTML from "react-native-render-html";
import { Constants, Styles } from "@common";

const { width: widthPort } = Styles.window;

export default class WebView extends Component {
  render() {
    const htmlContent = this.props.html;
    const tagsStyles = {
      p: { margin: 0, padding: 0, fontFamily: Constants.fontFamily },
      li: { color: "#333" },
    };

    return (
      <View style={{ padding: 10 }}>
        <HTML
          html={`${htmlContent}<div style="width: ${widthPort - 40}"></div>`}
          tagsStyles={tagsStyles}
          renderers={{
            img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
              const { src, alt, width, height } = htmlAttribs;
              if (!src) {
                return false;
              }
              const newWidth = Styles.window.width - 20;
              const newHeight = (height * newWidth) / width;
              return (
                <Image
                  source={{ uri: src }}
                  style={{
                    width: newWidth,
                    height: newHeight,
                    resizeMode: "contain",
                  }}
                />
              );
            },
          }}
        />
      </View>
    );
  }
}
