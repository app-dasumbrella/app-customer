/** @format */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { ProductSize, ProductTitle } from "@components";
import { Constants, Tools, Styles } from "@common";
import { isObject, isUndefined } from "lodash";
import styles from "./styles";
import { warn } from "@app/Omni";
import * as _ from "lodash";
import DropDownPicker from "react-native-dropdown-picker";
let { width } = Dimensions.get("window");
/**
 * render another attributes without color
 */
const COLOR = "COLOR";
export default class ProductDetailAnotherAttributes extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.selectedOptions !== this.props.selectedOptions;
  // }

  _onSelectAttribute = (name, value, label) => {
    const { onSelect } = this.props;
    onSelect(name, value, label);
  };

  _renderHeaderOption = (name) => {
    return (
      <View style={{ paddingHorizontal: '5%', marginBottom: -5 }}>
        <ProductTitle name={name} />
      </View>
    );
  };

  render() {
    const {
      options,
      selectedOptions,
      variants,
      number_of_decimals,
      currency,
      product,
      selectedLableOp,
      language,
      primaryColor,
      selectedVariant
    } = this.props;

    if (!options || (options && options.length === 0)) {
      return null;
    }

    return (
      <>
        <View>
          {options.map((attribute, index) => {
            if (
              attribute.optionType == "dropdown" ||
              attribute.optionType == "Dropdown"
            ) {
              const attrName = attribute.name.toUpperCase();
              let selectedValuew = {};
              let itemsall = [];
              attribute.values.map((o, idx) => {
                itemsall.push({
                  value: o.value,
                  label: (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: width * 0.75,
                      }}
                    >
                      <Text style={{ color: '#333' }}>
                        {o.label} {o.value}
                      </Text>

                      {/* <Text >
                        {Tools.getPrice(
                          product.variants && product.variants[idx].sale_price,
                          number_of_decimals,
                          currency
                        )}
                      </Text> */}
                    </View>
                  ),
                });
                selectedValuew = isObject(o) ? o.value : o;
              });
              return (
                <>
                  <>
                    {this._renderHeaderOption(attribute.label)}
                    <View
                      style={[
                        styles.productSizeContainer,
                        { marginLeft: "5%", width: "90%" },
                        Constants.RTL && { flexDirection: "row-reverse" },
                      ]}
                    >
                      <DropDownPicker
                        open={this.props.open}
                        value={selectedOptions[attrName]}
                        items={itemsall}
                        setOpen={() => this.props.onclose()}
                        setValue={(value) =>
                          this._onSelectAttribute(attrName, value())
                        }

                      // setItems={setItems}
                      />
                    </View>
                  </>
                </>
              );
            }
            if (
              attribute.optionType == "radioButton" ||
              attribute.optionType == "radio"
            ) {
              const attrName = attribute.name.toUpperCase();

              return (
                <View style={{ flexWrap: "wrap" }}>
                  {this._renderHeaderOption(`${attribute.label}:  ${selectedLableOp[attrName]} `)}

                  {attribute &&
                    attribute.values &&
                    attribute.values.map((o, idx) => {
                      const selectedValue = isObject(o) ? o.value : o;
                      const selectedLabel = isObject(o) ? o.label : o;
                      return (
                        <View
                          style={{
                            paddingHorizontal: "8%",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            marginRight: 10,

                            paddingVertical: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this._onSelectAttribute(attrName, selectedValue, selectedLabel);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 20,
                              borderWidth: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 10,
                              padding: 10
                            }}
                          >
                            <View
                              style={[
                                {
                                  width: 10,
                                  height: 10,
                                  borderRadius: 10,
                                },
                                selectedOptions[attrName] == selectedValue && {
                                  backgroundColor: 'red',
                                },
                              ]}
                            ></View>
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              marginBottom: 4,
                              color: '#333'
                            }}
                          >
                            {selectedValue}
                          </Text>
                        </View>
                      );
                    })}
                </View>
              );
            }
          })}
        </View>
        <View>
          {options.map((attribute, index) => {
            const attrName = attribute.name.toUpperCase();
            if (
              (attribute.optionType == "button" ||
                attribute.optionType == "buttonLabel" ||
                attribute.optionType == "color" ||
                attribute.optionType == "buttonColor"
              )
            ) {
              return (
                <View key={index.toString()} style={{ marginTop: 5 }}>
                  {(
                    <>
                      {(attribute.optionType == "button" ||
                        attribute.optionType == "buttonLabel") && this._renderHeaderOption(`${attribute.label}: ${selectedOptions[attrName]}`)}
                      {(attribute.optionType == "radio" ||
                        attribute.optionType == "radioButton") && this._renderHeaderOption(`${attribute.label}: ${selectedLableOp[attrName]}`)}
                      {(attribute.optionType == "color" ||
                        attribute.optionType == "buttonColor") &&
                        this._renderHeaderOption(
                          `${attribute.label}: ${language?.code != "en" &&
                            !_.isUndefined(
                              selectedVariant?.options?.[index]?.values[
                                selectedVariant?.indexselect
                              ]?.label_alt
                            )
                            ? selectedVariant?.options?.[index]?.values[
                              selectedVariant?.indexselect
                            ]?.label_alt
                            : selectedVariant?.options?.[index]?.values[
                              selectedVariant?.indexselect
                            ]?.label
                          }`
                        )}
                      <View
                        style={[
                          styles.productSizeContainer,
                          { marginLeft: 10 },
                          Constants.RTL && { flexDirection: "row-reverse" },
                        ]}
                      >
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          {attribute.values.map((o, idx) => {
                            const selectedValue = isObject(o) ? o.value : o;
                            const selectedLabel = isObject(o) ? o.label : o;
                            return (
                              <>
                                {(attribute.optionType == "color" ||
                                  attribute.optionType == "buttonColor") && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this._onSelectAttribute(attrName, selectedValue, selectedLabel)
                                      }}
                                      style={{
                                        marginHorizontal: 5,
                                        borderWidth:
                                          selectedOptions[attrName] ===
                                            selectedValue
                                            ? 1
                                            : 0,
                                        borderColor: this.props.primarycolors,
                                        borderRadius: 43,
                                        width: 43,
                                        height: 43,
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: 35,
                                          height: 35,
                                          borderRadius: 35,
                                          backgroundColor: selectedValue,
                                        }}
                                      ></View>
                                    </TouchableOpacity>
                                  )}

                                {attribute.optionType == "radioButton" ||
                                  attribute.optionType == "radio" || attribute.optionType == "buttonLabel" && (
                                    <ProductSize
                                      key={idx.toString()}
                                      text={selectedValue}
                                      color={this.props.primarycolors}
                                      style={[
                                        styles.productSize,
                                        idx === 0 && Styles.Common.SpacingLayout,
                                      ]}
                                      onPress={() =>
                                        onSelectAttribute(attrName, selectedValue)
                                      }
                                      selected={
                                        selectedOptions[attribute.name] ===
                                        selectedValue
                                      }
                                    />
                                  )}
                              </>
                            );
                          })}
                        </ScrollView>
                      </View>
                    </>
                  )}
                  {(
                    <>

                      <View
                        style={[
                          styles.productSizeContainer,
                          { marginLeft: 10 },
                        ]}
                      >
                        <View
                          style={{ flexDirection: "row", flexWrap: 'wrap' }}
                        >
                          {attribute.values.map((o, idx) => {
                            const selectedValueToShow = isObject(o)
                              ? language?.code == "en"
                                ? o.value
                                : o.value_alt == undefined ? o.value : o.value_alt
                              : o;
                            const selectedValue = isObject(o) ? o.value : o;
                            const selectedLabel = isObject(o) ? o.label : o;
                            const selectedLabelToShow = isObject(o)
                              ? language?.code == "en"
                                ? o.label
                                : o.label_alt == undefined ? o.label : o.label_alt : o
                            const onSelectAttribute = () =>
                              this._onSelectAttribute(attrName, selectedValue, selectedLabel);
                            { console.log(selectedLabelToShow, '', o) }
                            return (
                              <View >


                                {(attribute.optionType == "button" ||
                                  attribute.optionType == "buttonLabel") && (
                                    <ProductSize
                                      key={idx.toString()}
                                      text={
                                        selectedLabelToShow == "" || isUndefined(selectedLabelToShow)
                                          ? selectedValueToShow
                                          : selectedLabelToShow
                                      }

                                      style={{
                                        padding: 0,
                                        marginVertical: 5,
                                        marginHorizontal: 10,
                                      }}
                                      style2={{
                                        fontSize: 14,
                                        paddingVertical: 10,
                                        margin: 0,
                                      }}
                                      onPress={onSelectAttribute}
                                      selected={
                                        selectedOptions[attrName] ===
                                        selectedValue
                                      }
                                      color={'#fff'}
                                      primaryColor={primaryColor}
                                    />
                                  )}
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </>
                  )}
                </View>
              );
            }
          })}
        </View>
      </>
    );
  }
}
