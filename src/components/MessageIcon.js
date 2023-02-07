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
import { Images, Device, Styles, Tools } from "../common";
import { connect } from "react-redux";
import { toast, closeDrawer } from "../Omni";
//import AndroidKeyboardAdjust from "react-native-android-keyboard-adjust";
import {
  login,
  register,
  handleChangeStore,
  getUserInfo,
  setModals,
  storeChatlist,
  getmessages,
} from "../redux/operations";
const mapStateToProps = ({ user, app, chat }) => ({
  shopify: app.shopify,
  userInfo: user.userInfo,
  chat,
  chatlist: app.chatlist,
});

@connect(mapStateToProps, {
  storeChatlist,
  register,
  handleChangeStore,
  getUserInfo,
  setModals,
  login,
  setModals,
  getmessages
})
export default class MessageIco extends Component {
  constructor(props) {
    super(props);
    let { userInfo, access_token } = props || {};
    const name =
      userInfo && userInfo.data && userInfo.data.name ? userInfo.data.name : "";
    this.state = {
      toggled: false,
      showoptions: false,
      chatshow: false,
      lader: false,
      messages: [
        {
          username: "",
          message: `Hey ${name}, how can we help you today?`,
          type: "re",
        },
      ],
      name: name || "",
      email: userInfo && userInfo.email ? userInfo.email : "",
      roomstarted: true,
      chatID: "",
      list: true,
      showsend: false,
    };
    this.messagesEndRef = React.createRef();
    //  AndroidKeyboardAdjust.setAdjustResize();

  }

