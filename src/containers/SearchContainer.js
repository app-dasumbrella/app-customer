/** @format */

import React, { Component } from "react";
import { Text, View } from "react-native";
//import { EventEmitter } from "fbemitter";
import { debounce } from "lodash";
import { fetchProductByName } from "@redux/operations";
import { Languages, Constants } from "@common";
import ProductItemContainer from "../containers/ProductItemContainer";
import { Spinkit, VerticalList, SearchBar } from "@components";
import { connect } from "react-redux";

/**
 * TODO: load more
 * do not use redux --> will leak performance when search
 */
const mapStateToProps = ({ user }) => {
  return {
    accessToken: user.accessToken,
    userInfo: user.userInfo,
  };
};

@connect(
  mapStateToProps,
  { fetchProductByName }
)
export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: null,
      hasNextPage: false,
      isFetching: false,
      list: [],
      // emitter: new EventEmitter(),
      text: "",
      recommendList: [],
    };
  }

  componentDidMount() {

    this.props.fetchProductByName({ query: "" }, (data) => {
      this.setState({ recommendList: data.list });
    });
  }

  componentWillUnmount() {

  }

  _renderLoading = () => {
    return this.state.isFetching;
  };

  _handleChangeText = (text) => {
    //this.state.emitter && this.state.emitter.emit("change", text);
    this.setState({ text });
    this._handleSearch(text)
  };

  _handleSearch = (text) => {
    ////console.log("SSSSSSSS",text)

    if (text.length > 1) {
      this.setState({ isFetching: true });

      this.props.fetchProductByName({ query: text }, (data) => {
        this.setState({ isFetching: false, ...data });
      });
    }
  };

  _loadMore = () => {
    const { cursor, hasNextPage, text } = this.state;

    if (cursor && hasNextPage) {
      this.props.fetchProductByName({ cursor, query: text }, (data) => {
        const list = [...this.state.list, ...data.list];
        this.setState({ ...data, list });
      });
    }
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("DetailScreen", { item });
  };

  _renderRow = (item) => {
    const onPress = () => this._onPressItem(item);
    return (
      <ProductItemContainer
        onPress={onPress}
        id={item.id}
        product={item}
        showImage
        variant={item.variants && item.variants[0]}
        showAddToCart
        showRating
      />
    );
  };

  _renderDefaultSearch = () => {
    return (
      <View style={{ flex: 1 }}>
        <VerticalList
          list={this.state.recommendList}
          renderHeader={() => (
            <Text style={styles.text}>{Languages.RecommendedProduct}</Text>
          )}
          renderRow={this._renderRow}
          numColumns={1}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  };

  _renderResultList = () => {
    const { list, isFetching, hasNextPage, text } = this.state;

    // if (list && list.length === 0 && !this._renderLoading()) {
    //   return this._renderDefaultSearch();
    // }
    return (
      <VerticalList
        list={list}
        isFetching={isFetching}
        onLoadMore={this._loadMore}
        hasNextPage={hasNextPage}
        renderRow={this._renderRow}
        numColumns={1}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SearchBar
          text={this.state.text}
          onChangeText={this._handleChangeText}
        />
        <View style={{ flex: 1 }}>
          {this._renderLoading() ? <Spinkit /> : this._renderResultList()}
        </View>
      </View>
    );
  }
}

const styles = {
  contentContainerStyle: {
    marginHorizontal: 30,
    paddingTop: 20,
  },
  text: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 20,
  },
};
