/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

const ImageCache = (props) => {
  return <Image  {...props} style={props.style} source={{ uri: props.uri }} resizeMode={props.resizeMode || 'cover'} />;
};

ImageCache.propTypes = {
  style: PropTypes.any,
  uri: PropTypes.any,
};

export default ImageCache;
