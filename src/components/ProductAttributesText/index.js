/** @format */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Constants } from "@common";

const ProductAttributesText = ({ attributes }) => (
  <View style={styles.container}>
    {attributes.map((o, index) => {
      return (
        <View
          key={index.toString()}
          style={[
            styles.row,
            Constants.RTL && { flexDirection: "row-reverse" },
          ]}>
          <View style={styles.lbContainer}>
            <Text style={styles.label}>{o.name}</Text>
          </View>
          <View style={styles.lbValue}>
            <View style={styles.rowValue}>
              {o.options.map((opt, idx) => (
                <Text key={idx.toString()} style={styles.value}>
                  {opt.value.toString()}
                </Text>
              ))}
            </View>
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  row: {
    flexDirection: "row",
    minHeight: 50,
  },
  lbContainer: {
    flex: 0.25,
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderRightColor: "#CED7DD",
    backgroundColor: "rgba(255,255,255,1)",
  },
  lbValue: {
    flex: 0.75,
    justifyContent: "center",
  },
  rowValue: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  label: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    margin: 5,
    marginLeft: 10,
    color: "#5B5B5B",
    fontSize: 15,
    backgroundColor: "rgba(255,255,255,1)",
  },
});

export default ProductAttributesText;
