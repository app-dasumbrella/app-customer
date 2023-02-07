/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import { View, Animated } from "react-native";
import { connect } from "react-redux";

import {
  fetchProductsByCategoryId,
  fetchProductsByCategoryIdNextPage,
} from "@redux/operations";
import { cleanProducts } from "@redux/actions";
import { toast } from "../../Omni";
import { Empty, VerticalList, Spinkit } from "@components";
import ProductRow from "./ProductRow";
import ControlBar from "./ControlBar";
import styles from "./styles";

const mapStateToProps = (state) => {
  const selectedCategory = state.category.selectedCategory;
  return {
    list: state.products.list,
    hasNextPage: state.products.hasNextPage,
    cursor: state.products.cursor,
    isFetching: state.products.isFetching,
    error: state.products.error,
    categoryLayoutMode: state.category.categoryLayoutMode,
    selectedCategory,
    app: state.app,
    netInfo: state.netInfo,
    settings: state.app && state.app.settings,
  };
};

@connect(mapStateToProps, {
  fetchProductsByCategoryId,
  fetchProductsByCategoryIdNextPage,
  cleanProducts,
})
export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      displayControlBar: true,
    };
  }

  componentWillMount() {
    this.props.cleanProducts();
  }

  componentDidMount() {
    this._fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    const { error } = nextProps;
    if (error) toast(error);

    if (props.selectedCategory !== nextProps.selectedCategory) {
      this._fetchAll(nextProps.selectedCategory);
    }
  }

  _fetchAll = (newSelectedCategory) => {
    const { selectedCategory, app } = this.props;
    const { productsettings, categorysettings } = app || {};
    this.props.fetchProductsByCategoryId({
      productsettings,
      categorysettings,
      categoryId: newSelectedCategory
        ? newSelectedCategory?.id
        : selectedCategory?.id,
    });
  };

  _loadMore = () => {
    const { hasNextPage, cursor, selectedCategory } = this.props;
    console.log(selectedCategory, 'sssssfetchProductsByCategoryId')
    if (hasNextPage && cursor) {
      this.props.fetchProductsByCategoryIdNextPage({
        cursor,
        categoryId: selectedCategory.id,
      });
    }
  };

  _renderContent = () => {
    const { list, isFetching, name, hasNextPage, categoryLayoutMode } =
      this.props;
    return (
      <VerticalList
        list={list}
        isFetching={isFetching}
        onLoadMore={this._loadMore}
        onRefetch={this._fetchAll}
        name={name}
        numColumns={categoryLayoutMode === "GridMode" ? 2 : 1}
        categoryLayoutMode={this.props.categoryLayoutMode}
        hasNextPage={hasNextPage}
        renderRow={this._renderRow}
      />
    );
  };

  _renderRow = (item) => {
    const onPress = () => this._onPressItem(item);
    return (
      <ProductRow
        product={item}
        onPress={onPress}
        settings={this.props.settings}
      />
    );
    // return <View><Text>{"item"}</Text></View>
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  render() {
    const { displayControlBar } = this.state;
    const { error, selectedCategory, isFetching, list } = this.props;

    if (!selectedCategory) return null;

    if (error) {
      return <Empty text={error} />;
    }

    if (isFetching && list && list.length === 0) {
      return (
        <Spinkit
          style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
        />
      );
    }

    const marginControlBar = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange: [0, 0, -50, -50],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ marginTop: marginControlBar }}>
          <ControlBar
            isVisible={displayControlBar}
            name={selectedCategory.name}
          />
        </Animated.View>

        {this._renderContent()}
      </View>
    );
  }
}
