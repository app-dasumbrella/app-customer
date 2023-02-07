/** @format */

import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { Languages } from "@common";
import { Spinner } from "@components";
import ReviewItem from "./ReviewItem";
import styles from "./styles";

export default class ReviewList extends Component {
  renderContent() {
    const { reviews, isFetching, message } = this.props;
    if (isFetching) {
      return <Spinner fullStretch />;
    }

    // if (message && message.length > 0) {
    //   return <Text style={styles.message}> {message}</Text>;
    // }

    if (!reviews || (reviews && reviews.length === 0)) {
      return <Text style={styles.message}>{Languages.NoReview}</Text>;
    }

    if (reviews && reviews.length > 0) {
      return (
        <FlatList
          style={styles.list}
          enableEmptySections
          data={reviews}
          renderItem={({ item }) => {
            return <ReviewItem review={item} />;
          }}
        />
      );
    }
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}
