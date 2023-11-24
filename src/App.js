/** @format */

import React from "react";
import { ThemeProvider } from "@callstack/react-theme-provider";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
// import { initializeAndTestStore } from "@services/initializeStore";
import store from "./store/configureStore";
import { Color } from "./common";
import RootRouter from "./Router";

// // import { handleChangeStore, getUserInfo } from "@redux/operations";
// // import { connect } from "react-redux";
import './ultils/i18nextConf'
// function cacheImages(images) {
//   return images.map((image) => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     }
//     return Asset.fromModule(image).downloadAsync();
//   });
// }

// function cacheFonts(fonts) {
//   return fonts.map((font) => Font.loadAsync(font));
// }


export const persistor = persistStore(store);

console.ignoredYellowBox = [
  "Warning: View.propTypes",
  "Require cycle:",
];



export default class App extends React.Component {
  state = {
    appIsReady: false,
    primaryColor: Color.primary,
    isNewStore: false,
  };

  componentDidMount() {
    // initializeStore = () => {
    //   // initializeAndTestStore()
    //   //   .then((store) => {
    //   //     this.setState({
    //   //       primaryColor: store.shopify.primaryColor,
    //   //       isNewStore: store.isNewStore,
    //   //       appIsReady: true,
    //   //     });
    //   //   })
    //   //   .catch((error) => {
    //   //     this.setState({ appIsReady: true });

    //   //   });
    // };

  }



  render() {

    const Theme = {
      primaryColor: Color.primary,
    };

    // //console.log("Theme", Theme);

    return (
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootRouter persistor={persistor} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}

