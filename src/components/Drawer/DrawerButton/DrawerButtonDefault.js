/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity, I18nManager, Text, Image } from "react-native";
import { Styles, Color, Constants, Languages, Images } from "../../../common";
import { Icon } from "../../../Omni";
import { moderateScale } from "react-native-size-matters";

class DrawerButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    }
  }

  render() {
    const { index, productlist, link_type, children, text, onPress, link, icon, uppercase, isActive, highlight, } = this.props;
    const transText = text;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.container,
            isActive && {
              borderLeftWidth: 1,
              borderColor: Color.SideMenuTextActived,
            },
            {
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          ]}
          onPress={() => {
            if (children?.length != 0 && children?.length != undefined) {
              this.setState({ selectedId: this.state.selectedId == index ? null : index })
            } else {
              if (link_type == "product") {

                let filt = productlist?.filter(po => `/${po.slug}` == link)
                onPress("Detail", { item: filt?.[0] }, false);
              }
              else {
                onPress("Iframe", { item: link }, true);

              }
            }
            //this._handlePress({ item })

          }}>

          <Text
            style={[
              styles.text,
              isActive && { color: Color.SideMenuTextActived },
              I18nManager.isRTL && { paddingRight: 20 },
              highlight != "" && { color: highlight },
              { paddingHorizontal: moderateScale(20) }
            ]}>
            {uppercase ? transText.toUpperCase() : transText}
          </Text>

          {children?.length != undefined && children?.length != 0 && <Image
            style={{
              transform: [{ rotate: this.state.selectedId == index ? '270deg' : '90deg' }],
              width: moderateScale(15), height: moderateScale(15),
              marginRight: 20
            }}
            source={Images.icons.next}
            resizeMode={'contain'}
          />}

        </TouchableOpacity>
        {this.state.selectedId == index && children?.map(ip => {
          return <TouchableOpacity
            onPress={() => {
              if (ip?.children?.length != 0 && ip?.children?.length != undefined) {

              } else {
                if (ip?.link_type == "product") {

                  let filt = productlist?.filter(po => `/${po.slug}` == ip?.link)
                  onPress("Detail", { item: filt?.[0] }, false);
                }
                else {
                  onPress("Iframe", { item: ip?.link }, true);

                }
              }
              //this._handlePress({ item })

            }}
            style={[
              styles.container,
              isActive && {
                borderLeftWidth: 1,
                borderColor: Color.SideMenuTextActived,
              },
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: moderateScale(40),
                backgroundColor: '#f2f2f2'
              }
            ]}
          >
            <Text
              style={[
                styles.text,
                isActive && { color: Color.SideMenuTextActived },
                I18nManager.isRTL && { paddingRight: 20 },

              ]}>
              {ip?.label}
            </Text>
          </TouchableOpacity>
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Styles.Common.RowCenterLeft,
    paddingVertical: 10,
    //mmaHorizontal: 20,
    paddingRight: 0
    // flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    padding: 4,
    color: 'grey',
    fontSize: moderateScale(16),
    fontFamily: Constants.fontFamily,
  },
});

DrawerButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  uppercase: PropTypes.bool,
  isActive: PropTypes.bool,
};

DrawerButton.defaultProps = {
  uppercase: false,
  isActive: false,
  text: "Default button name",
  onPress: () => alert("Drawer button clicked"),
};

export default DrawerButton;
