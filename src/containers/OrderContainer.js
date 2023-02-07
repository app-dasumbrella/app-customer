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
import { login, getUserInfo } from "../../redux/operations";
import { Color, Languages, Styles, Config } from "../common";
import { toast } from "../Omni";
import { ButtonIndex } from "../components";

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import Images from "../common/Images";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Spinkit } from "../components";
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

const mapStateToProps = ({ netInfo, user }) => ({
  netInfo,
  userInfo: user.userInfo,
  isFetching: user.isFetching,
  error: user.error,
});

@withTheme
@withNavigation
@connect(mapStateToProps, { login, getUserInfo })
export default class OrderContainer extends Component {
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
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log(userInfo.user);
      this.props.login(
        {
          email: userInfo.user.email,
          password: userInfo.user.id,
          logintype: "google",
        },
        (data) => {
          //console.log("Data", data, data.err, !data.err);
          if (!data.err) {
            toast(`${Languages.SignInSuccess}, ${userInfo.user.name}`);
            this.props.navigation.goBack(null);
          } else {
            //console.log("SSSSSS");
            toast(`Invalid Credentials`);
          }
        }
      );
      //setUser(userInfo)
    } catch (error) {
      //console.log("Message", error);
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
      { email: username, password, logintype: "email" },
      (data) => {
        //console.log("Data", data);
        //console.log("Data", data, data.err, !data.err);
        if (!data.err) {
          this.props.getUserInfo({
            access_token: data.access_token,
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
      androidClientId:
        "372689521912-nvppq1gnkgn9vt44h9tgjrfv3jia6gb0.apps.googleusercontent.com",
      webClientId:
        "372689521912-ntbsiv6os8egu5nvn2bliv9of7ap6t5r.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    //console.log("Dd");
  }
  onSignUpHandle = () => {
    this.props.navigation.replace("Register");
  };

  fbLogin = () => {
    const responseInfoCallback = (error, result) => {
      if (error) {
        //console.log(error);
        //console.log("Error fetching data: " + error.toString());
      } else {
        this.props.login(
          {
            email: result.email,
            password: result,
            logintype: "facebook",
          },
          (data) => {
            if (data) {
              toast(`${Languages.SignInSuccess}, ${result.name}`);
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
              .catch((err) => //console.log(err));
             //console.log("Login success with permissions: ", result);
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
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoTitle}> Origin MY</Text>
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
                  placeholder={Languages.UserOrEmail}
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
                  placeholder={Languages.password}
                  onChangeText={this.onPasswordEditHandle}
                  secureTextEntry
                  returnKeyType="go"
                  value={password}
                />
              </View>

              {isFetching && <ActivityIndicator color={Color.spin} />}
              <ButtonIndex
                text={Languages.Login.toUpperCase()}
                containerStyle={styles.loginButton(theme)}
                onPress={this._onLoginPressHandle}
                isLoading={isFetching}
              />
            </ScrollView>
            <View style={styles.separatorWrap}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>{Languages.Or}</Text>
              <View style={styles.separator} />
            </View>
            <TouchableOpacity
              style={Styles.Common.ColumnCenter}
              onPress={this.onSignUpHandle}
            >
              <Text style={styles.signUp}>
                {Languages.DontHaveAccount}
                <Text style={styles.highlight(theme)}>{Languages.signup}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
