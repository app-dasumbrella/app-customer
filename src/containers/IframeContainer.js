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

    TouchableOpacity,

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
import { checkRootLang } from "../ultils/productOptions";
import { scontent } from "@services/Api";
import { WebView } from "react-native-webview";

const { width, height } = Styles.window;

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },


};

const commonInputProps = {
    style: styles.input,
    underlineColorAndroid: "transparent",
    placeholderTextColor: Color.blackTextSecondary,
};

const mapStateToProps = ({ netInfo, user, app }) => ({
    netInfo,
    app,
    language: app && app.language,
});

@withTheme
@withNavigation
@withTranslation()
@connect(mapStateToProps, { login, getUserInfo, changeLanguages })
export default class IframeContainer extends Component {


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
    onWebViewMessage = (event: WebViewMessageEvent) => {
        this.setState({ webViewHeight: Number(event.nativeEvent.data) })
    }

    render() {
        const { apps, app, changeLanguages, navigation, language } = this.props;
        let { theme, settings, content } = app || {};
        let { primaryColor } = theme || {};
        let { languages } = settings || {}
        let { selectedLang } = this.state
        const { t, i18n } = this.props;
        const item = this.props.navigation.getParam("item");
        let root = checkRootLang(languages, language, item)

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={{ height: this.state.webViewHeight }}
                    onMessage={this.onWebViewMessage}
                    injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

                    //style={{ marginHorizontal: 5 }}
                    source={{ uri: `${scontent}${root}` }}
                />


            </ScrollView>
        );
    }
}
