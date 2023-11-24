/** @format */

import React from "react";
import { Images } from "@common";
import { TabBar } from "@components";
import { View, I18nManager, TouchableOpacity } from "react-native";
import { createAppContainer, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIconContainer from '../containers/TabBarIconContainer'
import HomeScreen from "./HomeScreen";
import NewsDetailScreen from "./NewsDetailScreen";
import CategoriesScreen from "./CategoriesScreen";
import CategoryScreen from "./CategoryScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import CartScreen from "./CartScreen";
import CheckOutScreen from "./CheckoutScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import WishlistScreen from "./WishListScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import RegisterScreen from "./RegisterScreen";
import CustomPageScreen from "./CustomPageScreen";
import ListAllScreen from "./ListAllScreen";
import SettingScreen from "./SettingScreen";
import UserProfileScreen from "./UserProfileScreen";
import UserAddressScreen from "./UserAddressScreen";
import UserAddressFormScreen from "./UserAddressFormScreen";
import AddCreditCardScreen from "./AddCreditCardScreen";
import ContactusContainer from "./ContactusScreen";
import TransitionConfig from "./TransitionConfig";
import OrderDetailsScreen from "./OrderDetailsScreen";
import MessageIco from "../components/MessageIcon";
import ReviewScreen from "./ReviewScreen";
import HomeScreen2 from "./HomeScreen2";
import IframeScreen from "./IframeScreen";
import PaymentScreen from "./PaymentScreen";
import FinishScreen from "./FinishScreen";
import ForgetPScreen from "./ForgetPScreen";

const CategoryStack = createStackNavigator(
  {
    CategoriesScreen: { screen: CategoriesScreen },
    CategoryScreen: { screen: CategoryScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CategoryDetailStack = createStackNavigator(
  {
    CategoryScreen: { screen: CategoryScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const WishlistStack = createStackNavigator(
  {
    SettingScreen: { screen: SettingScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ListAllScreen: { screen: ListAllScreen },
    CategoryScreen: { screen: CategoryScreen },
    Detail: { screen: ProductDetailScreen }

  },
  {
    headerMode: 'none',
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);
const HomeStack2 = createStackNavigator(
  {
    Home: { screen: HomeScreen2 },
    ListAllScreen: { screen: ListAllScreen },
    CategoryScreen: { screen: CategoryScreen },
    Iframe: { screen: IframeScreen }

  },
  {
    headerMode: 'none',

    navigationOptions: {
      headerShown: false,
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const CartScreenStack = createStackNavigator(
  {
    Cart: { screen: CartScreen },
    UserAddressScreen: { screen: UserAddressScreen },
    UserAddressFormScreen: { screen: UserAddressFormScreen },
    AddCreditCardScreen: { screen: AddCreditCardScreen },
    CheckOut: { screen: CheckOutScreen },
    PaymentScreen: { screen: PaymentScreen },
    FinishScreen: { screen: FinishScreen },

  },
  {
    headerMode: 'none',

    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const UserProfileStack = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    WishlistScreen: { screen: WishlistScreen },
    UserAddressScreen: { screen: UserAddressScreen },
    UserAddressFormScreen: { screen: UserAddressFormScreen },
    SettingScreen: { screen: SettingScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    ForgetPScreen: { screen: ForgetPScreen }
  },
  {
    headerMode: 'none',

    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const MyOrdersStack = createStackNavigator(
  {
    MyOrders: { screen: MyOrdersScreen },
    FinishScreen: { screen: FinishScreen },

  },
  {
    headerMode: 'none',

    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);
const MyOrdersStack2 = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen }
  },
  {
    navigationOptions: {
      gestureDirection: I18nManager.isRTL ? "inverted" : "default",
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Default: {
      screen: HomeStack2,
      headerMode: 'none',
      navigationOptions: {
        headerShown: false,

        tabBarIcon: (props) => (
          <TabBarIconContainer icon={Images.IconHome} {...props} />
        ),
      },
    },
    CategoriesScreen: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            css={{ width: 18, height: 18 }}
            icon={Images.IconCategory}
            {...props}
          />
        ),
      },
    },
    // Message: {
    //   screen: MyOrdersStack2,
    //   navigationOptions: {
    //     tabBarIcon: (props) => (
    //       <View>
    //         <MessageIco />
    //       </View>
    //     ),
    //   },
    // },
    // Search: {
    //   screen: SearchStack,
    //   navigationOptions: {
    //     tabBarIcon: (props) => (
    //       <TabBarIconContainer
    //         css={{ width: 18, height: 18 }}
    //         icon={Images.IconSearch}
    //         {...props}
    //       />
    //     ),
    //   },
    //},

    CartScreen: {
      screen: CartScreenStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            cartIcon
            css={{ width: 20, height: 20 }}
            icon={Images.IconCart}
            {...props}
          />
        ),

      },
    },
    MyOrdersScreen: {
      screen: MyOrdersStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            orderIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconOrder}
            {...props}
          />
        ),
      },
    },
    UserProfileScreen: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: (props) => (
          <TabBarIconContainer
            wishlistIcon
            css={{ width: 18, height: 18 }}
            icon={Images.IconUser}
            {...props}
          />
        ),
      },
    },
    SettingScreen: { screen: SettingScreen },
    //OrderDetail:{screen: OrderDetailsScreen},
    CategoryDetail: { screen: CategoryDetailStack },
  },
  {
    // initialRouteName: "CartScreen",
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
    },
    lazy: true,
  }
);

TabNavigator.navigationOptions = (props) => {
  // console.log(props.navigation, "SSSS")

  // if (props.navigation.state?.index == "1") {
  //   if (props.navigation.state?.routes[props.navigation.state?.index]?.routes?.length != 1) {

  //     //  props.navigation.pop()

  //     //      console.log("IN !", props.navigation.state?.routes[props.navigation.state?.index])
  //   }
  // }
  return {
    // fix header show when open drawer
    header: <View />,
    headerStyle: {
      backgroundColor: "transparent",
      height: 0,
      paddingTop: 0,
      borderBottomColor: "transparent",
      borderBottomWidth: 0,
    },
    gestureDirection: I18nManager.isRTL ? "inverted" : "default",
  };
};

const AppNavigator = createStackNavigator(
  {
    Splash: SplashScreen,
    Tab: TabNavigator,
    News: NewsDetailScreen,

    CustomPage: CustomPageScreen,
    Contact: ContactusContainer,
    MyOrders: MyOrdersScreen,
    CartScreen: CartScreen,
    Cart: CartScreen,
    UserAddressScreen: UserAddressScreen,
    UserAddressFormScreen: UserAddressFormScreen,
    AddCreditCardScreen: AddCreditCardScreen,
    ReviewScreen: ReviewScreen,
    FinishScreen: FinishScreen

  },
  {
    mode: "card",
    headerMode: 'none',
    transitionConfig: () => TransitionConfig,
  }
);

export default createAppContainer(AppNavigator);

/**
 * prevent duplicate screen
 */
const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};

CategoryStack.router.getStateForAction = navigateOnce(
  CategoryStack.router.getStateForAction
);
// CategoryDetailStack.router.getStateForAction = navigateOnce(
//   CategoryDetailStack.router.getStateForAction
// );

HomeStack.router.getStateForAction = navigateOnce(
  HomeStack.router.getStateForAction
);
// SearchStack.router.getStateForAction = navigateOnce(
//   SearchStack.router.getStateForAction
// );
CartScreenStack.router.getStateForAction = navigateOnce(
  CartScreenStack.router.getStateForAction
);
