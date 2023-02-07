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
import { login, getUserInfo } from "../redux/operations";
import { Color, Languages, Styles, Config } from "../common";



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
export default class ContactusContainer extends Component {
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
    this.messagesEndRef = React.createRef();

    this.socket = ''//io("http://0edc-117-241-251-166.ngrok.io");
    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }

  componentDidMount() {
    this.socket.on("message", (data) => {
      //console.log(data);
      let messages = this.state.messages;
      messages.push({
        userId: data.userId,
        username: data.username,
        text: data.text,
      });
      this.setState({
        messages,
      });
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }
  render() {
    const { isFetching, theme } = this.props;
    const { username, password } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.subContain}>
            <TouchableOpacity
              style={styles.google}
              onPress={() => {
                this.setState({ toggled: false, chat: true });
                this.socket.emit("joinRoom", {
                  username: "Akash",
                  roomname: "customer",
                  service: "sales",
                  roomId: +new Date(),
                });
                this.setState({ service: "sales" });
                this.props.startChat();
              }}
            >
              <Text style={styles.googletext}> New Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.google}
              onPress={() => {
                this.setState({ toggled: false, chat: true });
                this.socket.emit("joinRoom", {
                  username: "Akash",
                  roomname: "customer",
                  service: "inquiry",
                  roomId: +new Date(),
                });
                this.setState({ service: "inquiry" });
                this.props.startChat();
              }}
            >
              <Text style={styles.googletext}> Returning Customer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
