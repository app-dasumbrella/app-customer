/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { ReviewList } from "@components";

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
    reviews: state.products.reviews,
    isFetching: state.products.isFetching,
    message: state.products.message,
  };
};

@connect(mapStateToProps)
export default class ReviewListContainer extends Component {
  componentWillMount() {
    // this.props.fetchReviews(this.props.product.id);
  }

  render() {
    return <ReviewList {...this.props} />;
  }
}
