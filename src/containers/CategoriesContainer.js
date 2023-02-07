/** @format */

import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import Parallax from "react-native-parallax";
import { connect } from "react-redux";
import { selectCategory } from "../redux/actions";
import { isString } from "lodash";
import { Images, Styles, Constants } from "../common";
import { Empty, Spinkit } from "../components";

const mapStateToProps = (state) => {
  return {
    category: state.category,
    netInfo: state.netInfo,
    app: state.app
  };
};

@connect(
  mapStateToProps,
  { selectCategory }
)
export default class CategoriesContainer extends Component {
  componentDidMount() {
    const { category } = this.props;
    const { list } = category;
    if (!list || (list && list.length === 0)) {
      //   this.props.fetchCategories();
    }
  }

  _onRowClickHandle = (category) => {

    this.props.selectCategory(category);
    this.props.navigation.navigate("CategoryScreen");
  };

  _getTextStyle = (index) => {
    return index % 2 === 0
      ? { marginRight: 30, textAlign: "right" }
      : { marginLeft: 30, textAlign: "left" };
  };

  _getImageUrl = (category) => {
    return category.imgurl
      ? { uri: category.imgurl }
      : Images.categoryPlaceholder;
  };

  render() {
    const { category } = this.props;
    const list = this.props?.app?.categorysettings?.categories?.list
    console.log(list)
    if (category.error && isString(category.error)) {
      return <Empty text={category.error} />;
    }

    if (category.isFetching) {
      return (
        <Spinkit
          style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
        />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Parallax.ScrollView style={styles.fill}>
          {list.map((category, index) => {
            const textStyle = this._getTextStyle(index);
            const categoryImage = this._getImageUrl(category);
            const onPress = () => this._onRowClickHandle(category);
            return (
              <Parallax.Image
                key={index.toString()}
                onPress={onPress}
                style={styles.image}
                overlayStyle={styles.overlay}
                containerStyle={styles.containerStyle}
                parallaxFactor={0.4}
                source={categoryImage}>
                <View
                  style={[
                    styles.dim_layout,
                    index % 2 == 0 && { alignItems: "flex-end" },
                    index % 2 != 0 && { alignItems: "flex-start" },
                  ]}>
                  <Text style={[styles.mainCategoryText, { ...textStyle }]}>
                    {category.name}
                  </Text>
                </View>
              </Parallax.Image>
            );
          })}
        </Parallax.ScrollView>
      </View>
    );
  }
}

const styles = {
  fill: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    height: Styles.headerHeight,
  },
  backgroundImage: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    width: null,
    height:
      Platform.OS === "ios" ? Styles.headerHeight : Styles.headerHeight + 100,
  },
  scrollViewContent: {
    position: "relative",
    marginBottom: 100,
  },

  image: {
    flex: 1,
    // width: Styles.window.width,
    height: Styles.window.width / 2 - 20,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: "transparent",
    marginBottom: 12,
  },
  dim_layout: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  mainCategoryText: {
    color: "white",
    fontSize: 25,
    fontFamily: Constants.fontHeader,
  },
  numberOfProductsText: {
    color: "white",
    fontSize: 12,
    fontFamily: Constants.fontFamily,
  },
  overlay: {
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  containerStyle: {
    shadowColor: "#000",
    backgroundColor: "transparent",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  fab: {
    position: "absolute",
    overflow: "hidden",
    bottom: 15,
    right: 12,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, .85)",

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
};
