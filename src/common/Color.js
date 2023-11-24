/** @format */

import color from "color";
import settingData from '../data/json/site_1.0.json'

export default {
  error: "#f44336",
  facebook: "#3b5998",
  google: "#d34836",

  main: "#fff",
  primaryDark: "#0097A7",
  primary: settingData.theme.primaryColor,
  primaryLight: "#B2EBF2",
  accent: "#FFC107",
  accentLight: "#FFD54F",
  gray: "gray",

  stepActive: "#2AB5B3",
  stepInActive: "rgba(207, 212, 216, 0.8)",

  blackTextPrimary: "rgba(0,0,0,1)",
  blackTextSecondary: "rgba(0,0,0,0.5)",
  blackTextDisable: "rgba(0,0,0,0.3)",

  lightTextPrimary: "rgba(255,255,255,1)",
  lightTextSecondary: "rgba(255,255,255,255.5)",
  lightTextDisable: "rgba(255,255,255,0.3)",

  lightDivide: "rgba(255,255,255,0.12)",
  blackDivide: "rgba(0,0,0,0.05)",

  background: "white",

  Background: "#FFFFFF",
  DirtyBackground: "#F0F0F0",
  Error: "#f96b6b",

  // Toolbar
  Toolbar: "white",
  ToolbarText: "#283747",
  ToolbarIcon: "#283747",

  ToolbarTrans: "transparent",
  ToolbarTextTrans: "black",
  ToolbarIconTrans: "black",

  TopBar: "white",
  TopBarIcon: "#283747",

  // Button
  ButtonBackground: "#00aef0",
  ButtonText: "white",
  ButtonBorder: "#bcbebb",

  // Product tabs
  TabActive: "#00BCD4",
  TabDeActive: "white",
  TabActiveText: "#333",
  TabText: "#333",
  BuyNowButton: "#00BCD4",
  OutOfStockButton: "#a44",

  ViewBorder: "#bcbebb",

  // Text
  Text: "#454553",
  TextDefault: "#9292af",
  TextNormal: "#77a464",
  TextLight: "darkgray",
  TextDark: "#000000",

  // sidemenu
  SideMenuBg(primaryColor) {
    // //console.log(String(color(this.primary).alpha(0.5)));
    return String(color(primaryColor).alpha(0.9));
  },
  SideMenuText: "rgba(255, 255, 255, 0.7)",
  SideMenuTextActived: "white",
  SideMenuIcon: "white",

  // bottom tab bar
  tabbar: "rgba(255, 255, 255, 1)",
  get tabbarTint() {
    return this.primary;
  },
  tabbarColor: "#000",

  // navigation bar
  get headerTintColor() {
    return this.primary;
  },
  navigationBarColor: "#ffffff",
  navigationBarIcon: "rgba(0, 0, 0, 0.3)",
  navigationTitleColor: "rgba(0, 0, 0, 0.8)",

  // wishlist
  heartActiveWishList: "rgba(252, 31, 74, 1)",
  black: '#333',
  spin: "#333333",

  attributes: {
    black: "#333",
    red: "#DF3737",
    green: "#2AB5B3",
    blue: "#38B1E7",
    yellow: "#FDF12C",
  },
  lightGrey: "rgba(247, 248, 250, 1)",
  lightGrey1: "rgba(212, 220, 255, 1)",
  darkOrange: "rgba(255, 132, 11, 1)",
  darkYellow: "rgba(255, 164, 31, 1)",
  yellow: "rgba(255, 198, 53, 1)",
  darkRed: "#8B0000",
  red: "#FF0000",
  lightgrey: "#D3D3D3",
  green: "#2AB5B3",
  blue: "#0091ea",
  lightBlue: "#9ddaff",
  blue1: "rgba(30, 165, 233, 1)",
  blue2: "rgba(3, 207, 254, 1)",
};
