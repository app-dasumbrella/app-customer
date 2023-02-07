/** @format */

import {  PixelRatio } from "react-native";
import { Constants, Languages, Images, Color, Config } from "@common";
import { AllHtmlEntities } from "html-entities";
import _ from "lodash";
import URI from "urijs";
import _currencyFormatter from "currency-formatter";

const COLOR_DEFAULT = "#333";

export default class Tools {
  /**
   * refresh the tab bar & read later page
   */
  static getImage(data, imageSize) {
    if (typeof data === "undefined" || data == null) {
      return Constants.PlaceHolder;
    }
    if (typeof imageSize === "undefined") {
      imageSize = "medium";
    }

    const getImageSize = (mediaDetail) => {
      let imageURL = "";
      if (typeof mediaDetail.sizes !== "undefined") {
        if (typeof mediaDetail.sizes[imageSize] !== "undefined") {
          imageURL = mediaDetail.sizes[imageSize].source_url;
        }

        if (imageURL == "" && typeof mediaDetail.sizes.medium !== "undefined") {
          imageURL = mediaDetail.sizes.medium.source_url;
        }

        if (imageURL == "" && typeof mediaDetail.sizes.full !== "undefined") {
          imageURL = mediaDetail.sizes.full.source_url;
        }
      }

      if (typeof data.better_featured_image != null) {
        imageURL = data.better_featured_image.source_url;
      }

      return imageURL;
    };

    let imageURL =
      typeof data.better_featured_image !== "undefined" &&
      data.better_featured_image != null
        ? data.better_featured_image.source_url
        : Constants.PlaceHolderURL;

    if (
      typeof data.better_featured_image !== "undefined" &&
      data.better_featured_image !== null
    ) {
      if (typeof data.better_featured_image.media_details !== "undefined") {
        imageURL = getImageSize(data.better_featured_image.media_details);
      }
    }

    if (imageURL == "") {
      return Constants.PlaceHolderURL;
    }

    //console.log(imageURL);

    return imageURL;
  }

  static getDescription(description, limit) {
    if (typeof limit === "undefined") {
      limit = 50;
    }

    if (typeof description === "undefined") {
      return "";
    }

    let desc = description.replace("<p>", "");
    desc = _.truncate(desc, { length: limit, separator: " " });

    return AllHtmlEntities.decode(desc);
  }

