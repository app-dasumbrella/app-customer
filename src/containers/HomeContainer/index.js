/** @format */

import React, { Component } from "react";
import {
  FlatList,
  Dimensions,
  View,
  Text,
  Animated,
  Image,
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
import VerticalItemBanner from "./VerticalItemBanner";
import { selectCategory } from "@redux/actions";
import Carousel from "react-native-snap-carousel";
import { t } from "i18next";
import { moderateScale } from "react-native-size-matters";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
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
  settings: app && app.settings && app.settings.theme,

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
export default class HomeContainer extends Component {
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

    // this.props.handleChangeStore(this.props.app, () => {
    //   //  this.props.fetchFeatured(this.props.app);
    // });
    //  this._fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    this._handleLoad(nextProps);
  }

  _handleLoad = (newProps) => {
    const { layoutMode, list, featuredlist } = this.props;
    let { app } = newProps;

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
    let { settings } = this.props || {}
    let { shop } = settings || {};
    let { savings_bubble } = shop || {}
    let {
      border,
      colorPriceRegular,
      colorPriceRegularStrike,
      colorPriceSale,
      colorTitle,
      display,
      gallery,
      showCategoryLabel,
    } = shop || {};
    const onPress = () => this._onPressItem(item);

    // if (index === 0) {
    //   return (
    //     <VerticalItemBanner
    //       index={index}
    //       product={item}
    //       onPress={onPress}
    //       layout={Constants.Layout.miniBanner}
    //       horizontal={false}
    //     />
    //   );
    // }
    if (item?.allow_sale)
      return <ProductRow product={item} onPress={onPress}
        rendersave={() => {
          return (
            <View style={{
              height: moderateScale(60), width: moderateScale(60),
              backgroundColor: savings_bubble?.background_color,
              position: 'absolute',
              zIndex: 100,
              marginTop: 10,
              marginLeft: 15,
              borderRadius: moderateScale(45),
              justifyContent: 'center',
              alignItems: 'center',

            }}>
              {item?.variants?.[0]?.sale_price != 0 && (
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }} >
                  <Text style={{
                    color: savings_bubble?.foreground_color,
                    fontWeight: 'bold'

                  }} >{t('Save')} </Text>
                  <Text style={{
                    color: savings_bubble?.foreground_color,
                    fontWeight: 'bold'

                  }} >
                    {Number(
                      ((Number(
                        item.variants[0].regular_price
                      ) -
                        Number(
                          item.variants[0].sale_price
                        )) /
                        Number(
                          item.variants[0].regular_price
                        )) *
                      100
                    ).toFixed(0)}
                    %
                  </Text>
                </View>
              )}
            </View>
          )
        }}
      />;
  };

  /**
   * TODO: change to VerticalList component
   */
  _renderVerticalList = () => {
    const { list, layoutMode, productFetching, hasNextPage, app } = this.props;
    let productlist = app && app.productsettings && app.productsettings.list || []
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
        list={productlist}
        layout={layoutMode}
        isFetching={productFetching}
        onPressSeeMore={this._onPressSeeMore}
        onLoadMore={this._loadMore}
        onRefetch={this._fetchAll}
        hasNextPage={hasNextPage}
        renderHeader={this._renderHeader}
        onScroll={onScroll}
        renderRow={this._renderRowItem}
        numColumns={1}
      />
    );
  };

  render() {
    const { app, layoutFetching, listData, featuredlist } = this.props;
    let productlist = app && app.productsettings && app.productsettings.list || []
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

    // render vertical layout
    // if (this._isHorizontal()) {
    //   return (
    //     <View style={{ flex: 1, backgroundColor: "#FFF" }}>
    //       <AnimatedFlatList
    //         data={productlist}
    //         keyExtractor={(item, index) => `h_${index}`}
    //         renderItem={this._renderVerticalList}
    //         ListHeaderComponent={this._renderHeader}
    //         scrollEventThrottle={1}
    //         refreshing={layoutFetching}
    //         // refreshControl={
    //         //   <RefreshControl
    //         //     refreshing={layoutFetching}
    //         //     onRefresh={this._fetchAll}
    //         //   />
    //         // }
    //         {...{ onScroll }}
    //       />
    //     </View>
    //   );
    // } else {
    return this._renderVerticalList();
    //}
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
