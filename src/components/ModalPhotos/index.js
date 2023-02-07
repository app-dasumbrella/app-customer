/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import { isFunction, sortBy } from "lodash";
import { ImageCache, NavBarClose } from "@components";
import { Styles, Languages, Tools } from "@common";
import { stackAnimatedStyles, stackScrollInterpolator } from "./animation";
import styles, { sliderWidth, itemWidth } from "./styles";

export default class ModalPhotos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
  };

  static defaultProps = {
    photos: [],
  };

  state = { index: 0, modalVisible: false };

  openModal = (index) => {
    this.setState({ index, modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _renderItem = ({ item, index }) => {
    return (
      <ImageCache
        resizeMode="cover"
        key={index.toString()}
        uri={Tools.getProductImage(item.url || item.img_url, Styles.window.width)}
        style={styles.image}
      />
    );
  };

  _renderContent = () => {
    const { renderContent } = this.props;

    if (!isFunction(renderContent)) return null;

    return <View>{renderContent()}</View>;
  };

  _renderEmptyPhoto = () => {
    return (
      <View>
        <Text>{Languages.EmptyError}</Text>
      </View>
    );
  };

  _reservePhotos = (photos) => {
    if (!photos || (photos && photos.length === 0)) return [];
    return sortBy(photos, (o, i) => {
      return -i;
    });
  };

  render() {
    const { photos } = this.props;
    const { index, modalVisible } = this.state;
    const reversePhotos = this._reservePhotos(photos);
    return (
      <Modal
        ref={(comp) => (this._modalPhoto = comp)}
        visible={modalVisible}
        animationType="none"
        transparent={false}
        onRequestClose={() => {
          //console.log("closed modal photo");
        }}
        style={styles.modalBoxWrap}>
        <View style={styles.closeButton}>
          <NavBarClose onPress={this.closeModal} />
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginBottom: 5 }}>
          {reversePhotos && reversePhotos.length > 0 && (
            <View>
              <Carousel
                enableSnap
                firstItem={reversePhotos.length - 1 - index}
                activeSlideAlignment="end"
                layout="stack"
                layoutCardOffset={1}
                inactiveSlideOpacity={0.7}
                inactiveSlideScale={0.96}
                data={reversePhotos}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={[
                  styles.sliderContentContainer,
                  Styles.Common.shadowCard,
                ]}
                slideStyle={styles.slideStyle}
                slideInterpolatedStyle={stackAnimatedStyles}
                scrollInterpolator={stackScrollInterpolator}
              />
            </View>
          )}
          {this._renderContent()}
        </View>
      </Modal>
    );
  }
}
