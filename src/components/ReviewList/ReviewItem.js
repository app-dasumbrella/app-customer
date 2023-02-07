/** @format */

import React, { Component } from "react";
import { Text, View, I18nManager } from "react-native";
import { Rating } from "@components";
import moment from "moment";
import styles from "./styles";

export default class ReviewItem extends Component {
  dateFormat = (date) => {
    return moment.parseZone(date).format("MMMM DD, YYYY, HH:mm");
  };

  render() {
    const { review } = this.props;
    return (
      <View style={styles.containerReviewItem}>
        <View style={[I18nManager.isRTL && { alignItems: "flex-end" }]}>
          <Text style={styles.name}>{review.name}</Text>
        </View>
        <View style={[I18nManager.isRTL && { alignItems: "flex-end" }]}>
          <Text style={styles.review}>{review.review}</Text>
        </View>
        <View
          style={{
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            justifyContent: "space-between",
          }}>
          <Text style={styles.date_created}>
            {this.dateFormat(review.date_created)}
          </Text>
          <Rating rating={review.rating} style={styles.rating} />
        </View>
        <View style={styles.separator} />
      </View>
    );
  }
}
