/** @format */

import React, { Component } from "react";
import {
  View,
  Animated,
  FlatList,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from "react-native";
import { findIndex } from "lodash";
import { connect } from "react-redux";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  updateAddonCartItem,
} from "@redux/operations";
import {
  Styles,
  Tools,
  Config,
  Constants,
  Languages,
  Images,
  Color,
} from "@common";
import {
  ModalPhotos,
  AdMob,
  LayoutItem,
  ProductTitle,
  Rating,
  ImageCache
} from "@components";
import ProductRelatedContainer from '../../containers/ProductRelatedContainer'
import { toast } from "@app/Omni";
import HTML from "react-native-render-html";
import Title from "./Title";
import AnotherAttributes from "./AnotherAttributes";
import AnotherAttributes2 from "./AnotherAttributes2";
import ColorAttributes from "./ColorAttributes";
import BottomTabBar from "./BottomTabBar";
import styles from "./styles";
import CheckBox from "@react-native-community/checkbox";
import ChangeQuantityHorizontal from "../../components/ChangeQuantityHorizontal";
import moment from "moment";
import { format } from "date-fns";
import * as Animatable from "react-native-animatable";
import DropDownPicker from "react-native-dropdown-picker";
import * as _ from "lodash";
import { WebView } from "react-native-webview";
import Carousel from "react-native-snap-carousel";
import { t } from "i18next";
import { isObject, isEmpty } from "lodash";
import Button from "../../components/Button/Button";
import { Spinkit } from "../../components";
import { scontent } from "@services/Api";
import { moderateScale } from "react-native-size-matters";
import { checkRootLang } from "../../ultils/productOptions";
import ReviewsHeader from './ReviewsHeader'
const PRODUCT_IMAGE_HEIGHT = 300;
const Buffer = require("buffer").Buffer;
const contentWidth = Dimensions.get("window").width;
const itemWidth = contentWidth
const mapStateToProps = (state, props) => {
  const item = props.navigation.getParam("item");
  return {
    app: state.app && state.app.settings,
    userInfo: state.user && state.user.userInfo,
    language: state.app && state.app.language,

    reviewlist:
      state.app &&
      state.app.reviewsettings &&
      state.app.reviewsettings.products,
    product: item,
    checkoutId: state.carts.checkoutId,
    cartItems: state.carts.cartItems,
    total: state.carts.total,
    isFetching: state.carts.isFetching,
    primarycolors: state.app && state.app.theme && state.app.theme.primaryColor,
    list:
      state.app && state.app.productsettings && state.app.productsettings.list,
  };
};

