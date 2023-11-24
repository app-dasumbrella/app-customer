/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modalbox";
import styles from "./styles";

export default class ModalBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    css: PropTypes.any,
    type: PropTypes.string,
  };

  closeModal = () => {
    this.modal.close();
  };

  openModal() {
    this.modal.open();
  }

  render() {
    const { type, css } = this.props;
    return (
      <Modal
        ref={(modal) => (this.modal = modal)}
        animationDuration={100}
        backdropOpacity={Platform.OS === "android" ? 0.9 : 0.5}
        position="top"
        style={[
          typeof type !== "undefined"
            ? styles.modalReadlater
            : styles.modalBoxWrap,
          css,
        ]}>
        <View style={styles.wrap}>{this.props.children}</View>

        <TouchableOpacity style={styles.iconZoom} onPress={this.closeModal}>
          {/* <Icon
            style={styles.textClose}
            name="close"
            size={22}
            color="rgba(0,0,0, 0.4)"
            backgroundColor="transparent"
          /> */}
        </TouchableOpacity>
      </Modal>
    );
  }
}
