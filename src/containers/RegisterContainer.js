/**
 * Created by InspireUI on 01/03/2017.
 *
 * @format
 */

import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  Image,
  I18nManager,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { withTheme } from "@callstack/react-theme-provider";
import { register, register2 } from "@redux/operations";
import { Languages, Color, Config, Styles } from "@common";
import { toast, error, Validate } from "../Omni";
import { ButtonIndex } from "@components";
import { connect } from "react-redux";
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

const mapStateToProps = (state) => {
  return {
    netInfoConnected: state.app.netInfoConnected,
    isFetching: state.user.isFetching,
    app: state.app && state.app.settings,

  };
};

@withTheme
@connect(
  mapStateToProps,
  { register, register2 }
)
export default class RegisterContainer extends Component {
  constructor(props) {
    super(props);

    let state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      useGeneratePass: false,
    };

    const params = props.params;
    if (params && params.user) {
      state = { ...state, ...params.user, useGeneratePass: true };
    }

    this.state = state;

    this.onFirstNameEditHandle = (firstName) => this.setState({ firstName });
    this.onLastNameEditHandle = (lastName) => this.setState({ lastName });
    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onEmailEditHandle = (email) => this.setState({ email });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.onPasswordSwitchHandle = () =>
      this.setState({ useGeneratePass: !this.state.useGeneratePass });

    this.focusLastName = () => this.lastName && this.lastName.focus();
    this.focusUsername = () => this.username && this.username.focus();
    this.focusEmail = () => this.email && this.email.focus();
    this.focusPassword = () =>
      !this.state.useGeneratePass && this.password && this.password.focus();
  }
  onSignUpHandle = () => {
    this.props.navigation.replace("Login");
  };
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.props.register(
        {
          email: userInfo.user.email,
          password: userInfo.user.id,
          fullName: userInfo.user.name,

        },
        (data) => {
          //console.log("Data", data);
          if (data) {
            toast(`${Languages.SignInSuccess}, ${userInfo.user.name}`);
            this.props.navigation.goBack(null);
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

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        "859300383159-0h45hfvdi6f5i5t36jrrnuv3212arbe0.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }


  fbLogin = () => {
    const responseInfoCallback = (error, result) => {
      if (error) {
        //console.log(error);
        //console.log("Error fetching data: " + error.toString());
      } else {
        this.props.register(
          {
            email: result.email,
            password: result,
            fullName: firstName,

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
  _onSignUpHandle = () => {
    const { netInfoConnected } = this.props;
    if (!netInfoConnected) return toast(Languages.noConnection);

    const {
      username,
      email,
      firstName,
      lastName,
      password,
      useGeneratePass,
    } = this.state;

    if (email.length != 0 || firstName.length != 0 || password.length != 0) {
      const user = {
        email,
        fullName: firstName,
        password,
        LoggedUser: true,
        auth_token: "00",
        type: "signup",
      };
      this.props.register2(user, (data) => {
        console.log(data)
        if (data && data.err) {
          toast(Languages.SignUpSuccess);
          this.props.navigation.goBack(null);
        } else {
          toast(data?.msg)
        }
      });
    } else {
      toast(Languages.EmptyError);
    }
  };

  validateForm = () => {
    const {
      email,
      password,
      firstName,
      lastName,
      useGeneratePass,
    } = this.state;
    if (
      Validate.isEmpty(
        email,
        firstName,
        lastName,
        useGeneratePass ? "1" : password
      )
    ) {
      // check empty
      return "Please complete the form";
    } else if (!Validate.isEmail(email)) {
      return "Email is not correct";
    }
    return undefined;
  };

  stopAndToast = (msg) => {
    toast(msg);
    error(msg);
  };

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      useGeneratePass,
    } = this.state;
    const { isFetching, theme } = this.props;
    const params = this.props.params;
    const { app } = this.props;
    const { primaryColor } = app?.theme || {}
    return (
      <KeyboardAvoidingView style={styles.container} >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoTitle}> {app?.name} </Text>
          </View>
          <View style={styles.subContain}>
            {/* <TouchableOpacity style={styles.fbcontainer} onPress={this.fbLogin}>
              <Image
                source={Images.fb}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <Text style={styles.fbtext}> Sign up With Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.google} onPress={this.signIn}>
              <Image
                source={Images.google}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <Text style={styles.googletext}> Sign up With Google</Text>
            </TouchableOpacity> */}

            <View style={styles.formContainer}>
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.firstName = comp)}
                  placeholder={"Full Name"}
                  onChangeText={this.onFirstNameEditHandle}
                  onSubmitEditing={this.focusLastName}
                  autoCapitalize="words"
                  returnKeyType="next"
                  value={firstName}
                />
              </View>
              {/* <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.lastName = comp)}
                placeholder={Languages.lastName}
                onChangeText={this.onLastNameEditHandle}
                onSubmitEditing={this.focusUsername}
                autoCapitalize="words"
                returnKeyType="next"
                value={lastName}
              />
            </View> */}
              {/* <View style={styles.inputWrap}>
            <TextInput
              {...commonInputProps}
              ref={(comp) => (this.username = comp)}
              placeholder={Languages.username}
              onChangeText={this.onUsernameEditHandle}
              onSubmitEditing={this.focusEmail}
              autoCapitalize="none"
              returnKeyType="next"
              value={username}
            />
          </View> */}
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.email = comp)}
                  placeholder={t("ENTER_EMAIL")}
                  onChangeText={this.onEmailEditHandle}
                  onSubmitEditing={this.focusPassword}
                  keyboardType="email-address"
                  returnKeyType={useGeneratePass ? "done" : "next"}
                  value={email}
                />
              </View>
              {params && params.user ? (
                <View style={styles.switchWrap}>
                  <Switch
                    value={useGeneratePass}
                    onValueChange={this.onPasswordSwitchHandle}
                    thumbTintColor={Color.accent}
                    onTintColor={Color.accentLight}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: useGeneratePass
                          ? Color.accent
                          : Color.blackTextSecondary,
                      },
                    ]}>
                    {Languages.generatePass}
                  </Text>
                </View>
              ) : null}
              {useGeneratePass ? (
                <View />
              ) : (
                <View style={styles.inputWrap}>
                  <TextInput
                    {...commonInputProps}
                    ref={(comp) => (this.password = comp)}
                    placeholder={t("EnterPwd")}
                    onChangeText={this.onPasswordEditHandle}
                    secureTextEntry
                    returnKeyType="done"
                    value={password}
                  />
                </View>
              )}
              <ButtonIndex
                containerStyle={[styles.signUpButton(theme), { backgroundColor: primaryColor }]}
                text={Languages.signup.toUpperCase()}
                onPress={this._onSignUpHandle}
                isLoading={false}
              />
            </View>
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

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: Color.background,
  },
  formContainer: {
    paddingHorizontal: Styles.width * 0.1,
  },
  logoWrap: {
    ...Styles.Common.ColumnCenter,
    flexGrow: 0.55,
  },
  logo: {
    width: 200,
    height: (Styles.width * 0.8) / 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: Styles.FontSize.medium,
    color: Color.blackTextPrimary,
    marginTop: 20,
  },
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
  signUpButton: (theme) => ({
    marginTop: 20,
    backgroundColor: theme.primaryColor,
    elevation: 1,
  }),
  switchWrap: {
    ...Styles.Common.RowCenterLeft,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextSecondary,
  },
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