  static getLinkVideo(content) {
    const regExp = /^.*((www.youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#&\?\/\ ]*).*/;
    let embedId = "";
    let youtubeUrl = "";

    URI.withinString(content, (url) => {
      const match = url.match(regExp);
      if (match && match[7].length === 11) {
        embedId = match[7];
        youtubeUrl = `www.youtube.com/embed/${embedId}`;
      }
    });
    return youtubeUrl;
  }

  static async getFontSizePostDetail() {
    // const data = await AsyncStorage.getItem("@setting_fontSize");
    // if (typeof data !== "undefined") {
    //   return parseInt(data);
    // }
    return Constants.fontText.size;
  }

  /**
   * getName user
   * @user
   */
  static getName = (user) => {
    if (user) {
      if (user.displayName) return user.displayName;
      if (
        typeof user.last_name !== "undefined" ||
        typeof user.first_name !== "undefined"
      ) {
        const first = user.first_name != null ? user.first_name : "";
        const last = user.last_name != null ? user.last_name : "";
        return `${first} ${last}`;
      } else if (typeof user.name !== "undefined" && user.name != null) {
        return user.name;
      }
      return Languages.Guest;
    }
    return Languages.Guest;
  };

  /**
   * getAvatar
   * @user
   */
  static getAvatar = (user) => {
    if (user) {
      if (user.avatar_url) {
        return {
          uri: user.avatar_url,
        };
      } else if (user.picture) {
        return {
          uri: user.picture.data.url,
        };
      }
      return Images.defaultAvatar;
    }

    return Images.defaultAvatar;
  };

  /**
   * get price
   */
  static getPrice = (price, number_of_decimals,currency) => {
     const currencyFormatter = _.bind(_currencyFormatter.format, undefined, _, {
      code: currency || "USD",
      symbol: currency,
      decimal: ".",
      thousand: ",",
      precision: number_of_decimals,
      format: "%s %v", // %s is the symbol and %v is the value
    });
    return currencyFormatter(price);
  };

  /**
   * get attributes
   * @param item
   * @param type color || size
   */
  static getAttribute = (item, type) => {
    let attribute = null;
    if (item.attributes) {
      for (let i = 0; i < item.attributes.length; i++) {
        const itemName = item.attributes[i].name;
        if (itemName && itemName.toUpperCase() === type.toUpperCase()) {
          attribute = item.attributes[i];
          break;
        }
      }
    }
    return attribute;
  };

  /**
   * get colors product
   * @param value (Object || string)
   */
  static getColor = (o) => {
    const value = _.isObject(o) ? o.value : o;
    const color = value.toLowerCase();
    if (Color.attributes[color]) {
      return Color.attributes[color];
    }
    return COLOR_DEFAULT;
  };

  /**
   * get variant from option
   * @param variants Array
   * @param selectedOptions Object
   * return { Color, Size}
   */
  static getVariant = (variants, selectedOptions) => {
    const selectedVariant = variants.find((variant) => {
      return variant&&variant.selectedOptions&&variant.selectedOptions.every((selectedOption) => {
        return (
          selectedOptions[selectedOption.name.toUpperCase()] ===
          selectedOption.value.valueOf()
        );
      });
    });
    return selectedVariant;
  };

  /**
   * get product image
   * @param uri String
   * @param containerWidth String size
   */
  static getProductImage = (uri, containerWidth) => {
    if (!uri) return Images.PlaceHolderURL;
    // Enhance number if you want to fetch a better quality image (may affect performance
    const DPI_NUMBER = 0.5; // change this to 1 for high quality image

    if (!Config.ProductSize.enable) {
      return uri;
    }

    if (typeof uri !== "string") {
      return Images.PlaceHolderURL;
    }

    // parse uri into parts
    const index = uri.lastIndexOf(".");
    let editedURI = uri.slice(0, index);
    const defaultType = uri.slice(index);

    const SMALL = Config.ProductSize.ProductThumbnails;
    const MEDIUM = Config.ProductSize.CatalogImages;
    const LARGE = Config.ProductSize.SingleProductImage;

    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(containerWidth);

    switch (true) {
      case pixelWidth * DPI_NUMBER < SMALL.width:
        editedURI = `${editedURI}-${SMALL.width}x${SMALL.height}${defaultType}`;
        break;
      case pixelWidth * DPI_NUMBER < MEDIUM.width:
        editedURI = `${editedURI}-${MEDIUM.width}x${
          MEDIUM.height
        }${defaultType}`;
        break;
      case pixelWidth * DPI_NUMBER < LARGE.width:
        editedURI = `${editedURI}-${LARGE.width}x${LARGE.height}${defaultType}`;
        break;
      default:
        editedURI += defaultType;
    }

    return editedURI;
  };

  /**
   * get coupon
   */
  static getCoupon = (couponCode, couponAmount, coupon, discountType) => {
    if (couponCode === coupon) {
      if (discountType === "percent") {
        return couponAmount / 100.0;
      }
      return couponAmount;
    }
    return 0;
  };

  /**
   * calculate final price with coupon
   */
  static getFinalPrice = (discountType, totalPrice, hasCoupon) => {
    if (!hasCoupon) return totalPrice;

    return discountType === "percent"
      ? totalPrice - hasCoupon * totalPrice
      : totalPrice - hasCoupon;
  };

  /**
   * @function getAddress get address from data
   *
   * @static
   * @memberof Tools
   */
  static getAddress = (data) => {
    try {
      if (data) {
        return {
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          company: data.company,
          country: data.country,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          province: data.province,
          zip: data.zip,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  };
  /**
   * get % sale product
   */
  static getPriceDiscount = (product) => {
    return `-${(
      (1 - Number(product.price) / Number(product.regularPrice)) *
      100
    ).toFixed(0)}%`;
  };
}
