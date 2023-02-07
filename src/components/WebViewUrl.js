/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { Spinkit } from "@components";
import { Styles } from "@common";
import { WebView } from 'react-native-webview';

const { width, scale } = Styles.window;

export default class WebViewUrl extends Component {
  _renderLoading = () => {
    return (
      <Spinkit
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  };

  getHTML = (htmlString) => {
    return `<html><head><style type="text/css">
            body {
              margin: 8;
              padding: 0;
              font: 14px arial, sans-serif;
              background: white;
              width: ${(width - 16) * scale}
            }
            p {
              width: ${(width - 16) * scale}
            }
            a, h1, h2, h3, li {
              font: 14px arial, sans-serif !important;
            }
            img {
              height: auto;
              width: ${(width - 16) * scale}
              }
      </style></head><body>${htmlString}</body>`;
  };

  render() {
    const { uri, htmlString } = this.props;
    const source = htmlString ? { html: this.getHTML(htmlString) } : { uri };

    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <WebView
          {...this.props}
          startInLoadingState
          source={source}
          renderLoading={this._renderLoading}
          injectedJavaScript="document.body.scrollHeight;"
        />
      </View>
    );
  }
}
