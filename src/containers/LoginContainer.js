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
import { login, getUserInfo, register2 } from "@redux/operations";
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
@connect(mapStateToProps, { login, getUserInfo, register2 })
export default class LoginContainer extends Component {
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
  signIn = async () => {
    let { language, getUserInfo } = this.props || {}

    try {

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      this.props.register2(
        {
          fullName: userInfo.user.name,
          LoggedUser: true,
          auth_token: userInfo?.idToken,
          lang: language?.code,
          email: userInfo.user.email,
          password: userInfo.user.id,
          type: "google",
        },
        (data) => {
          console.log("Data", data, data.err, !data.err);
          if (!data.err) {
            getUserInfo({
              access_token: data.access_token,
              email: data.email,
              customer_id: data.data.id,
            });
            toast(`${Languages.SignInSuccess}, ${userInfo.user.name}`);
            this.props.navigation.goBack(null);
          } else {
            //console.log("SSSSSS");
            toast(data.msg);
          }
        }
      );
      //setUser(userInfo)
    } catch (error) {
      console.log("Message", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //console.log("Play Services Not Available or Outdated");
      } else {
        //console.log("Some Other Error Happened");
      }
    }
  };
  _onLoginPressHandle = async () => {
    const { username, password } = this.state;
    this.props.login(
      { email: username, password, LoggedUser: true },
      (data) => {
        console.log("Data", data);
        //console.log("Data", data, data.err, !data.err);
        if (!data.err) {
          this.props.getUserInfo({
            access_token: data.data.access_token,
            email: data.email,
            customer_id: data.data.id,
          });
          toast(`${Languages.SignInSuccess}, ${username}`);
          this.props.navigation.goBack(null);
        } else {
          //console.log("SSSSSS");
          toast(`Invalid Credentials`);
        }
      }
    );
  };

  componentDidMount() {
    GoogleSignin.configure({

      webClientId:
        "859300383159-0h45hfvdi6f5i5t36jrrnuv3212arbe0.apps.googleusercontent.com",
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }
  onSignUpHandle = () => {
    this.props.navigation.replace("Register");
  };

  fbLogin = () => {
    let { language, getUserInfo } = this.props || {}
    const responseInfoCallback = (error, response) => {
      // console.log(response, error, "SBBBBBBBBBBBBBBBB")
      if (error) {
        //console.log(error);
        toast(error?.toString())
        //console.log("Error fetching data: " + error.toString());
      } else {
        this.props.register2(
          {

            fullName: response.name,
            email: response.email,
            password: response.id,
            LoggedUser: true,
            auth_token: response.accessToken || response.id,
            type: "facebook",
            lang: language?.code
          },
          (data) => {
            console.log(data)
            if (data && data.err) {
              toast(data.msg);

              // toast(`${Languages.SignInSuccess}, ${username}`);
              //   setError(data?.msg);
            } else {
              toast(`${Languages.SignInSuccess}, ${response.name}`);
              getUserInfo({
                access_token: data.access_token,
                email: data.email,
                customer_id: data.data.id,
              });
              this.props.navigation.goBack(null);
            }
          }
        );
      }
    };
    LoginManager.logInWithPermissions(["public_profile", "email"])
      .then(
        (result) => {
          if (result.isCancelled) {
            //console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                const infoRequest = new GraphRequest(
                  "/me",
                  {
                    accessToken: data.accessToken,
                    parameters: {
                      fields: {
                        string: "email,name,picture.type(large)",
                      },
                    },
                  },
                  responseInfoCallback
                );
                new GraphRequestManager().addRequest(infoRequest).start();
              })
              .catch((err) => console.log(err));
            console.log("Login success with permissions: ", result);
          }
        },
        (error) => {
          //console.log("Login fail with error: " + error);
        }
      )
      .catch((error) => {
        //console.log(error);
      });
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
            <TouchableOpacity style={styles.fbcontainer} onPress={this.fbLogin}>
              <Image
                source={Images.fb}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <Text style={styles.fbtext}> Login With Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.google} onPress={this.signIn}>
              <Image
                source={Images.google}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <Text style={styles.googletext}> Sign in With Google</Text>
            </TouchableOpacity>

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
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.password = comp)}
                  placeholder={t("EnterPwd")}
                  onChangeText={this.onPasswordEditHandle}
                  secureTextEntry
                  returnKeyType="go"
                  value={password}
                />
              </View>

              {isFetching && <ActivityIndicator color={Color.spin} />}
              <ButtonIndex
                text={t("SIGN_IN")}
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
              onPress={() => this.props.navigation.push("ForgetPScreen")}
            >
              <Text style={styles.signUp}>
                <Text style={styles.highlight(theme)}>   {t("ForgotPwd")}</Text>
              </Text>
            </TouchableOpacity>
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
                {t("DONTHAVEACCOUNT")}
                <Text style={styles.highlight(theme)}>   {t("SIGN_UP")}</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
