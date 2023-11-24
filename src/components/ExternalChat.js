import React from "react";
import LiveChat from "react-native-livechat";
import { Image, View } from "react-native";
import { Images } from "@common";
class ExternalChat extends React.Component {
  render() {
    return (
      <LiveChat
        license={14224854}
        bubble={
          <View
            style={{
              backgroundColor: "#0cc6de",
              width: 45,
              height: 45,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 22, height: 22 }}
              source={Images.messenger}
            />
          </View>
        }
        bubbleStyles={{
          position: "absolute",
          bottom: 55,
          right: 5,
        }}
      />
    );
  }
}

export default ExternalChat;
