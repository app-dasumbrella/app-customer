/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { fetchRelatedProduct } from "@redux/operations";
import { HorizontalList } from "@components";
import { Languages, Constants } from "@common";

@withNavigation
export default class ProductRelated extends Component {
  state = { relatedProducts: [] };
  /**
   * query related product based on productType
   */
  componentDidMount() {
    const { product } = this.props;
    if (product && product.productType) {
      const query = product.productType;
      fetchRelatedProduct({ query }).then((data) => {
        this.setState({ relatedProducts: data.list });
      });
    }
  }

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  render() {
    const { relatedProducts } = this.state;
    if (!relatedProducts || (relatedProducts && relatedProducts.length === 0))
      return <View />;

    return (
      <HorizontalList
        list={this.state.relatedProducts}
        name={Languages.ProductRelated}
        onPressSeeMore={this._onPressSeeMore}
        onPressItem={this._onPressItem}
        layout={Constants.Layout.threeColumn}
        paging
        hideSeeAll
      />
    );
  }
}
