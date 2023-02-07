/** @format */

import React from "react";
import CartIconContainer from '../../containers/CartIconContainer'
import { View } from 'react-native'
import { moderateScale, verticalScale } from "react-native-size-matters";

const NavBarCart = () => <CartIconContainer />
export default NavBarCart;
// > <View style={{ position: 'absolute', right: moderateScale(-60), top: verticalScale(0) }}></View>