@connect(mapStateToProps, {
  addToCart,
  updateCartItem,
  removeCartItem,
  updateAddonCartItem,
})
export default class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;

    this.state = {
      active: 1,
      quantity: 1,
      selectedVariant2: [],
      open: false,
      scrollY: new Animated.Value(0),
      selectedOptions: {},
      selectedVariant: {},
      toggleCheckBox: false,
      selectedLableOp: [],
      rcount: [],
      maxlimit: 6,
      minlimit: 0,
      webViewHeight: 10000,
      itemOffset: 0
    };
  }

  componentWillMount() {
    this._updateVariantAndOptions(this.props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ render: true });
    }, 2);
    let props = this.props;
    let review_of_product =
      props &&
      props.reviewlist &&
      props.reviewlist.filter((it) => it.id == props.product.id);

    let r1 = 0,
      r2 = 0,
      r3 = 0,
      r4 = 0,
      r5 = 0,
      total = 0;
    let rvi = [];
    review_of_product &&
      review_of_product[0] &&
      review_of_product[0].reviews &&
      review_of_product[0].reviews.map((items) => {
        if (items.rating == 1) {
          r1 = r1 + 1;
        }
        if (items.rating == 2) {
          r2 = r2 + 1;
        }
        if (items.rating == 3) {
          r3 = r3 + 1;
        }
        if (items.rating == 4) {
          r4 = r4 + 1;
        }
        if (items.rating == 5) {
          r5 = r5 + 1;
        }
        if (items.img.length != 0) {
          rvi.push(...items.img);
        }
        total = Number(total) + Number(items.rating);
      });
    this.setState({
      Avg: Number(total / review_of_product?.[0]?.reviews?.length || 0).toFixed(
        1
      ),
    });
    this.setState({ totals: review_of_product?.[0]?.reviews?.length || 0 });
    this.setState({ rcount: review_of_product?.[0]?.reviews?.slice(0, Number(review_of_product?.[0]?.reviews?.length / 6).toFixed(0)) });


    this.setState({ reviewImages: rvi });
    this.setState({ Reviews1: r1 });
    this.setState({ Reviews2: r2 });
    this.setState({ Reviews3: r3 });
    this.setState({ Reviews4: r4 });
    this.setState({
      Reviews5: r5,
      review_of_product:
        (review_of_product &&
          review_of_product[0] &&
          review_of_product[0].reviews &&
          review_of_product[0].reviews.sort(function (a, b) {
            var c = new Date();
            var d = new Date();
            if (a.date && b.date) {
              c = new Date(a.date);
              d = new Date(b.date);
            }
            return d - c;
          })) ||
        [],
    });

    const product = props.product;
    product &&
      product?.addons?.map((items, index) => {
        let products = props.list.filter(
          (item) => item.id == items.parent_product_id
        );
        this.onSelectaddAttribute(
          products[0],
          index,
          products?.[0]?.options?.[0]?.name || "",
          products?.[0]?.options?.[0]?.values?.[0]?.value || "",
          items?.items[0],
          items && items.addon_type,
          0
        );
      });
  }

  componentWillReceiveProps(nextProps) {
    // update selecting another product in related product
    if (this.props.product !== nextProps.product) {
      this._updateVariantAndOptions(nextProps);
      this._scrollview &&
        this._scrollview?.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  _updateVariantAndOptions = (props) => {
    if (props.product) {
      const defaultVarient =
        props.product && props.product.variants && props.product.variants[0];
      let selectedOptions = {},
        selectedLableOp = {};
      const product = props && props.product;
      defaultVarient &&
        defaultVarient.selectedOptions &&
        defaultVarient.selectedOptions.map((mitem, mindex) => {
          selectedOptions[
            product.options &&
            product.options[mindex] &&
            product.options[mindex].name.toUpperCase()
          ] = mitem && mitem.value;
          selectedLableOp[
            product.options &&
            product.options[mindex] &&
            product.options[mindex].name.toUpperCase()
          ] = mitem && mitem.label;
        });
      const selectedVariant = Tools.getVariant(
        product.variants,
        selectedOptions
      );
      this.setState({ selectedVariant, selectedOptions, selectedLableOp });
    }
  };

  _getVariantImage = (variant) => {
    if (!variant) return this.state.selectedVariantImage;
    return Tools.getProductImage(variant.image.src, Styles.width);
  };

  _getPhotoIndex = (selectedVariant) => {
    const selectedVariantImage = 1;
    const photoIndex = findIndex(this.props.product.gallery, (o) => {
      return o.src === selectedVariantImage;
    });

    return photoIndex < 0 ? 0 : photoIndex;
  };

  _openModalPhoto = (index) => {
    this._modalPhoto.openModal(index);
  };

  /**
   * TODO: change color update selectedOptions
   */
  _onSelectOption = (attrType, value, label) => {
    const { product } = this.props;
    const selectedOptions = this.state.selectedOptions;
    const selectedLableOp = this.state.selectedLableOp;
    selectedOptions[attrType.toUpperCase()] = value;
    selectedLableOp[attrType.toUpperCase()] = label;
    const selectedVariant = Tools.getVariant(product.variants, selectedOptions);

    // scroll photos to index
    const photoIndex = this._getPhotoIndex(selectedVariant);
    this._photos?.scrollToIndex({ index: photoIndex });

    this.setState({
      selectedVariant,
      selectedOptions,
      selectedLableOp,
    });
  };

  /**
   * add to cart
   */
  _addToCart = (navigateToCart = false) => {
    const { addToCart, cartItems, updateAddonCartItem, updateCartItem } =
      this.props;
    const { selectedVariant, quantity, selectedVariant2 } = this.state;
    const { product } = this.props;
    let exist = false;
    let newaddons = [];
    selectedVariant2?.map((payl) => {
      if (payl?.quantity != 0) {
        newaddons.push(payl);
      } else {
        newaddons.push(undefined);
      }
    });
    let manualcheck = [];
    newaddons.map((op) => {
      if (_.isEmpty(op)) {
      } else {
        manualcheck.push(op);
      }
    });
    if (manualcheck.length == 0) {
      newaddons = [];
    }

    // if (total < Constants.LimitAddToCart) {
    if (selectedVariant) {
      let filt = cartItems.filter((i) => i.variant.id == selectedVariant.id);
      console.log(filt, "fit");

      if (filt.length == 0) {
        exist = true;
        console.log("first");
      }
      if (newaddons.length != 0) {
        console.log("second inside");

        filt = filt.filter((o) => o.addon.length != 0);
        if (filt.length == 0 && newaddons.length != 0) {
          exist = true;
          console.log("second");
        }

        if (filt.length != 0 && newaddons.length != 0) {
          console.log("third beefore");
          exist = true;
          let encodedAuth = new Buffer(`${newaddons}`).toString("base64");
          let b = [];
          filt.map((p) => {
            console.log(p, "pdjdnbdf");
            let l = new Buffer(`${p?.addon}`).toString("base64");
            console.log(l == encodedAuth, encodedAuth, l, "l");
            if (l == encodedAuth) {
              exist = false;
            }
          });
          console.log("exsititi2", exist);
        }
      } else {
        filt = filt.filter((o) => o.addon.length == 0);
        console.log("fourth");

        if (filt.length == 0) {
          exist = true;
          console.log("five");
        }
      }
      console.log("exsititi", exist);

      if (exist) {
        addToCart(
          {
            cartId: new Date().valueOf(),
            cartItems,
            product,
            selectedVariant,
            selectedVariant2: newaddons,
            quantity,
          },
          (data) => {
            if (data && !data.error) {
              //  this.setState({ selectedVariant2: [] });
              if (navigateToCart) {
                this.props.navigation.navigate("CartScreen");
              }
            }
          }
        );
      } else {
        console.log("seven", filt);

        let kn = filt.filter((o) => o.addon.length == 0);
        let addkns = filt.filter((o) => o.addon.length != 0);
        if (addkns.lenght != 0 && newaddons.length != 0) {
          console.log("eight", kn);
          let manualcheck = [];
          newaddons.map((op) => {
            if (_.isEmpty(op)) {
            } else {
              manualcheck.push(op);
            }
          });
          console.log(manualcheck, "manual");
          if (manualcheck.length == 0 && kn.length == 0) {
            console.log("ten");
            updateCartItem({
              cartItems,
              quantity: filt[0].quantity + 1,
              variant: selectedVariant,
              product: product,
              cartId: filt[0].cartId,
            });
          } else {
            console.log("eleven", manualcheck);

            let encodedAuth = new Buffer(`${newaddons}`).toString("base64");
            filt.map((ops, index) => {
              let b = new Buffer(`${ops?.addon}`).toString("base64");
              console.log(b == encodedAuth, encodedAuth, b, "b");
              if (encodedAuth == b) {
                console.log(filt[index].cartId);
                ops?.addon.map((add, pindex) => {
                  console.log(add, "inside mmm ", pindex);
                  if (add?.quantity) {
                    let quantity = add.quantity + newaddons[pindex].quantity;
                    updateAddonCartItem({
                      cartItems,
                      quantity,
                      variant: add,
                      product: add,
                      cartId: filt[index].cartId,
                    });
                  }
                });
              }
            });
          }
          if (navigateToCart) {
            this.props.navigation.navigate("CartScreen");
          }
        } else {
          console.log("nine");

          updateCartItem({
            cartItems,
            quantity: kn[0].quantity + 1,
            variant: selectedVariant,
            product: product,
            cartId: kn[0].cartId,
          });
          if (navigateToCart) {
            this.props.navigation.navigate("CartScreen");
          }
        }
      }
    } else {
      toast("Variant not available");
    }
    // } else {
    //  toast(Languages.ProductLimitWaring);
    //s}
  };
  decreaseAddon = (index, add) => {
    let { selectedVariant2 } = this.state;
    if (
      selectedVariant2 &&
      selectedVariant2[index] &&
      selectedVariant2[index].quantity
    ) {
      if (selectedVariant2[index].quantity != 1) {
        if (selectedVariant2[index].quantity != 0) {
          selectedVariant2[index].quantity =
            selectedVariant2[index].quantity - 1;
          this.setState({ selectedVariant2 });
        }
      } else {
        selectedVariant2[index].quantity = selectedVariant2[index].quantity - 1;

        this.setState({ selectedVariant2 });
      }
    }
  };

  increaseAddon = (index, add) => {
    let { selectedVariant2 } = this.state;

    if (
      selectedVariant2 &&
      selectedVariant2[index] &&
      selectedVariant2[index].quantity
    ) {
      if (selectedVariant2[index].quantity != 0) {
        selectedVariant2[index].quantity = selectedVariant2[index].quantity + 1;
        this.setState({ selectedVariant2 });
      }
    } else {
      add();
    }
  };

  _renderTitle = () => {
    let { app } = this.props || {};
    let { currency, theme } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    return (
      <View style={[Styles.Common.SpacingLayout, { marginBottom: -10 }]}>

        <Title
          number_of_decimals={number_of_decimals}
          currency={currency}
          product={this.props.product}
          selectedVariant={this.state.selectedVariant}
        />
      </View>
    );
  };

  _renderAttributes = () => {
    const { product, app } = this.props;
    let { currency, theme } = app || {};
    let { numberFormat, primaryColor } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    return (
      <AnotherAttributes
        primaryColor={primaryColor}
        onSelect={this._onSelectOption}
        onclose={() => {
          this.setState({ open2: !this.state.open2 });
          //console.log("oooo");
        }}
        selectedVariant={this.state.selectedVariant}
        selectedLableOp={this.state.selectedLableOp}
        product={product}
        currency={currency}
        number_of_decimals={number_of_decimals}
        options={product.options}
        open={this.state.open2}
        variants={product.variants}
        primarycolors={this.props.primarycolors}
        selectedOptions={this.state.selectedOptions}
      />
    );
  };

  onSelectaddAttribute = (
    product,
    index,
    attrType,
    value,
    price,
    types,
    quantity
  ) => {
    let selectedAddOptions = {};
    let { selectedVariant2 } = this.state;
    selectedAddOptions[attrType.toUpperCase()] = value;
    const selectedVariant = Tools.getVariant(
      product.variants,
      selectedAddOptions
    );
    let oldatt = selectedVariant2;

    oldatt[index] = {
      ...selectedVariant,
      product,
      sale_price: price && price.price,
      quantity: quantity,
      kid: selectedVariant?.id,
      details: { types, ...price },
    };
    this.setState({
      selectedVariant2: oldatt,
    });
  };

  _renderProductColor = () => {
    const { product } = this.props;
    const variantColors = Tools.getAttribute(product, "color");

    return (
      <ColorAttributes
        onSelect={this._onSelectOption}
        scrollY={this.state.scrollY}
        options={variantColors ? variantColors.options : null}
        selectedOptions={this.state.selectedOptions}
      />
    );
  };

  _renderPhoto = ({ item, index }) => {
    const openModalPhoto = () => {
      this._openModalPhoto(index);
    };
    return (
      <LayoutItem
        index={index}
        imageURI={item.url || item.img_url}
        onPress={openModalPhoto}
        layout={Constants.Layout.miniBanner}
        //   product={item}
        mode={"stretch"}
      />
    );
  };

  //   <FlatList
  //   contentContainerStyle={{ paddingLeft: Styles.spaceLayout }}
  //   ref={(comp) => (this._photos = comp)}
  //   data={product.gallery}
  //   renderItem={this._renderPhoto}
  //   keyExtractor={(item, index) => item.id || index.toString()}
  //   showsHorizontalScrollIndicator={false}
  //   horizontal
  //   pagingEnabled
  // />
  _renderItem = ({ item, index }) => {
    return (
      <ImageCache
        resizeMode="contain"
        key={index.toString()}
        uri={item.url}
        style={styles.image}
      />
    );
  };
  _renderImages = () => {
    const { product } = this.props;
    return (<Carousel
      enableSnap
      autoplay
      activeSlideAlignment="end"
      layout="stack"
      layoutCardOffset={1}
      inactiveSlideOpacity={0.7}
      inactiveSlideScale={0.96}
      data={product?.gallery}
      renderItem={this._renderItem}
      sliderWidth={contentWidth - contentWidth * 0.1}
      itemWidth={itemWidth - contentWidth * 0.1}
      containerCustomStyle={styles.slider}
      contentContainerCustomStyle={[
        styles.sliderContentContainer,
        Styles.Common.shadowCard,
      ]}
      slideStyle={styles.slideStyle}
    />

    );
  };
  onWebViewMessage = (event) => {
    this.setState({ webViewHeight: Number(event.nativeEvent.data) })
  }
  _renderDescription = () => {
    let { language, app, product } = this.props || {}
    let { languages } = app || {}
    let root = checkRootLang(languages, language, `/${product?.slug}`)

    return (
      <View >
        {(
          <ScrollView contentContainerStyle={{ flexScrollViewGrow: 1 }} >
            <WebView
              automaticallyAdjustContentInsets={true}
              style={{ height: this.state.webViewHeight }}
              onMessage={this.onWebViewMessage}
              injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

              //style={{ marginHorizontal: 5 }}
              source={{ uri: `${scontent}${root}` }}
            />
          </ScrollView>
        )}
        <Text style={styles.textDescription}> </Text>
      </View>
    );
  };

  renderImageNamePrice = ({
    products,
    selectedVariant2,
    productRegularPrice,
    productPrice,
    index,
    colorPriceSale,
    colorPriceRegular,
    colorPriceRegularStrike,

  }) => {
    const contentWidth = Dimensions.get("window").width;

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
          width: contentWidth * 0.8
        }}
      >
        <Image
          resizeMode={'stretch'}
          source={{
            uri:
              products.gallery &&
              products.gallery[0] &&
              products.gallery[0].url,
          }}
          style={{ width: contentWidth * 0.76, height: 228 }}
        />
        <View style={{
          marginTop: 10,
          width: contentWidth * 0.75,
          marginLeft: 0, flexWrap: "wrap"
        }}>
          <HTML
            contentWidth={100}
            source={{
              html:
                selectedVariant2[index] &&
                selectedVariant2[index].details &&
                selectedVariant2[index].details.desc,
            }}
          />
          <View>
            {
              <Animatable.Text
                animation="fadeInDown"
                style={[
                  styles.productPriceSale,
                  {
                    color: colorPriceRegular,
                    marginLeft: 0,
                  },
                ]}
              >
                {productRegularPrice}
              </Animatable.Text>
            }
            <Animatable.Text
              animation="fadeInDown"
              style={[
                styles.productPrice,
                {
                  color: colorPriceSale,

                  fontWeight: "bold",
                  marginTop: 2,
                  marginBottom: 5,
                },
              ]}
            >
              {productPrice}
            </Animatable.Text>


          </View>
        </View>
      </View>
    );
  };

  _renderBottomTabBar = () => {
    const { app } = this.props;
    let { theme } = app || {};
    let { primaryColor } = theme || {};
    return (
      <BottomTabBar
        variant={this.state.selectedVariant}
        product={this.props.product}
        addToCart={this._addToCart}
        primarycolors={primaryColor}
      />
    );
  };
  _renderHeaderOption = (name) => {
    return (
      <View style={Styles.Common.SpacingLayout}>
        <ProductTitle name={name} />
      </View>
    );
  };
  gettotalPrice = () => {
    const { quantity, selectedVariant, selectedVariant2 } = this.state;
    let total = 0;
    total =
      total +
      Number(quantity) * Number(selectedVariant && selectedVariant.sale_price);
    selectedVariant2 &&
      selectedVariant2.map((o) => {
        if (o && o.sale_price)
          total += Number(o && o.quantity) * Number(o && o.sale_price);
      });
    return total;
  };
  _renderSubtotal = (name) => {
    const { quantity, selectedVariant, selectedVariant2 } = this.state;
    const { product } = this.props;
    let { app } = this.props || {};
    let { currency, theme } = app || {};
    let { numberFormat } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    return (
      <View style={{ marginBottom: 30 }}>
        {this._renderHeaderOption("Summary")}
        <View
          style={[
            styles.price_wrapper,
            {
              justifyContent: "space-between",
              paddingHorizontal: "5%",
              marginBottom: 10,
            },
          ]}
        >
          <Text style={[styles.TName, { width: "70%" }]}>
            {product && product.title}{" "}
            {selectedVariant &&
              selectedVariant.selectedOptions &&
              selectedVariant.selectedOptions[0] &&
              selectedVariant.selectedOptions[0].value}{" "}
            x {quantity}
          </Text>
          <Text style={[styles.amounts]}>
            {Tools.getPrice(
              Number(quantity) *
              Number(selectedVariant && selectedVariant.sale_price),
              number_of_decimals,
              currency
            )}
          </Text>
        </View>
        {selectedVariant2 &&
          selectedVariant2.map((o) => {
            if (o && o.sale_price) {
              return (
                <View
                  style={[
                    styles.price_wrapper,
                    {
                      justifyContent: "space-between",
                      paddingHorizontal: "5%",
                      marginVertical: 10,
                    },
                  ]}
                >
                  <Text style={[styles.TName, { width: "70%" }]}>
                    Add On: {o.product.title}{" "}
                    {o &&
                      o.selectedOptions &&
                      o.selectedOptions[0] &&
                      o.selectedOptions[0].value}{" "}
                    x {o && o.quantity}
                  </Text>
                  <Text style={[styles.amounts]}>
                    {Tools.getPrice(
                      Number(o && o.quantity) * Number(o && o.sale_price),
                      number_of_decimals,
                      currency
                    )}
                  </Text>
                </View>
              );
            }
          })}
        <View
          style={{
            marginHorizontal: "4%",
            borderTopColor: "black",
            borderTopWidth: 1,
            justifyContent: "space-between",
            marginVertical: 10,
            paddingVertical: 10,
            flexDirection: "row",
          }}
        >
          <Text style={[styles.TName, { width: "70%" }]}>Subtotal</Text>
          <Text style={[styles.amounts]}>
            {" "}
            {Tools.getPrice(this.gettotalPrice(), number_of_decimals, currency)}
          </Text>
        </View>
      </View>
    );
  };

  addonhandle = (product) => {
    const defaultVarient =
      product && product[0] && product[0].variants && product[0].variants[0];
    let selectedOptions = {};
    product &&
      product[0] &&
      product[0].options &&
      product[0].options.map((selector) => {
        selectedOptions = {
          ...selectedOptions,
          [selector.name.toUpperCase()]:
            selector.values && selector.values[0].value,
        };
      });
    // const {quantity} = this.state
    //     const { addToCart, cartItems, total } = this.props;

    //     addToCart(
    //       { cartItems, product: product[0], selectedVariant: defaultVarient ,quantity},
    //       (data) => {
    //         //console.log(data, "SSSOOOOO");
    //       }
    //     );
  };
  removeaddonhandle = (product) => {
    const { cartItems, removeCartItem } = this.props;
    removeCartItem({ product: product[0], cartItems });
  };

  _renderaddons = (products, index, type) => {
    const { product, app } = this.props;
    let listofitems = product?.addons?.[index]?.items;
    let { selectedVariant2 } = this.state;
    let { currency, theme } = app || {};
    let { numberFormat, shop } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    let { cart, profile } = shop || {};

    let {
      colorPriceRegular,
      colorPriceRegularStrike,
      colorPriceSale,
      colorTitle,
    } = shop;
    const contentWidth = Dimensions.get("window").width;
    const productPrice = Tools.getPrice(
      selectedVariant2[index] && selectedVariant2[index].sale_price,
      number_of_decimals,
      currency
    );
    const productRegularPrice = Tools.getPrice(
      selectedVariant2[index] && selectedVariant2[index].regular_price,
      number_of_decimals,
      currency
    );
    let tagsStyles = {
      body: {
        color: 'black'
      },
      span: {
        color: 'black'
      },
      p: {
        color: 'black'
      }
    }
    return (
      <View style={{ flex: 1, flexWrap: "wrap" }}>
        {products?.type == "simple" &&
          products?.variants?.map((attribute, indexe) => {
            if (type == "Checkbox" || type == "checkbox") {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CheckBox
                      disabled={false}
                      value={this.state.toggleCheckBox}
                      onValueChange={(newValue) => {
                        this.setState({ toggleCheckBox: newValue });
                        if (!newValue) {
                          this.decreaseAddon(index);
                        } else {
                          this.onSelectaddAttribute(
                            products,
                            index,
                            "",
                            "",
                            listofitems[0],
                            type,
                            1
                          );
                        }
                      }}
                    />
                    <Animatable.Text
                      animation="fadeInDown"
                      style={[
                        styles.productPrice,
                        {
                          color: colorPriceRegular,

                          fontWeight: "bold",
                          marginTop: 2,
                          marginBottom: 5,
                          fontSize: 14,
                        },
                      ]}
                    >
                      ADD ON : {products && products.title}{" "}
                      {` (+${productPrice})`}
                    </Animatable.Text>

                    {/* <ChangeQuantityHorizontal
                  quantity={
                   (selectedVariant2 &&
                          selectedVariant2[index] &&
                          selectedVariant2[index].quantity) ||
                        0

                  }
                  onChangeQuantity={(e, type) => {
                    if (type == "increase") {
                      this.increaseAddon(index, () => {
                        this.onSelectaddAttribute(
                          products,
                          index,
                          attribute.name,
                          selectedVariant2?.[index]?.selectedOptions?.[0]?.value,
                          listofitems[options.findIndex(
                            (items) => selectedVariant2?.[index]?.selectedOptions?.[0]?.value == items.value
                          )],
                          type,
                          1
                        );
                      });
                    } else {
                      this.decreaseAddon(index);
                    }
                  }}
                /> */}
                  </View>
                </View>
              );
            } else if (type == "Simple" || type == "simple") {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    width: contentWidth * 0.9,
                    alignContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "center",
                      paddingHorizontal: '5%',
                      marginLeft: 20
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      {selectedVariant2[index] &&
                        selectedVariant2[index].selectedOptions &&
                        selectedVariant2[index].selectedOptions[0] &&
                        selectedVariant2[index].selectedOptions[0].label !=
                        "undefined"
                        ? selectedVariant2[index] &&
                        selectedVariant2[index].selectedOptions &&
                        selectedVariant2[index].selectedOptions[0] &&
                        selectedVariant2[index].selectedOptions[0].label
                        : ""}
                    </Text>
                    <Text style={{ fontWeight: "bold", color: "#000" }}>
                      {" "}
                      {products && products.title}
                    </Text>
                  </View>

                  {this.renderImageNamePrice({
                    products,
                    selectedVariant2,
                    productRegularPrice,
                    productPrice,
                    index,
                    attribute,
                    listofitems,
                    colorPriceSale,

                  })}

                  <View
                    style={{
                      marginVertical: 20,
                      alignSelf: 'flex-end',
                      marginRight: 20
                    }}
                  >
                    <ChangeQuantityHorizontal
                      quantity={
                        (selectedVariant2 &&
                          selectedVariant2[index] &&
                          selectedVariant2[index].quantity) ||
                        0
                      }
                      onChangeQuantity={(e, type) => {
                        if (type == "increase") {
                          this.increaseAddon(index, () => {
                            this.onSelectaddAttribute(
                              products,
                              index,
                              "",
                              "",
                              listofitems[0],
                              type,
                              1
                            );
                          });
                        } else {
                          this.decreaseAddon(index);
                        }
                      }}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "96%",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      {" "}
                      {selectedVariant2[index] &&
                        selectedVariant2[index].details &&
                        selectedVariant2[index].details.label}
                    </Text>
                    <Text style={{ fontWeight: "bold", color: "#000" }}>
                      {" "}
                      {products && products.title}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: "96%",
                      marginTop: 15,
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          products.gallery &&
                          products.gallery[0] &&
                          products.gallery[0].url,
                      }}
                      style={{ width: 120, height: 120 }}
                    />
                    <View style={{ marginLeft: 10 }}>
                      {this.state.render && (
                        <HTML
                          style={{ color: 'black' }}
                          tagsStyles={tagsStyles}
                          source={{
                            html:

                              selectedVariant2?.[index]?.details?.desc,
                          }}
                        />
                      )}
                      <View>
                        {
                          <Animatable.Text
                            animation="fadeInDown"
                            style={[
                              styles.productPriceSale,
                              {
                                color: colorPriceRegular,
                                marginLeft: 0,
                              },
                            ]}
                          >
                            {productRegularPrice}
                          </Animatable.Text>
                        }
                        <Animatable.Text
                          animation="fadeInDown"
                          style={[
                            styles.productPrice,
                            {
                              color: colorPriceSale,

                              fontWeight: "bold",
                              marginTop: 2,
                              marginBottom: 5,
                            },
                          ]}
                        >
                          {productPrice}
                        </Animatable.Text>

                        <ChangeQuantityHorizontal
                          quantity={
                            (selectedVariant2 &&
                              selectedVariant2[index] &&
                              selectedVariant2[index].quantity) ||
                            0
                          }
                          onChangeQuantity={(e, type) => {
                            if (type == "increase") {
                              this.increaseAddon(index, () => {
                                this.onSelectaddAttribute(
                                  products,
                                  index,
                                  attribute.name,
                                  selectedVariant2?.[index]
                                    ?.selectedOptions?.[0]?.value,
                                  listofitems[
                                  options.findIndex(
                                    (items) =>
                                      selectedVariant2?.[index]
                                        ?.selectedOptions?.[0]?.value ==
                                      items.value
                                  )
                                  ],
                                  type,
                                  1
                                );
                              });
                            } else {
                              this.decreaseAddon(index);
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            }
          })}

        {products?.type == "variable" &&
          products?.options?.map((attribute, indexofopt) => {
            const attrName = attribute.name.toUpperCase();
            if (type == "Dropdown" || type == "dropdown") {
              let options = [];
              attribute &&
                attribute.values &&
                attribute.values.map((o, idx) => {
                  const selectedValue = isObject(o) ? o.value : o;
                  let selectedoption = {};
                  selectedoption[attribute.name.toUpperCase()] = selectedValue;
                  let price = Tools.getVariant(
                    products.variants,
                    selectedoption
                  );
                  if (o.value != undefined)
                    options.push({
                      value: o.value,
                      label: `${o.label} ${o.value} `,
                    });
                });

              return (
                <View style={{
                  width: contentWidth * 0.84,

                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "center",
                      paddingHorizontal: '5%',
                      marginLeft: 20
                    }}
                  >
                    <HTML
                      tagsStyles={tagsStyles}

                      contentWidth={100}
                      style={{ fontWeight: "bold", color: "red" }}
                      source={{
                        html:
                          selectedVariant2[index] &&
                          selectedVariant2[index].details &&
                          selectedVariant2[index].details.label,
                      }}
                    />
                    <Text> </Text>

                    <HTML
                      tagsStyles={tagsStyles}

                      contentWidth={100}
                      style={{ fontWeight: "bold", color: "red" }}
                      source={{
                        html: products && products.title,
                      }}
                    />
                  </View>
                  {this.renderImageNamePrice({
                    products,
                    selectedVariant2,
                    productRegularPrice,
                    productPrice,
                    index,
                    attribute,
                    listofitems,
                    colorPriceSale,

                  })}

                  <View
                    style={[
                      {

                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10, width: contentWidth * 0.75
                      },
                      this.state.open && { marginBottom: options.length * 20 },
                    ]}
                  >
                    <DropDownPicker
                      dropDownContainerStyle={{
                        backgroundColor: "#fff",
                      }}
                      open={this.state.open}
                      value={
                        selectedVariant2[index] &&
                        selectedVariant2[index].selectedOptions &&
                        selectedVariant2[index].selectedOptions[0] &&
                        selectedVariant2[index].selectedOptions[0].value
                      }
                      items={options}
                      setOpen={() => this.setState({ open: !this.state.open })}
                      setValue={(e) => {
                        let indexw = options.findIndex(
                          (items) => e() == items.value
                        );
                        this.onSelectaddAttribute(
                          products,
                          index,
                          attribute.name,
                          e(),
                          listofitems[indexw],
                          type,
                          0
                        );
                      }}
                      onClose={() => this.setState({ open: !this.state.open })}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      alignSelf: 'flex-end',
                      marginRight: 10
                    }}
                  >

                    <ChangeQuantityHorizontal
                      quantity={
                        (selectedVariant2 &&
                          selectedVariant2[index] &&
                          selectedVariant2[index].quantity) ||
                        0
                      }
                      onChangeQuantity={(e, type) => {
                        if (type == "increase") {
                          this.increaseAddon(index, () => {
                            this.onSelectaddAttribute(
                              products,
                              index,
                              attribute.name,
                              selectedVariant2?.[index]?.selectedOptions?.[0]
                                ?.value,
                              listofitems[
                              options.findIndex(
                                (items) =>
                                  selectedVariant2?.[index]
                                    ?.selectedOptions?.[0]?.value == items.value
                              )
                              ],
                              type,
                              1
                            );
                          });
                        } else {
                          this.decreaseAddon(index);
                        }
                      }}
                    />
                  </View>
                </View>
              );
            } else if (type == "Color" || type == "color") {
              return (
                <View style={{
                  width: contentWidth * 0.82,
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "center",
                      paddingHorizontal: '5%',
                      marginLeft: 20
                    }}
                  >
                    <HTML
                      contentWidth={100}
                      style={{ fontWeight: "bold", color: "red" }}
                      source={{
                        html:
                          selectedVariant2[index] &&
                            selectedVariant2[index].details &&
                            selectedVariant2[index].details.label != "undefined"
                            ? selectedVariant2[index] &&
                            selectedVariant2[index].details &&
                            selectedVariant2[index].details.label
                            : "",
                      }}
                    />
                    <Text> </Text>

                    <HTML
                      contentWidth={100}
                      style={{ fontWeight: "bold", color: "red" }}
                      source={{
                        html: products && products.title,
                      }}
                    />
                  </View>

                  {this.renderImageNamePrice({
                    products,
                    selectedVariant2,
                    productRegularPrice,
                    productPrice,
                    index,
                    attribute,
                    listofitems,
                    colorPriceSale,

                  })}


                  <View style={{
                    paddingHorizontal: '5%',
                    alignSelf: 'flex-start', flexDirection: "row", marginTop: 10
                  }}>
                    <Text style={{ color: '#333' }}>{attribute.label}</Text>
                    <HTML
                      tagsStyles={tagsStyles}
                      source={{
                        html:
                          selectedVariant2 &&
                            selectedVariant2[index] &&
                            selectedVariant2[index].selectedOptions &&
                            selectedVariant2[index].selectedOptions[indexofopt]
                              .label != "undefined"
                            ? `: ${selectedVariant2 &&
                            selectedVariant2[index] &&
                            selectedVariant2[index].selectedOptions &&
                            selectedVariant2[index].selectedOptions[
                              indexofopt
                            ].label
                            }`
                            : "",
                      }}
                    />
                  </View>
                  <View style={{
                    paddingHorizontal: '5%',
                    alignSelf: 'flex-start',
                    flexDirection: "row", marginTop: 10
                  }}>
                    {attribute &&
                      attribute.values &&
                      attribute.values.map((o, idx) => {
                        const selectedValue = isObject(o) ? o.value : o;
                        const selectedLabel = isObject(o) ? o.label : o;
                        return (
                          <View>
                            {(attribute.optionType == "color" ||
                              attribute.optionType == "buttonColor") && (
                                <TouchableOpacity
                                  onPress={() =>
                                    this.onSelectaddAttribute(
                                      products,
                                      index,
                                      attrName,
                                      selectedValue,
                                      listofitems[idx],
                                      type,
                                      0
                                    )
                                  }
                                  style={[
                                    {
                                      width: 35,
                                      height: 35,
                                      borderRadius: 35,
                                      marginRight: 10,
                                      backgroundColor: "#fff",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    },
                                    selectedVariant2 &&
                                    selectedVariant2[index] &&
                                    selectedVariant2[index].selectedOptions &&
                                    selectedVariant2[index].selectedOptions[0]
                                      .value == selectedValue && {
                                      borderWidth: 2,
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      {
                                        backgroundColor: `${o && o.value}`,
                                        width: 28,
                                        height: 28,
                                        borderRadius: 28,
                                      },
                                    ]}
                                    key={idx.toString()}
                                  ></View>
                                </TouchableOpacity>
                              )}
                          </View>
                        );
                      })}
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      alignSelf: 'flex-end',
                      marginRight: 10
                    }}
                  >
                    <ChangeQuantityHorizontal
                      quantity={
                        (selectedVariant2 &&
                          selectedVariant2[index] &&
                          selectedVariant2[index].quantity) ||
                        0
                      }
                      onChangeQuantity={(e, type) => {
                        if (type == "increase") {
                          this.increaseAddon(index, () => {
                            this.onSelectaddAttribute(
                              products,
                              index,
                              attribute.name,
                              attribute &&
                              attribute.values &&
                              attribute.values[0].value,
                              listofitems[0],
                              type,
                              1
                            );
                          });
                        } else {
                          this.decreaseAddon(index);
                        }
                      }}
                    />
                  </View>
                </View>
              );
            }
          })}
        <View></View>
      </View>
    );
  };

  _renderRelatedProduct = () => {
    return <ProductRelatedContainer product={this.props.product} />;
  };

  _renderContentPhoto = () => {
    return (
      <View>
        <TouchableOpacity
          disabled={this.props.isFetching}
          style={styles.addtoCartButton}
          onPress={() => this._addToCart()}
        >
          <Image style={styles.iconAddCart} source={Images.IconAddCart} />
        </TouchableOpacity>
        {this._renderTitle()}
      </View>
    );
  };
  _renderReview = () => {
    const { product, app, navigation, userInfo } = this.props;
    const { review_of_product, rcount, itemOffset, Avg, reviewImages, Reviews1, Reviews2, Reviews3, Reviews4, Reviews5, totals } = this.state;
    let { format_date } = (app.settings && app.settings.deliverydate[0]) || {};
    let { theme } = app || {};
    let { numberFormat, primaryColor, shop, secondaryColor, review } =
      theme || {};
    let { rate, profile, verified_buyer, tick } = review || {};
    let { review_enabled } = app || {}
    let { star_color } = rate || {};
    let list = review_of_product?.slice(itemOffset * 5, itemOffset * 5 + 5)
    let tagsStyles = {
      body: {
        color: 'black'
      },
      span: {
        color: '#565150'
      },
      p: {
        color: '#565150',
        //  lineHeight: 1.9
      }
    }
    return (
      <FlatList
        ListHeaderComponent={
          <View style={{ width: "95%" }}>
            {review_enabled == "yes" && list?.length != 0 && (
              <ReviewsHeader
                avragerate={Avg}
                reviewImages={reviewImages}
                //  setReviewsp={setReviewsp}
                reviews={review_of_product}
                reviews1={Reviews1}
                reviews2={Reviews2}
                reviews3={Reviews3}
                reviews4={Reviews4}
                reviews5={Reviews5}
                primarycolors={primaryColor}
                secondaryColor={secondaryColor}
                totals={totals}
                // setModals={setModals}
                //setOpenPanel={setOpenPanel}
                userInfo={userInfo}
              />
            )}
            <Button
              style={{
                backgroundColor: primaryColor,
                width: "100%",
                paddingVertical: 10,
                marginTop: 5,
              }}
              text={t("AddReview")}
              type={"text"}
              textStyle={{ fontWeight: 'bold' }}
              onPress={() => {
                if (userInfo?.LoggedUserfo) {
                  navigation.navigate("ReviewScreen", { productid: product?.id });
                }
              }}
            />
          </View>
        }
        contentContainerStyle={{ paddingLeft: Styles.spaceLayout }}
        data={list}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 10,
              borderWidth: 0.5,
              padding: 15,
              width: "95%",
              backgroundColor: '#fbfbfb',
              borderColor: '#d1d1d1'
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <Image
                source={item.profile}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  ba<ckgroundColor: Color.gray,
                }}
              </> */}
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: moderateScale(50),
                    height: moderateScale(50),
                    borderRadius: 45,
                    backgroundColor: profile?.background_color,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: profile?.foreground_color,
                      fontSize: moderateScale(16),
                      fontWeight: "bold",
                    }}
                  >
                    {item.customer?.[0]}
                  </Text>
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: tick && tick.background_color,

                      width: moderateScale(20),
                      height: moderateScale(20),
                      borderRadius: 15,
                      bottom: 0,
                      right: -2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: tick && tick.foreground_color,
                        fontSize: moderateScale(10),
                      }}
                    >
                      &#10004;
                    </Text>
                  </View>
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.TName, {
                    color: '#565150',
                    fontWeight: '800',
                    fontSize: moderateScale(16),
                    marginBottom: moderateScale(5)

                  }]}>{item.customer}</Text>
                  <Text style={[{
                    color: '#04ca0e',
                    fontWeight: '600',

                    fontSize: moderateScale(14),
                    marginBottom: moderateScale(5)

                  }]}>
                    VERIFIED BUYER{" "}
                  </Text>
                  <Text style={[{
                    color: '#565150',
                    fontSize: moderateScale(14),
                    marginBottom: moderateScale(8)

                  }]}>
                    {" "}
                    {format(new Date(moment(item.date).toISOString()), format_date)}
                  </Text>
                  <Rating
                    style={{ alignSelf: "flex-start", marginLeft: 2 }}
                    rating={Number(item.rating)}
                    size={22}
                  />
                </View>
              </View>

            </View>

            <HTML
              //  style={{ color: this.props.primarycolors }}
              source={{ html: item.desc }}
              // contentWidth={contentWidth}
              tagsStyles={tagsStyles}
            />
            <View style={{ flexDirection: "row" }}>
              {item?.img.map((i) => (
                <Image
                  source={{ uri: i }}
                  resizeMode={"stretch"}
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: 5,
                  }}
                />
              ))}
            </View>
            {/* <Text style={[styles.textDescription, { marginVertical: 7 }]}>
              {}
            </Text> */}
          </View>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={<ScrollView horizontal style={{ flexDirection: 'row', marginBottom: 10 }} showsHorizontalScrollIndicator={false}>
          {rcount
            .map((item, index) => {
              return (<TouchableOpacity
                onPress={() => {
                  this.setState({
                    minlimit: index * 6 - 6,
                    maxlimit: index * 6,
                    itemOffset: index
                  })
                }}
                style={{ padding: moderateScale(10), paddingHorizontal: moderateScale(15), marginHorizontal: moderateScale(5), borderWidth: 0.5 }}>
                <Text style={{ color: Number(this.state.itemOffset) == index ? primaryColor : '#565150' }}>{index + 1}</Text>
              </TouchableOpacity>)
            })}
        </ScrollView>}
      />
    );
  };
  render() {
    const { product, list } = this.props;
    const { active, totals, Avg, selectedVariant, review_of_product } =
      this.state;
    let { app } = this.props || {};
    let { currency, theme } = app || {};
    let { numberFormat, shop, review } = theme || {};
    let { number_of_decimals } = numberFormat || {};
    let { cart, profile, savings_bubble } = shop || {};
    let { icon } = cart || {};
    let { rate } = review || {};
    let { star_color } = rate || {};

    let {
      colorPriceRegular,
      colorPriceRegularStrike,
      colorPriceSale,
      colorTitle,
    } = shop;
    const contentWidth = Dimensions.get("window").width;
    const productPrice = Tools.getPrice(
      selectedVariant && selectedVariant.sale_price,
      number_of_decimals,
      currency
    );
    const productRegularPrice = Tools.getPrice(
      selectedVariant && selectedVariant.regular_price,
      number_of_decimals,
      currency
    );
    const isOnSale =
      selectedVariant && selectedVariant.sale_price == 0 ? true : false;
    let tagsStyles = {
      body: {
        color: 'black'
      },
      span: {
        color: 'black'
      }
    }
    return (
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <ScrollView ref={(comp) => (this._scrollview = comp)}>
          <View style={{ paddingHorizontal: '5%' }}>{this._renderImages()}</View>
          <View style={styles.content}>
            {this._renderTitle()}
            <View style={{ paddingHorizontal: "5%" }}>
              <View style={{ flexDirection: "row" }}>
                <Rating
                  style={{ alignSelf: "flex-start", marginBottom: 0 }}
                  rating={Number(Avg || 0)}
                  size={22}
                />
                <Text style={{ marginLeft: 10, color: 'black' }}>{totals} (Reviews)</Text>
              </View>

              <View
                style={{
                  marginTop: !this.state.render ? 10 : 0,
                  color: this.props.primarycolors,
                }}
              >
                {!this.state.render && <Spinkit />}
                {this.state.render && (
                  <HTML
                    style={{ color: this.props.primarycolors }}
                    source={{ html: this.props.product.mini_desc1 }}
                    contentWidth={contentWidth}
                    tagsStyles={tagsStyles}
                  />
                )}
              </View>
              {this.state.render && (
                <HTML
                  style={{ color: this.props.primarycolors }}
                  source={{ html: this.props.product.mini_desc2 }}
                  contentWidth={contentWidth}
                  tagsStyles={tagsStyles}
                />
              )}
              {this.state.render && (
                <HTML
                  source={{ html: this.props.product.short_desc }}
                  contentWidth={contentWidth}
                  tagsStyles={tagsStyles}


                />
              )}
              <Text style={styles.textDescription}></Text>

              <View style={{ marginTop: 20 }}></View>
            </View>
            {product.type == "variable" && (
              <View style={{ marginBottom: 20 }}>
                {this._renderAttributes()}
              </View>
            )}
            <View
              style={[
                Styles.Common.SpacingLayout,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: "6%",
                  marginBottom: 10,
                },
              ]}
            >
              {selectedVariant && selectedVariant.sale_price != 0 && (
                <View
                  style={{
                    backgroundColor: savings_bubble?.background_color,

                    paddingHorizontal: 25,
                    paddingVertical: 8,
                    borderRadius: 25,
                  }}
                >
                  <Text style={{ color: savings_bubble?.foreground_color }}>
                    {Number(
                      ((Number(selectedVariant.regular_price) -
                        Number(selectedVariant.sale_price)) /
                        Number(selectedVariant.regular_price)) *
                      100
                    ).toFixed(0)}
                    % {"Savings"}
                  </Text>
                </View>
              )}
            </View>

            <View
              style={[
                Styles.Common.SpacingLayout,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: "5%",
                },
              ]}
            >
              <View>
                {!isOnSale && (
                  <Animatable.Text
                    animation="fadeInDown"
                    style={[
                      styles.productPriceSale,
                      {
                        color: colorPriceRegular,
                      },
                    ]}
                  >
                    {productRegularPrice}
                  </Animatable.Text>
                )}
                <Animatable.Text
                  animation="fadeInDown"
                  style={[
                    styles.productPrice,
                    {
                      color: colorPriceSale,

                      fontWeight: "bold",
                    },
                  ]}
                >
                  {!isOnSale ? productPrice : productRegularPrice}
                </Animatable.Text>
              </View>
              <ChangeQuantityHorizontal
                quantity={this.state.quantity}
                onChangeQuantity={(e) => {
                  this.setState({ quantity: e });
                }}
              />
            </View>
            {/* {this._renderSubtotal()} */}
          </View>
          <View style={[Styles.Common.SpacingLayout]}>
            <HTML
              source={{ html: this.props.product.instalment_short_desc }}
              contentWidth={contentWidth}
            />
          </View>

          {product?.addons?.length != 0 && (
            <View
              style={[
                Styles.Common.SpacingLayout,
                {
                  borderWidth: 1,
                  borderColor: "#000",
                  marginRight: "4%",
                  borderRadius: 0,
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                  marginVertical: 10,
                },
              ]}
            >
              {product?.addons?.map((items, index) => {
                let products = list.filter(
                  (item) => item.id == items.parent_product_id
                );
                return (
                  <View
                    style={[
                      index != product.addons.length - 1
                        ? {
                          marginBottom: 20,
                          paddingBottom: 20,
                          borderBottomColor: "black",
                          borderBottomWidth: 1,
                        }
                        : { flex: 1 },
                    ]}
                  >
                    {this._renderaddons(products[0], index, items?.addon_type)}
                  </View>
                );
              })}
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: "5%",
              marginTop: 10,
            }}
          >
            {/* <TouchableOpacity
              style={{
                marginRight: 20,
                borderBottomWidth: active == 1 ? 1 : 0,
              }}
              onPress={() => this.setState({ active: 1 })}
            >
              <ProductTitle name={Languages.AdditionalInformation} />
            </TouchableOpacity> */}
            {/* {review_of_product?.length != 0 && (
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderBottomWidth: active == 2 ? 1 : 0,
                }}
                onPress={() => this.setState({ active: 2 })}
              >
                <ProductTitle name={"Reviews"} />
              </TouchableOpacity>
            )} */}
          </View>
          <View style={styles.section}>{this._renderDescription()}</View>

          {review_of_product?.length != 0 && (
            <View style={styles.section}>{this._renderReview()}</View>)}

          <View style={styles.section}>{this._renderRelatedProduct()}</View>
          {/* {this._renderProductColor()} */}
        </ScrollView>

        {this._renderBottomTabBar()}

        <ModalPhotos
          ref={(comp) => (this._modalPhoto = comp)}
          photos={product.gallery}
          renderContent={this._renderContentPhoto}
          isFetching={this.props.isFetching}
        />
      </View>
    );
  }
}
