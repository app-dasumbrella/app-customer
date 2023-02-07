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
import { login, getUserInfo, register2, requestReset } from "@redux/operations";
import { Color, Languages, Config } from "@common";
import Styles from '../common/Styles'
import { toast } from "../Omni";
import { ButtonIndex } from "@components";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import Images from "@common/Images";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { t } from "i18next";

const { width, height } = Styles.window;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  logoWrap: {
    ...Styles.Common.ColumnCenter,
    flexGrow: 0.55,
  },
  fbcontainer: {
    flexDirection: "row",
    paddingHorizontal: "10%",
    paddingVertical: 12,

    marginBottom: 30,
    backgroundColor: Color.facebook,
    borderRadius: 5,
    elevation: 1,
  },
  google: {
    flexDirection: "row",
    paddingHorizontal: "10%",
    paddingVertical: 12,

    marginBottom: 30,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 2,
  },
  logo: {
    width: 200,
    height: (Styles.width * 0.8) / 2,
  },
  subContain: {
    paddingHorizontal: Styles.width * 0.1,
    paddingBottom: 50,
  },
  loginForm: {},
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.blackTextDisable,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    color: Color.blackTextPrimary,
    borderColor: "#9B9B9B",
    height: 44,
    padding: 10,
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    letterSpacing: 1,
    fontSize: 15,
  },
  loginButton: (theme) => ({
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: theme.primaryColor,
    elevation: 1,
  }),
  separatorWrap: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: Color.blackTextDisable,
  },
  separatorText: {
    color: Color.blackTextDisable,
    paddingHorizontal: 10,
  },
  fbButton: {
    backgroundColor: Color.facebook,
    borderRadius: 5,
    elevation: 1,
  },
  signUp: {
    color: Color.blackTextSecondary,
    letterSpacing: 0.8,
  },
  highlight: (theme) => ({
    fontWeight: "bold",
    color: theme.primaryColor,
  }),
  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  fbtext: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 13,
    fontSize: 18,
  },
  googletext: {
    fontWeight: "bold",
    color: Color.blackTextSecondary,
    marginLeft: 13,
    fontSize: 18,
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: Color.blackTextSecondary,
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
  app: app && app.settings,
  language: app?.language


});

@withTheme
@withNavigation
@connect(mapStateToProps, { login, getUserInfo, register2, requestReset })
export default class ForgetPContainer extends Component {
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
    this.state = {
      username: "",
      password: "",
    };

    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error !== this.props.error) {
      toast(Languages.SignInError);
    }
  }

  _onLoginPressHandle = async () => {
    const { username, password } = this.state;
    const user = {
      email: username,
      lang: this.props.language?.code
    };
    this.props.requestReset(user, (data) => {
      toast(data?.msg)
      if (data.err) {
        //this.setState({ error: data?.msg });
      } else {
        //this.setState({ msg: data.msg });
        setTimeout(() => {
          this.props.navigation.goBack()
        }, 5000);
      }
    });
  };

  componentDidMount() {

  }
  onSignUpHandle = () => {
    this.props.navigation.replace("Login");
  };



  checkConnection = () => {
    const { netInfo } = this.props;
    if (!netInfo.isConnected) toast(Languages.noConnection);
    return netInfo.isConnected;
  };

  render() {
    const { isFetching, theme } = this.props;
    const { username, password } = this.state;
    const { app } = this.props;
    const { primaryColor } = app?.theme || {}

    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoTitle}> {app?.name} </Text>
          </View>

          <View style={styles.subContain}>



            <ScrollView style={styles.loginForm}>
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.username = comp)}
                  placeholder={t("ENTER_EMAIL")}
                  keyboardType="email-address"
                  onChangeText={this.onUsernameEditHandle}
                  onSubmitEditing={this.focusPassword}
                  returnKeyType="next"
                  value={username}
                />
              </View>

              {isFetching && <ActivityIndicator color={Color.spin} />}
              <ButtonIndex
                text={t("ResetPwd")}
                containerStyle={[styles.loginButton(theme), { backgroundColor: primaryColor }]}
                onPress={this._onLoginPressHandle}
                isLoading={isFetching}
              />
            </ScrollView>
            <View style={styles.separatorWrap}>
              <View style={styles.separator} />
              {/* <Text style={styles.separatorText}>{Languages.Or}</Text> */}
              <View style={styles.separator} />
            </View>
            <TouchableOpacity
              style={Styles.Common.ColumnCenter}
              onPress={this.onSignUpHandle}
            >
              <Text style={styles.signUp}>
                {t("ALREADYACCOUNT")}{" "}
                <Text style={styles.highlight(theme)}>{t("SIGN_IN")}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
