import React, { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


const LanguageChanger = (props) => {
  let { app } = props || {};
  let { settings, language } = app || {};
  let { content } = settings || { static: false };
  let { i18n } = useTranslation()

  useEffect(() => {

    if (language?.code) {
      if (i18next.language != language?.code) {
        i18n.changeLanguage(language?.code);
      }
      i18next?.addResourceBundle(
        language?.code,
        "translation",
        content?.static
      );
    } else {
      i18next?.addResourceBundle(
        language?.code || "en",
        "translation",
        content?.static
      );
    }
  }, []);
  useEffect(() => {
    if (language?.code) {
      i18next?.addResourceBundle(
        language?.code,
        "translation",
        content?.static
      );
    } else {
      i18next?.addResourceBundle(
        language?.code || "en",
        "translation",
        content?.static
      );
    }
  }, [content?.static]);

  return <View></View>;
}

const mapStateToProps = ({ user, carts, app }) => ({
  carts,
  userInfo: user.userInfo,
  isFetching: user.isFetching,
  error: user.error,
  app,
  loginmodals: app.loginmodals,
  appset: app && app.settings,
  totalPrice: carts.totalPrice,
  cartItems: carts.cartItems,
  inits: app.inits,
});

export default connect(mapStateToProps, null)(LanguageChanger);
