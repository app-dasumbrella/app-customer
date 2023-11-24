/** @format */

import React, { Component, useEffect, useState } from "react";
import { Animated, Image, View, Text } from "react-native";
import { isEmpty } from "lodash";
import { windowWidth } from "@containers/HomeContainer2";
import { moderateScale, verticalScale } from "react-native-size-matters";
import store from "../../store/configureStore";
import NavBarMenu from "./Menu";
import NavBarCart from "./Cart";
import * as _ from "lodash";
import RenderHtml from "react-native-render-html";
import moment from "moment";
import NavBarClose from "./Close";
let c = 0

const NavBarLogo = (props) => {
  let { close, navigation } = props || {}
  let app = store?.getState()?.app
  const [st, setst] = useState({})
  useEffect(() => {
    let c = 0
    const interval = setInterval(() => {
      setst(app)
      c = c + 5
      if (c > 15) {
        clearInterval(interval)
      }
    }, 5 * 1000)
  }, [])
  // const scrollAnimation =
  //   props && !isEmpty(props.navigation)
  //     ? props.navigation.getParam("animatedHeader")
  //     : new Animated.Value(1);

  // componentDidUpdate(nextProps) {
  //   console.log("Ipda")
  // }

  // render() {

  return (
    <View >
      {_.isArray(app?.settings?.content?.topbar.content) &&
        app?.settings?.content.topbar?.content.map(item => {
          if (
            moment(item.end_time).isSameOrAfter(
              moment().format("YYYY-MM-DD")
            ) &&
            moment(item.start_time).isSameOrBefore(
              moment().format("YYYY-MM-DD")
            )
          ) {

            return (<View style={{
              backgroundColor: item?.background_color,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}>
              <RenderHtml
                source={{ html: item?.content }}
                contentWidth={windowWidth}
                tagsStyles={{

                  p: {
                    color: item?.foreground_color,
                    fontSize: item?.fontsize,
                    textAlign: item?.alignment
                  }
                }}

              />
            </View>)
          }
        })}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {close && <NavBarClose navigation={navigation} />}
        {!close && <NavBarMenu />}
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignSelf: 'center',
            width: windowWidth * 0.6,
            marginHorizontal: 15, marginVertical: 10
          }}
        >
          <Image
            resizeMode={"contain"}
            source={{ uri: app && app.settings && app.settings.logo_url }}
            style={{ width: windowWidth * 0.45, height: verticalScale(28), alignSelf: 'center', marginVertical: 5 }}
          />
        </View>
        <NavBarCart />
      </View>
    </View>
  )
};
//};




export default NavBarLogo