/** @format */

import React, { Component } from "react";
import {
  FlatList,
  Dimensions,
  View,
  Text,
  Animated,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchAllProductsLayout,
  fetchAllProducts,
  fetchMoreAllProducts,
  fetchFeatured,
  handleChangeStore,
} from "@redux/operations";
import { HorizontalList, VerticalList } from "@components";
import { Constants, Styles, Config, HorizonLayouts } from "@common";
import ProductRow from "@containers/CategoryContainer/ProductRow";
import { selectCategory } from "@redux/actions";
import Carousel from "react-native-snap-carousel";
import HTML from "react-native-render-html";
import { scontent } from "@services/Api";
import { WebView } from "react-native-webview";
import * as _ from "lodash";
import { moderateScale } from "react-native-size-matters";
import { checkRootLang } from "../../ultils/productOptions";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
const mapStateToProps = ({ layout, products, app, category }) => ({
  layoutFetching: layout.isFetching,
  // default when vertical layout
  layoutMode: Constants.Layout.twoColumn,
  // vertical mode
  listData: layout.layout,
  list: products.list,
  hasNextPage: products.hasNextPage,
  productFetching: products.isFetching,
  cursor: products.cursor,
  shopify: app.shopify,
  featuredlist: layout.featuredlist,
  category: category,
  app,
  language: app && app.language,

});

const mapDispatchToProps = {
  fetchAllProductsLayout,
  fetchAllProducts,
  fetchMoreAllProducts,
  fetchFeatured,
  handleChangeStore,
  selectCategory,
};

@withTheme
@connect(mapStateToProps, mapDispatchToProps)
// @withNavigation
export default class HomeContainer2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment().format("dddd, DD MMM YYYY"),
    };

    this.scrollAnimation = new Animated.Value(0);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      animatedHeader: this.scrollAnimation.interpolate({
        inputRange: [0, 170],
        outputRange: [-1, 1],
        extrapolate: "clamp",
      }),
    });
  }

  componentWillMount() {

    this.props.handleChangeStore(this.props.app, () => {
      //   this.props.fetchFeatured(this.props.app);
    });
    //  this._fetchAll();
  }

  componentDidUpdate(nextProps) {
    this._handleLoad(nextProps);
  }

  _handleLoad = (newProps) => {
    const { layoutMode, list, featuredlist } = this.props;
    let { app } = newProps;
    if (app?.settings?.content != this.props?.app.settings?.content) {
      this.setState({ setI: app?.settings?.content })
    }

    if (newProps.layoutMode !== layoutMode) {
      // handle load when switch layout vertical list
      if (
        (newProps.list && newProps.list.length === 0) ||
        this._isHorizontal(newProps.layoutMode)
      ) {
        this._fetchAll(newProps.layoutMode);
      }
    }
  };

  _isHorizontal = () => {
    return Config.HomePage.Horizon;
  };

  _onPressSeeMore = (index, name) => {
    let list = this.props?.app?.categorysettings?.categories?.list.filter((item) => item.name == name);
    this.props.selectCategory(list[0]);
    this.props.navigation.navigate("CategoryScreen");
    ///this.props.navigation.navigate("ListAllScreen", { index, name });
  };

  // _onPressItem = (item, isNews) => {
  //   if (isNews) {
  //     this.props.navigation.navigate("News", { item });
  //   } else {
  //     this.props.navigation.navigate("Detail", { item });
  //   }
  // };

  _renderLoading = () => {
    return this.props.isFetching;
  };

  _renderHeader = () => {
    const { shopify, app } = this.props;
    return (
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={
          app &&
          app.settings &&
          app.settings.settings &&
          app.settings.settings.banner
        }
        renderItem={({ item }) => (
          <Image
            resizeMode={"stretch"}
            source={{ uri: item.img_url }}
            style={{ width: windowWidth, height: 250 }}
          />
        )}
        autoplay
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />
    );
  };

  _renderHorizontalList = ({ item, index }) => {
    return (
      <View style={styles.section}>
        <HorizontalList
          {...item}
          index={index}
          onPressSeeMore={this._onPressSeeMore}
        />
      </View>
    );
  };

  _onPressItem = (item) => {
    this.props.navigation.navigate("Detail", { item });
  };

  _renderRowItem = (item, index) => {
    const onPress = () => this._onPressItem(item);

    if (index === 0) {

    }

    return <ProductRow product={item} onPress={onPress} />;
  };

  /**
   * TODO: change to VerticalList component
   */
  _renderVerticalList = () => {
    const { list, layoutMode, productFetching, hasNextPage } = this.props;
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <VerticalList
        list={list}
        layout={layoutMode}
        isFetching={productFetching}
        onPressSeeMore={this._onPressSeeMore}
        onLoadMore={this._loadMore}
        onRefetch={this._fetchAll}
        hasNextPage={hasNextPage}
        renderHeader={this._renderHeader}
        onScroll={onScroll}
        renderRow={this._renderRowItem}
        numColumns={2}
      />
    );
  };
  onWebViewMessage = (event: WebViewMessageEvent) => {
    this.setState({ webViewHeight: Number(event.nativeEvent.data) })
  }
  render() {
    const { app, layoutFetching, listData, featuredlist, language } = this.props;
    const { settings } = app || {}
    const { languages } = settings || {}
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );
    let root = checkRootLang(languages, language, '/home_mobile')
    // render vertical layout
    console.log(root, scontent)
    if (this._isHorizontal()) {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <WebView
            automaticallyAdjustContentInsets={true}
            style={{ height: this.state.webViewHeight }}
            onMessage={this.onWebViewMessage}
            injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

            //style={{ marginHorizontal: 5 }}
            //source={{ uri: `${scontent}${root}` }}//commented on oct 17 2023
            source={{ uri: `${scontent}` }}
          />


        </ScrollView>
      );
    } else {
      return this._renderVerticalList();
    }
  }
}

const styles = {
  section: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    paddingVertical: 10,
    marginBottom: 10,
    marginLeft: Styles.spaceLayout,
  },
  headerDate: {
    fontSize: 19,
    marginBottom: 10,
    // fontFamily: Constants.fontFamily,
  },
  headerStore: (theme) => ({
    color: theme.primaryColor,
    fontSize: 30,
    marginBottom: 10,
    // fontFamily: Constants.fontFamily,
  }),
};
