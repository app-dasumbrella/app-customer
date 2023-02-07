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
import { login, getUserInfo, postReview } from "@redux/operations";
import { Color, Languages, Styles, Config } from "@common";

import {
  ModalPhotos,
  AdMob,
  LayoutItem,
  ProductTitle,
  Rating,
  Button,
} from "@components";
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
    marginTop: 10,
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
    height: 100,
    padding: 10,
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    letterSpacing: 1,
    fontSize: 15,
    textAlignVertical: "top",
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
});

@withTheme
@withNavigation
@connect(mapStateToProps, { login, getUserInfo, postReview })
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
    this.state = {
      username: "",
      password: "",
      rating: 3,
      Error: '',
      Sucess: false
    };
    this.messagesEndRef = React.createRef();

    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }

  componentDidMount() { }
  render() {
    const { isFetching, userInfo, app, postReview, route } = this.props;
    const { username, password, rating, Error, Sucess } = this.state;
    let { theme } = app || {};
    let { numberFormat, primaryColor, shop, secondaryColor, review } =
      theme || {};
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView contentContainerStyle={styles.container}>
          {!Sucess && <View style={styles.subContain}>
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Name</Text>
            <Text style={{ marginBottom: 10, fontWeight: "500" }}>
              {userInfo?.data?.name}
            </Text>

            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Email</Text>
            <Text style={{ marginBottom: 10, fontWeight: "500" }}>
              {userInfo?.email}
            </Text>

            <Text style={{ marginVertical: 5, fontWeight: "bold" }}>
              Rating
            </Text>

            <Rating
              notdisable={true}
              style={{ alignSelf: "flex-start" }}
              rating={Number(rating)}
              size={22}
              onPress={(e) => {
                this.setState({ rating: e });
              }}
            />
            <Text
              style={{ marginTop: 5, marginBottom: 5, fontWeight: "bold", marginTop: 10 }}
            >
              How was your overall experience?
            </Text>
            <View style={styles.inputWrap}>
              <TextInput
                {...commonInputProps}
                ref={(comp) => (this.username = comp)}
                placeholder={""}
                keyboardType="email-address"
                onChangeText={this.onUsernameEditHandle}
                onSubmitEditing={this.focusPassword}
                returnKeyType="next"
                value={username}
                multiline={true}
              />
            </View>
            {Error?.length != 0 && (
              <Text
                style={{ marginBottom: 5, fontWeight: "bold", color: 'red' }}
              >
                {Error}
              </Text>
            )}

            <Button
              style={{
                backgroundColor: primaryColor,
                width: "100%",
                paddingVertical: 10,
                marginTop: 10,
              }}
              text={"Submit"}
              type={"text"}
              onPress={() => {
                if (username?.length != 0) {
                  this.setState({ Error: "" });

                  postReview(
                    {
                      access_token: userInfo && userInfo.access_token,
                      email: userInfo?.email,
                      customer_id:
                        userInfo && userInfo.data && userInfo.data.id,
                      name: userInfo?.data?.name,
                      product: this.props.navigation?.state?.params?.productid,
                      description: username,
                      rating: rating,
                    },
                    (e) => {
                      this.setState({ Sucess: true })
                    }
                  );
                } else {
                  this.setState({ Error: "Too short review" });
                }
              }}
            />
          </View>}

          {Sucess && <View style={styles.subContain}>
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}> Review submitted for moderation successfully.


            </Text>
            <Button
              style={{
                backgroundColor: primaryColor,
                width: "100%",
                paddingVertical: 10,
                marginTop: 10,
              }}
              text={"Okay"}
              type={"text"}
              onPress={() => {
                this.props.navigation.pop()
              }}
            />
          </View>}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
