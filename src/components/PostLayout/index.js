/** @format */

import React, { Component } from "react";
import { Constants, Tools, Styles } from "@common";

import ReadMoreLayout from "./ReadMore";
import ColumnLayout from "./Column";
import ThreeColumn from "./ThreeColumn";
import CardLayout from "./Card";
import SimpleLayout from "./Simple";

export default class PostLayout extends Component {
  render() {
    const { onPress, post, layout } = this.props;
    const { title, image } = post;

    const imageURL = Tools.getProductImage(
      image ? image.src : null,
      Styles.width
    );

    switch (layout) {
      case Constants.Layout.simple:
        return (
          <SimpleLayout
            imageURL={imageURL}
            title={title}
            viewPost={onPress}
            post={post}
            date={post.publishedAt}
            layout={layout}
          />
        );

      case Constants.Layout.card:
        return (
          <CardLayout
            imageURL={imageURL}
            title={title}
            viewPost={onPress}
            post={post}
            date={post.publishedAt}
            layout={layout}
          />
        );

      case Constants.Layout.twoColumn:
        return (
          <ColumnLayout
            imageURL={imageURL}
            title={title}
            viewPost={onPress}
            post={post}
            date={post.publishedAt}
            layout={layout}
          />
        );

      case Constants.Layout.threeColumn:
        return (
          <ThreeColumn
            imageURL={imageURL}
            title={title}
            viewPost={onPress}
            post={post}
            date={post.publishedAt}
            layout={layout}
          />
        );

      case Constants.Layout.list:
        return (
          <ReadMoreLayout
            imageURL={imageURL}
            title={title}
            viewPost={onPress}
            post={post}
            date={post.publishedAt}
            layout={layout}
          />
        );

      default:
        return (
          <ThreeColumn
            imageURL={imageURL}
            title={title}
            viewPost={onPress}
            post={post}
            date={post.publishedAt}
            layout={layout}
          />
        );
    }
  }
}
