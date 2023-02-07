/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { login, getUserInfo, postReview, changeLanguages } from "@redux/operations";
import { Color, Languages, Styles, Config } from "@common";
import {
  ModalPhotos,
  AdMob,
  LayoutItem,
  ProductTitle,
  Rating,
  Button,
} from "@components";
import { withTranslation } from 'react-i18next';

const { width, height } = Styles.window;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },

  subContain: {
    marginTop: 10,
    paddingHorizontal: Styles.width * 0.1,
    paddingBottom: 50,
    marginBottom: 20,
  },
};

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: "transparent",
  placeholderTextColor: Color.blackTextSecondary,
};

const mapStateToProps = ({ netInfo, user, app }) => ({
  netInfo,
  userInfo: user.userInfo,
  isFetching: user.isFetching,
  error: user.error,
  apps: app,
  app: app && app.settings,
});

@withTheme
@withNavigation
@withTranslation()
@connect(mapStateToProps, { login, getUserInfo, changeLanguages })
export default class ReviewContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    onViewCartScreen: PropTypes.func,
    onViewHomeScreen: PropTypes.func,
    onViewSignUp: PropTypes.func,
    navigation: PropTypes.object,
    onBack: PropTypes.func,
  };

  constructor(props) {

    super(props);
    const { apps, app } = props;
    let { language } = apps || {};

    this.state = {
      username: "",
      password: "",
      rating: 3,
      Error: "",
      Sucess: false,
      selectedLang: language
    };
    this.messagesEndRef = React.createRef();
  }


  render() {
    const { apps, app, changeLanguages, navigation } = this.props;
    let { theme, languages, content } = app || {};
    let { primaryColor } = theme || {};
    let { language } = apps || {};
    let { selectedLang } = this.state
    const { t, i18n } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.subContain}>
            {languages?.map((items) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedLang: items
                  })
                }}
                style={{
                  paddingVertical: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 5,
                    fontWeight: "bold",
                    color: Color.blackTextSecondary
                  }}
                >
                  {items.label}
                </Text>

                {items.code == selectedLang?.code && <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    backgroundColor: "red",
                  }}
                ></View>}
              </TouchableOpacity>
            ))}
            <Button
              style={{
                backgroundColor: primaryColor,
                width: "100%",
                paddingVertical: 10,
                marginTop: 10,
              }}
              text={"Update"}
              type={"text"}
              onPress={() => {

                i18n.changeLanguage(selectedLang?.code)

                changeLanguages({
                  lang: selectedLang?.label,
                  code: selectedLang?.code,
                  rtl: false,
                  ...selectedLang
                });
                navigation.goBack()

              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
