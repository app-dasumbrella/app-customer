/** @format */

import Constants from "./Constants";
import Icons from "./Icons";
import settingData from '../data/json/site_1.0.json'

export default {
  /**
   * Step 1: change to your website shopify graphqlUrl, and storeAccessToken
   * https://help.shopify.com/en/api/custom-storefronts/storefront-api/getting-started
   * Moved AppConfig.json
   */

  // to config custompage
  Wordpress: {
    url: "http://mstore.io",
  },

  /**
     Step 2: Setting Product Images
     - ProductSize: Explode the guide from: update the product display size: https://mstore.gitbooks.io/mstore-manual/content/chapter5.html
     The default config for ProductSize is disable due to some problem config for most of users.
     If you have success config it from the Wordpress site, please enable to speed up the app performance
     - HorizonLayout: Change the HomePage horizontal layout - https://mstore.gitbooks.io/mstore-manual/content/chapter6.html
     */
  ProductSize: {
    enable: false,
    CatalogImages: { width: 300, height: 360 },
    SingleProductImage: { width: 600, height: 720 },
    ProductThumbnails: { width: 180, height: 216 },
  },

  /**
   * Step 3: Setting Home screen, category screen
   * Follow this article to use Graphql https://help.shopify.com/en/api/custom-storefronts/storefront-api/graphql
   * Video tutorial https://www.dropbox.com/s/m4kmp0quh8qplz3/Screen%20Recording%202018-11-05%20at%202.22.21%20PM.mov?dl=0
   */
  SpaceLayout: 15, // setting align right
  /**
   * config home page show
   * - horizontal with multi collection id or
   * - vertical layout with latest product and first product is banner
   */
  HomePage: {
    Horizon: true,
    PageSize: 12,
  },
  HorizonLayout: [
    {
      categoryId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyMTg1ODM4MQ==",
      paging: true,
      layout: Constants.Layout.miniBanner,
    },
    {
      name: "Feature Products",
      categoryId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQzOTA1MTUzMw==",
      layout: Constants.Layout.threeColumn,
    },
    {
      name: "Bags",
      categoryId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQzOTI0MjM4MQ==",
      layout: Constants.Layout.twoColumn,
    },
    {
      name: "Woman",
      categoryId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyMTg1ODg5Mw==",
      layout: Constants.Layout.twoColumnHigh,
    },
    {
      name: "Man",
      categoryId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyMTg1ODM4MQ==",
      layout: Constants.Layout.card,
    },
    {
      name: "News",
      type: "article",
      layoutType: "post", // "post" or "product" is default
      layout: Constants.Layout.threeColumn,
    },
  ],

  CategoryLayout: {
    ListMode: "ListMode",
    GridMode: "GridMode",
    CardMode: "CardMode",
  },

  /**
   * Now we only support Webview payment, so disable this feature
   * In the furture we will try support this feature
   */
  Payments: [
    {
      name: "Cash on Delivery",
      imageUrl: require("@images/payment_logo/cash_on_delivery.png"),
      enabled: true,
    },
    {
      type: "card",
      name: "Credit Card",
      imageUrl: require("@images/payment_logo/credit_card.png"),
      enabled: true,
    },
  ],

  /**
     Step 4: Advance config:
     - showShipping: option to show the list of shipping method
     - showStatusBar: option to show the status bar, it always show iPhoneX
     - LogoImage: The header logo
     - CustomPages: Update the custom page which can be shown from the left side bar (Components/Drawer/index.js)
     - intro: The on boarding intro slider for your app
     - menu: config for left menu side items (isMultiChild: This is new feature from 3.4.5 that show the sub products categories)
     * */

  shipping: {
    visible: true,
    time: {
      free_shipping: "4 - 7 Days",
      flat_rate: "1 - 4 Days",
      local_pickup: "1 - 4 Days",
    },
  },
  showStatusBar: true,
  LogoImage: settingData.logo_url,
  CustomPages: { contact_id: 10941 },

  /**
   * Config Menu Side Drawer
   * @param goToScreen 3 Params (routeName, params, isReset = false)
   * BUG: Language can not change when set default value in Config.js ==> pass string to change Languages
   */
  menu: {
    // has child categories
    isMultiChild: true,
    // Unlogged
    listMenuUnlogged: [
      {
        text: "Login",
        routeName: "Login",
        params: {
          isLogout: false,
        },
        icon: Icons.MaterialCommunityIcons.SignIn,
      },
    ],
    // user logged in
    listMenuLogged: [
      {
        text: "Logout",
        routeName: "Login",
        params: {
          isLogout: true,
        },
        icon: Icons.MaterialCommunityIcons.SignOut,
      },
    ],
    // Default List
    listMenu: [
      {
        text: "Shop",
        routeName: "Default",
        icon: Icons.MaterialCommunityIcons.Home,
      },
      {
        text: "About",
        routeName: "CustomPage",
        params: {
          url: "http://inspireui.com",
        },
        icon: Icons.MaterialCommunityIcons.Email,
      },
    ],
  },
};
