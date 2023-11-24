/**
 * Created by InspireUI on 03/03/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Platform,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { selectCategory } from "@redux/actions";

import { Button } from "@components";
import { Styles, Color, Languages } from "@common";
import RowItem from "./RowItem";

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.category.selectedCategory,
    categories: state.app?.categorysettings?.categories?.list
  };
};

/**
 * TODO: refactor
 * connect to redux cannot use ref
 */
@connect(
  mapStateToProps,
  { selectCategory }
)
export default class CategoryPickerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempSelectedCategory: props.selectedCategory,
    };
  }

  _renderItem = ({ item }) => {
    const { tempSelectedCategory } = this.state;
    const { selectCategory } = this.props;
    const onPress = () => this._onSelect(item);

    return (
      <RowItem
        category={item}
        isSelect={tempSelectedCategory.id === item.id}
        isFirst={selectCategory.id === item.id}
        onPress={onPress}
      />
    );
  };

  _openModal = () => {
    this.props.openModal();
  };

  _closeModal = () => {
    this.props.closeModal();
  };

  _onSelect = (item) => {
    this.setState({ tempSelectedCategory: item });
  };

  _onSelectPressHandle = () => {
    const { selectCategory } = this.props;
    const { tempSelectedCategory } = this.state;
    if (selectCategory.id === tempSelectedCategory.id) return;

    this.props.selectCategory(tempSelectedCategory);
    this._closeModal();
  };

  render() {
    const { categories, modalVisible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={this._closeModal}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{Languages.Categories}</Text>
            </View>
            <View style={styles.listViewWrap}>
              <FlatList
                data={categories}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
              />
            </View>
            <View style={styles.row}>
              <Button
                text={Languages.Cancel}
                style={styles.cancelContainer}
                textStyle={styles.cancelText}
                onPress={this._closeModal}
              />
              <Button
                text={Languages.Select}
                style={styles.selectContainer}
                textStyle={styles.selectText}
                onPress={this._onSelectPressHandle}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Styles.width / 10,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  subContainer: {
    backgroundColor: Color.background,
    borderRadius: 10,
    ...Platform.select({
      ios: {},
      android: {
        elevation: 4,
      },
    }),
  },
  titleWrap: {
    ...Styles.Common.ColumnCenter,
    padding: 20,
    backgroundColor: Color.navigationBarColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: "500",
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.medium,
  },
  listViewWrap: {
    maxHeight: Styles.height / 2,
    paddingHorizontal: 3,
  },
  selectContainer: {
    padding: 15,
    backgroundColor: "rgba(0,145,234,1)",
    borderWidth: 0.5,
    borderColor: "#FFF",
    flex: 1,
    borderBottomRightRadius: 10,
  },
  selectText: {
    color: "white",
    fontSize: 14,
  },
  cancelContainer: {
    padding: 15,
    backgroundColor: "#eee",
    flex: 1,
    borderBottomLeftRadius: 10,
  },
  cancelText: {
    color: "rgba(0,0,0,1)",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
  },
});

CategoryPickerContainer.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  // mainCategory: PropTypes.object,
  subCategories: PropTypes.array,
};
CategoryPickerContainer.defaultProps = {
  visible: false,
};
