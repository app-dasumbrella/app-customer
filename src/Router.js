/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React, { Component } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Config, Device, Styles, Tools } from "./common";
import { SafeAreaView } from "react-navigation";
import Navigation from "./navigation";
import { connect } from "react-redux";
import { initialApp } from "./redux/operations";
import { toast, closeDrawer } from "./Omni";
//import ExternalChat from "@components/ExternalChat";
import MessageIco from "./components/MessageIcon";
import LanguageChanger from "./components/LanguageChanger";
import LeftMenuContainer from "./containers/LeftMenuContainer";
import MyNetInfoContainer from "./containers/MyNetInfoContainer";
import MyToastContainer from "./containers/MyToastContainer";

const mapStateToProps = ({ user, app }) => ({
  shopify: app.shopify,
  userInfo: user.userInfo,
  external: app?.settings?.settings?.chat?.external,
  erp: app?.settings?.settings?.chat?.erp
});

@connect(mapStateToProps, { initialApp })
export default class Router extends Component {
  constructor(props) {
    super(props);
    let { userInfo } = props || {};
    const name = Tools.getName(userInfo);

    this.state = {
      showoptions: false,
      chatshow: false,
      messages: [],
      name: name || "",
      message: "",
      email: userInfo && userInfo.email ? userInfo.email : "",
      roomstarted: false,
    };
    this.messagesEndRef = React.createRef();

    //    this.socket = io("http://3e48-117-223-49-8.ngrok.io");
  }

  componentDidMount() {
    // this.socket.on("message", (data) => {
    //   //console.log(data);
    //   let messages = this.state.messages;
    //   messages.push({
    //     userId: data.userId,
    //     username: data.username,
    //     text: data.text,
    //   });

    //   this.setState({
    //     messages,
    //   });
    //   //console.log(messages, "messages");
    //   // this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // });
  }
  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }
    this.navigator.dispatch({ type: "Navigation/PUSH", routeName, params });
    closeDrawer();
  };
  shouldComponentUpdate() {
    return true;
  }

  // startroom = () => {
  //   this.socket.emit("joinRoom", {
  //     username: this.state.name,
  //     roomname: "customer",
  //     service: this.state.service,
  //     roomId: `${this.state.name} ${+new Date()}`,
  //     email: this.state.email,
  //     message: this.state.message,
  //   });
  //   this.setState({ message: "",err:'' });
  // };
  // sendMsg = () => {
  //   if (this.state.message !== "") {
  //     //encrypt the message here
  //     // const ans = to_Encrypt(text);
  //     this.socket.emit("chat", this.state.message);
  //     this.setState({ message: "" });
  //   }
  // };

  renderItem = ({ item }) => {
    //console.log("SSS", item);
    let { width, height } = Dimensions.get("window");
    let { userInfo } = this.props || {};
    const name = Tools.getName(userInfo);
    return (
      <View
        style={[
          {
            maxWidth: "70%",
            marginVertical: 2,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
          },
          item.username != name
            ? { backgroundColor: "#dfdfdf", alignSelf: "flex-start" }
            : { backgroundColor: "#0cc6de", alignSelf: "flex-end" },
        ]}
      >
        <Text
          style={[
            { fontSize: 13 },
            item.username !== name ? {} : { color: "white" },
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  validate = () => {
    if (this.state.name.length == 0) {
      this.setState({ err: "Enter your name" });
      return false;
    }
    if (this.state.message.length == 0) {
      this.setState({ err: "Enter email address" });
      return false;
    }
    if (this.state.email.length == 0) {
      this.setState({ err: "Enter message" });
      return false;
    }
    return true;
  };
  render() {
    let { width, height } = Dimensions.get("window");
    let { userInfo, erp, external, navigation } = this.props || {};
    const name = Tools.getName(userInfo);
    let { err, showoptions, showchat, messages, roomstarted, service } =
      this.state;
    return (
      <LeftMenuContainer
        goToScreen={this.goToScreen}
        type="wide" // default type sidemenu typeof "overlay", "small", "wide", default "scale"
        routes={
          <SafeAreaView
            forceInset={{ top: "never" }}
            style={{ flex: 1, backgroundColor: "#fff" }}
          >
            <View style={Styles.Common.appContainer}>
              <StatusBar
                hidden={Device.isIphoneX ? false : !Config.showStatusBar}
              />
              <Navigation ref={(comp) => (this.navigator = comp)} />
              <MyToastContainer />
              <MyNetInfoContainer />

              {erp == 1 && <MessageIco />}
              <LanguageChanger />
            </View>
          </SafeAreaView>
        }
      />
    );
  }
}
