/** @format */

import React, { Component } from "react";
import wp from "@services/PostAPI";
import { WebViewUrl } from "@components";
import { Styles } from "@common";

const { width, scale } = Styles.window;

export default class CustomPage extends Component {
  constructor(props) {
    super(props);

    this.state = { html: "" };
  }

  componentWillMount() {
    this.fetchPage(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchPage(nextProps.id);
  }

  fetchPage = (id) => {
    wp.pages()
      .id(id)
      .get((err, data) => {
        if (data) {
          this.setState({
            html:
              typeof data.content.rendered !== "undefined"
                ? data.content.rendered
                : "Content is updating",
          });
        }
      });
  };

  render() {
    return (
      <WebViewUrl
        htmlString={this.state.html}
        style={{
          flex: 0,
          width: (width - 50) * scale,
          height: 900,
        }}
      />
    );
  }
}
