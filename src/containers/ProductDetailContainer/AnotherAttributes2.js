/** @format */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { ProductSize, ProductTitle } from "@components";
import { Constants, Tools, Styles } from "@common";
import { isObject } from "lodash";
import styles from "./styles";
import { warn } from "@app/Omni";
import DropDownPicker from "react-native-dropdown-picker";
import ChangeQuantityHorizontal from "../../components/ChangeQuantityHorizontal";
let { width } = Dimensions.get("window");

/**
 * render another attributes without color
 */
const COLOR = "COLOR";
export default class ProductDetailAnotherAttributes extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.selectedOptions !== this.props.selectedOptions;
  // }

  _onSelectAttribute = (name, value) => {
    const { onSelect } = this.props;
    onSelect(name, value);
  };

  _renderHeaderOption = (name) => {
    return (
      <View style={{ marginTop: 5 }}>
        <ProductTitle name={name} />
      </View>
    );
  };

  render() {
    const {
      products,
      type,
      prodoptions,
      selectedOptions,
      selectedVariant2,
      prodindex,
      listofitems,
      currency,
      number_of_decimals,
      setvariant,
      decreaseAddon,
      increaseAddon,
      onSelectaddAttribute,
    } = this.props;
    if (!prodoptions || (prodoptions && prodoptions.length === 0)) {
      return null;
    }
    console.log(type, "typetypetype");
    return (
      <View>
        {prodoptions.map((attribute, index) => {
          const attrName = attribute.name.toUpperCase();
          if (type !== "imagebox") {
            let selectedValuew = {};
            let itemsall = [];
            let options = [];
            attribute &&
              attribute.values &&
              attribute.values.map((o, idx) => {
                const selectedValue = isObject(o) ? o.value : o;
                let selectedoption = {};
                selectedoption[attribute.name.toUpperCase()] = selectedValue;
                let price = Tools.getVariant(products.variants, selectedoption);
              });
            return (
              <View key={index.toString()} style={{ marginTop: 10 }}>
                <>
                  {/* {this._renderHeaderOption(attribute.label)} */}
                  <View style={[styles.productSizeContainer]}>
                    {attribute.values.map((o, idx) => {
                      const selectedValue = isObject(o) ? o.value : o;

                      let selectedoption = {};
                      selectedoption[attribute.name.toUpperCase()] =
                        selectedValue;
                      let price = Tools.getVariant(
                        products.variants,
                        selectedoption
                      );
                      return (
                        <View style={{ marginVertical: 10 }}>
                          <TouchableOpacity
                            onPress={() => {
                              onSelectaddAttribute(
                                products,
                                prodindex,
                                attrName,
                                selectedValue,
                                listofitems[idx]
                              );
                            }}
                            selected={
                              selectedVariant2[prodindex] &&
                              selectedVariant2[prodindex].selectedOptions &&
                              selectedVariant2[prodindex].selectedOptions[0] &&
                              selectedVariant2[prodindex].selectedOptions[0]
                                .value === selectedValue
                            }
                            style={[styles.containerLong]}
                            activeOpacity={0.8}
                            underlayColor="transparent"
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  fontSize: 14,
                                  paddingVertical: 10,
                                  margin: 0,
                                  color: '#333'
                                },
                              ]}
                            >
                              {selectedValue}
                            </Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingVertical: 10,
                            }}
                          >
                            <ChangeQuantityHorizontal
                              quantity={
                                selectedVariant2 &&
                                  selectedVariant2[prodindex] &&
                                  selectedVariant2[prodindex].selectedOptions &&
                                  selectedVariant2[prodindex].selectedOptions[0]
                                    .value == selectedValue
                                  ? (selectedVariant2 &&
                                    selectedVariant2[prodindex] &&
                                    selectedVariant2[prodindex].quantity) ||
                                  0
                                  : 0
                              }
                              onChangeQuantity={(e, type) => {
                                if (type == "increase") {
                                  increaseAddon(prodindex, () => {
                                    onSelectaddAttribute(
                                      products,
                                      prodindex,
                                      attrName,
                                      selectedValue,
                                      listofitems[idx]
                                    );
                                  });
                                } else {
                                  decreaseAddon(prodindex);
                                }
                              }}
                            />
                            <Text
                              style={{
                                marginLeft: 8,
                                fontWeight: "bold",
                                color: '#333'
                              }}
                            >
                              {Tools.getPrice(
                                listofitems[idx].price,
                                number_of_decimals,
                                currency
                              )}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </>
              </View>
            );
          } else {
            const attrName = attribute.name.toUpperCase();
            let selectedValuew = {};
            let itemsall = [];
            attribute.values.map((o, idx) => {
              const selectedValue = isObject(o) ? o.value : o;
              let selectedoption = {};
              selectedoption[attribute.name.toUpperCase()] = selectedValue;
              let price = Tools.getVariant(products.variants, selectedoption);
              itemsall.push({
                value: o.value,
                label: (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: width * 0.8,
                    }}
                  >
                    <Text style={{ color: '#333' }}>{o.value}</Text>

                    <Text style={{ color: '#333' }}>
                      {Tools.getPrice(
                        listofitems[idx].price,
                        number_of_decimals,
                        currency
                      )}
                    </Text>
                  </View>
                ),
              });
              selectedValuew = isObject(o) ? o.value : o;
            });

            return (
              <View style={{ marginTop: 10 }}>
                {this._renderHeaderOption(attribute.label)}
                <View
                  style={[
                    styles.productSizeContainer,
                    { width: width * 0.89, marginBottom: 15 },
                    Constants.RTL && { flexDirection: "row-reverse" },
                    this.props.open && {
                      minHeight: itemsall.length * 55,
                    },
                  ]}
                >
                  <DropDownPicker
                    dropDownContainerStyle={{
                      backgroundColor: "#fff",
                    }}
                    open={this.props.open}
                    value={
                      selectedVariant2[prodindex] &&
                      selectedVariant2[prodindex].selectedOptions &&
                      selectedVariant2[prodindex].selectedOptions[0] &&
                      selectedVariant2[prodindex].selectedOptions[0].value
                    }
                    items={itemsall}
                    setOpen={() => this.props.onclose()}
                    setValue={(e) => {
                      let indexw = itemsall.findIndex(
                        (items) => e() == items.value
                      );
                      onSelectaddAttribute(
                        products,
                        index,
                        attribute.name,
                        e(),
                        listofitems[indexw]
                      );
                    }}
                    onClose={() => this.props.onclose()}
                  />
                </View>
                <ChangeQuantityHorizontal
                  quantity={
                    (selectedVariant2 &&
                      selectedVariant2[prodindex] &&
                      selectedVariant2[prodindex].quantity) ||
                    0

                  }
                  onChangeQuantity={(e, type) => {
                    if (type == "increase") {
                      increaseAddon(prodindex, () => {
                        onSelectaddAttribute(
                          products,
                          prodindex,
                          attribute.name,
                          itemsall[0].value,
                          listofitems[0]
                        );
                      });
                    } else {
                      decreaseAddon(prodindex);
                    }
                  }}
                />
              </View>
            );
          }
        })}
      </View>
    );
  }
}
/* {attribute.name != "Size" && (
                    <>
                      {this._renderHeaderOption(attribute.label)}
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
                            const onSelectAttribute = () =>
                              this._onSelectAttribute(attrName, selectedValue);
                            return (
                              <>
                                {attribute.optionType == "buttonColor" &&
                                  attribute.name == "Color" && (
                                    <TouchableOpacity
                                      onPress={onSelectAttribute}
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

                                {attribute.optionType == "buttonLabel" && (
                                  <ProductSize
                                    key={idx.toString()}
                                    text={selectedValue}
                                    color={this.props.primarycolors}
                                    style={[
                                      styles.productSize,
                                      idx === 0 && Styles.Common.SpacingLayout,
                                    ]}
                                    onPress={onSelectAttribute}
                                    selected={
                                      selectedOptions[attrName] ===
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
                  )} */