  componentDidMount(props) {
    let link = ".dev.originmattress.com.my"
    this.socket = new WebSocket(`wss://chat${link}`);
    this.socket.onopen = () => { };
    let { userInfo, access_token } = props || {};
    const name = userInfo && userInfo.name ? userInfo.name : "";

    this.socket.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      console.log(message);
      if (message.action == "new") {
        if (message.success) {
          this.setState({
            chatID: message.data.chatID,
            available: message.data.available,
          });
          let messages = this.state.messages;

          messages.push({
            // userId: data.userId,

            message: message.msg,
          });
          this.setState({
            messages,
          });
          // this.messagesEndRef &&
          //   this.messagesEndRef.current &&
          //   this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (message.action == "message") {
        if (message.success) {
          this.setState({
            chatID: message.data.chatID,
            available: message.data.available,
          });
          let messages = this.state.messages;

          messages.push({
            // userId: data.userId,
            type: message.data.ack,
            message: message.msg,
          });
          this.setState({
            messages,
          });
          // this.messagesEndRef &&
          //   this.messagesEndRef.current &&
          //   this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
  }

  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }
    this.navigator.dispatch({ type: "Navigation/NAVIGATE", routeName, params });
    closeDrawer();
  };
  // shouldComponentUpdate() {
  //   return true;
  // }

  startroom = () => {
    let { userInfo, login } = this.props || {};
    let { access_token } = userInfo || {};
    if (access_token) {
      this.startChat();
    } else {
      login(
        {
          fullName: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        (data) => {
          if (data.err) {
            this.startChat();
          }
        }
      );
    }
  };
  sendMsg = () => {
    let { userInfo } = this.props || {};
    let { access_token, email } = userInfo || {};
    this.socket.send(
      JSON.stringify({
        action: "message",
        access_token: access_token,
        email: this.state.email,
        message: this.state.text,
        name: this.state.name,
        chatID: this.state.chatID,
      })
    );
    this.setState({
      text: "",
    });
  };

  renderItem = ({ item }) => {
    console.log("SSS", item);
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
          item.sender === name ||
            (item && item.type == "sender")
            ? { backgroundColor: "#0cc6de", alignSelf: "flex-end" }
            : { backgroundColor: "#dfdfdf", alignSelf: "flex-start" },
        ]}
      >
        <Text
          style={[
            { fontSize: 13 },
            item.sender !== name ? {} : { color: "white" },
          ]}
        >
          {item.message}
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

  startChat = () => {
    let { userInfo } = this.props || {};
    let { access_token } = userInfo || {};

    // on connecting, do nothing but log it to the console
    this.socket.send(
      JSON.stringify({
        action: "new",
        access_token: access_token,
        email: this.state.email,
        message: this.state.text,
      })
    );
    //   this.socket.onmessage((data) => {
    //     console.log(data);
    //     let messages = this.state.messages;
    //     // messages.push({
    //     //   userId: data.userId,
    //     //   username: data.username,
    //     //   text: data.text,
    //     // });
    //     // this.setState({
    //     //   messages,
    //     // });
    //     this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //   });
    this.setState({
      messages: [
        {
          username: this.state.name,
          message: this.state.text,
          type: "sender",
        },
      ],
    });

    this.setState({ text: "", err: "" });
  };

  toggleMenu() {
    let { userInfo, setModals } = this.props || {};
    let { access_token, email, LoggedUser } = userInfo || {};
    let { started } = this.props.chat || {};
    if (LoggedUser) {
      console.log(this.state.toggled, 'this.state.toggled')
      if (!this.state.toggled) {
        console.log(this.state.list, email, access_token, 'this.state.list')

        if (this.state.list && userInfo) {
          try {
            this.props.storeChatlist({ email, access_token }, (l) => {

              if (l && l.chatList && l.chatList.length == 0) {
                this.setState({ list: false, showsend: true });
              } else {
                if (l && l.l && l.l.chatList && l.l.chatList.length != 0) {
                  let full = l && l.l && l.l.chatList.filter((p) => p.status == "open");

                  console.log(full, "jsjssjsj");

                  if (full.length == 0)
                    this.setState({ list: false, showsend: false });
                  else this.setState({ list: true, showsend: false });
                } else {
                  this.setState({ showsend: true });
                }
              }
              // this.messagesEndRef &&
              //   this.messagesEndRef.current &&
              //   this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            });
          } catch (err) {
            console.log(err, 'erer')
          }
        }
      }
      // if (!started)
      //   this.setState({
      //     toggled: !this.state.toggled,
      //     chat: !this.state.toggled && this.state.chat ? false : this.state.chat,
      //   });
      // else
      this.setState({
        chat: !this.state.chat,
      });
    } else {
      this.setState({
        chat: !this.state.chat,
      });
      // this.props?.navigation?.navigate("Login");
    }
  }

  render() {
    let { width, height } = Dimensions.get("window");
    let { userInfo, chatlist, getmessages } = this.props || {};
    let { access_token } = userInfo || {};
    let { email, err, list, chat, messages, roomstarted, showsend, service } = this.state;
    return (
      <View>
        {chat && (
          <View
            style={{
              backgroundColor: "#fff",
              elevation: 4,
              position: "absolute",
              left: 10,
              bottom: 80,
              alignItems: "center",
              height: height * 0.7,
              width: width * 0.8,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0cc6de",
                paddingVertical: 10,
                width: "100%",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#104950" }}>
                {service != "inquiry"
                  ? "Online Assistance"
                  : "Returning Customer"}
              </Text>

              <TouchableOpacity
                onPress={() => this.setState({ chat: false })}
                style={{
                  position: "absolute",
                  right: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#104950",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
            </View>
            {!userInfo && (
              <View>
                {/* <Text
                  style={{
                    marginVertical: 5,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  Your name
                </Text>
                <TextInput
                  onFocus={() => {
                    AndroidKeyboardAdjust.setAdjustPan();
                  }}
                  placeholder={"Enter Full name"}
                  value={this.state.name}
                  style={{
                    width: width * 0.7,
                    height: 45,
                    borderWidth: 0.2,
                    marginRight: 5,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => this.setState({ name: text })}
                />

                <Text
                  style={{
                    marginTop: 10,
                    marginVertical: 5,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  Email address
                </Text>
                <TextInput
                  onFocus={() => {
                    AndroidKeyboardAdjust.setAdjustPan();
                  }}
                  placeholder={"Enter Email address"}
                  value={this.state.email}
                  style={{
                    width: width * 0.7,
                    height: 45,
                    borderWidth: 0.2,
                    marginRight: 5,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => this.setState({ email: text })}
                />

                <Text
                  style={{
                    marginTop: 10,
                    marginVertical: 5,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  How can we help you?
                </Text>
                <TextInput
                  placeholder={"Enter a message"}
                  value={this.state.message}
                  multilite={true}
                  numberOfLines={4}
                  style={{
                    width: width * 0.7,
                    borderWidth: 0.2,
                    marginRight: 5,
                    textAlignVertical: "top",
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => this.setState({ message: text })}
                /> */}
              </View>
            )}

            {list && chatlist?.chatList?.length != 0 && <FlatList
              contentContainerStyle={{
                width: width * 0.7,
                marginTop: 20,
              }}
              data={chatlist?.chatList}
              showsverticalscrollindicator={false}
              renderItem={({ item }) => {
                return (<TouchableOpacity onPress={() => {
                  this.setState({
                    list: false,
                    chatID: item.id,
                    showsend: true,
                  });
                  this.setState({
                    lader: true,
                  });
                  getmessages(
                    {
                      access_token,
                      email,
                      chatID: item.id,
                    },
                    (callitems) => {
                      this.setState({
                        messages: callitems && callitems.l,
                        lader: false,
                      });
                      // this.messagesEndRef &&
                      //   this.messagesEndRef.current &&
                      //   this.messagesEndRef.current.scrollIntoView(
                      //     { behavior: "smooth" }
                      //   );
                    }
                  );
                }}
                  style={{
                    paddingLeft: 15,
                    paddingVertical: 10,
                    backgroundColor: '#909090',
                  }}
                >
                  <Text
                    style={{
                      color: 'white'
                      , fontWeight: '700'
                    }}
                  > Ticket {item.id}</Text>
                </TouchableOpacity>)
              }}
              keyExtractor={(item) => item.id}
            />}

            {!list && userInfo && roomstarted && <FlatList
              contentContainerStyle={{
                width: width * 0.7,
                marginTop: 20,
              }}
              data={messages}
              showsverticalscrollindicator={false}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />}
            <Text
              style={{
                position: "absolute",
                bottom: 100,
                color: "red",
                fontWeight: "bold",
              }}
            >
              {err}
            </Text>
            {showsend && roomstarted &&
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  flexDirection: "row",
                }}
              ><TextInput
                  placeholder={"Enter a new message"}
                  value={this.state.text}
                  style={{
                    width: width * 0.5,
                    height: 45,
                    borderWidth: 0.2,
                    marginRight: 5,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => this.setState({ text: text })}
                />
                {roomstarted && <TouchableOpacity
                  onPress={() => {
                    if (this.state.chatID == "") {
                      this.startChat();
                    } else {
                      this.sendMsg();
                    }

                    // AndroidKeyboardAdjust.setAdjustResize();
                  }}
                  style={{
                    backgroundColor: "#0cc6de",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    height: 45,
                    marginLeft: roomstarted ? 0 : width * 0.5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      paddingHorizontal: 20,
                    }}
                  >
                    Send
                  </Text>
                </TouchableOpacity>}
              </View>}
          </View>
        )}
        <TouchableOpacity
          onPress={() => this.toggleMenu()}
          style={{
            backgroundColor: "#0cc6de",
            width: 50,
            height: 50,
            position: "absolute",
            borderRadius: 999,
            bottom: 55,
            right: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ width: 20, height: 20 }} source={Images.messenger} />
        </TouchableOpacity>
      </View>
    );
  }
}

// {showoptions && (
//   <TouchableOpacity
//     onPress={() => {
//       this.setState({
//         showoptions: !showoptions,
//         showchat: true,
//         service: "sales",
//       });
//     }}
//     style={{
//       position: "absolute",
//       bottom: 95,
//       right: -10,
//       flexDirection: "row",
//       zIndex: 1000,
//       alignItems: "center",
//     }}
//   >
//     <View>
//       <Text style={{ marginRight: 10, fontWeight: "bold" }}>
//         New Customer
//       </Text>
//     </View>
//     <View
//       style={{
//         backgroundColor: "#dd3333",
//         width: 45,
//         height: 45,
//         borderRadius: 999,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Image
//         style={{ width: 18, height: 18 }}
//         source={Images.bubblechat}
//       />
//     </View>
//   </TouchableOpacity>
// )}
// {showoptions && (
//   <TouchableOpacity
//     onPress={() => {
//       this.setState({
//         showoptions: !showoptions,
//         showchat: true,
//         service: "inquiry",
//       });
//     }}
//     style={{
//       position: "absolute",
//       flexDirection: "row",
//       bottom: 45,
//       right: -10,
//       alignItems: "center",
//     }}
//   >
//     <View>
//       <Text style={{ marginRight: 10, fontWeight: "bold" }}>
//         Existing Customer
//       </Text>
//     </View>
//     <View
//       style={{
//         backgroundColor: "#dd3333",
//         width: 45,
//         height: 45,
//         borderRadius: 999,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Image style={{ width: 18, height: 18 }} source={Images.chat} />
//     </View>
//   </TouchableOpacity>
// )}