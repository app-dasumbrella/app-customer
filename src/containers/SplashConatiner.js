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
import { login, handleChangeStore } from "@redux/operations";
import { Color, Languages, Styles, Config } from "@common";
import { toast } from "@app/Omni";
import { ButtonIndex } from "@components";
import { Spinner } from "@components";

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

const mapStateToProps = ({ netInfo, user, app }) => ({
  netInfo,
  userInfo: user.userInfo,
  isFetching: user.isFetching,
  error: user.error,
  app
});

@withTheme
@withNavigation
@connect(mapStateToProps, { login, handleChangeStore })
export default class SplashConatiner extends Component {

  constructor(props) {
    super(props);

  }
  componentWillMount() {
    this.props.navigation.replace('Tab')
      // this.props.handleChangeStore( this.props.app,(err)=>{

      //     this.props.navigation.replace('Tab')
      //  })
      ;
    //  this._fetchAll();
  }



  render() {

    return (
      <KeyboardAvoidingView>

      </KeyboardAvoidingView>
    );
  }
}
