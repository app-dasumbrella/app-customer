/** @format */

import React from "react";
import { TouchableOpacity, FlatList, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { Constants, Languages } from "@common";
import styles from "./styles";
import OrderEmpty from "./Empty";

const cardMargin = Constants.Dimension.ScreenWidth(0.05);

export default class OrderItem extends React.Component {
  state = { activeSections: [] };

  _setSections = () => {
    this.setState({
      activeSections: this.state.activeSections.length ? [] : [0],
    });
  };

  _renderItemOrder = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Text
          style={{
            margin: 4,
            color: "#333",
            width: Constants.Dimension.ScreenWidth(0.6),
          }}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.name}
        </Text>

        <Text
          style={{
            margin: 4,
            color: "#333",
            alignSelf: "center",
          }}>
          {`x${item.quantity}`}
        </Text>

        <Text
          style={{
            margin: 4,
            color: "#333",
            alignSelf: "center",
          }}>
          {item.total}
        </Text>
      </View>
    );
  };

  renderError = (error) => {
    return <OrderEmpty text={error} onReload={this.props.onReload} />;
  };

  render() {
    const { item } = this.props;

    const order = item;

    if (typeof order.line_items === "undefined") {
      return this.renderError(Languages.NoOrder);
    }

    const renderAttribute = (label, context, _style) => {
      return (
        <View style={styles.row}>
          <Text style={[styles.rowLabel]}>{label}</Text>
          <Text style={[styles.rowLabel, _style]}>{context}</Text>
        </View>
      );
    };

    const dateFormat = (date) => {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return `${day}/${month}/${year}`;
    };

    return (
      <View style={{ margin: cardMargin, marginBottom: 0 }}>
        <View style={styles.labelView}>
          <Text style={styles.label}>#{order.number}</Text>
        </View>
        <View style={{ padding: 5 }}>
          {renderAttribute(Languages.OrderDate, dateFormat(order.date_created))}
          {renderAttribute(Languages.OrderStatus, order.status.toUpperCase())}
          {renderAttribute(Languages.OrderPayment, order.payment_method_title)}
          {renderAttribute(
            Languages.OrderTotal,
            `${order.total} ${order.currency}`,
            {
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: Constants.fontHeader,
              color: "#333",
            }
          )}

          <Accordion
            activeSections={this.state.activeSections}
            underlayColor="transparent"
            sections={[{}]}
            onChange={this._setSections}
            renderHeader={() => {
              return (
                <TouchableOpacity
                  style={{ flex: 1, alignItems: "flex-end" }}
                  onPress={this._setSections}>
                  <Text style={styles.orderDetailLabel}>
                    {Languages.OrderDetails}
                  </Text>
                </TouchableOpacity>
              );
            }}
            renderContent={() => {
              return (
                <FlatList
                  contentContainerStyle={{ backgroundColor: "#FFF" }}
                  enableEmptySections
                  keyExtractor={(obj, i) => `${i}`}
                  data={order.line_items}
                  renderItem={this._renderItemOrder}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}
