import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  FlatList,
  TouchableHighlight
} from "react-native";
import Swipeout from "react-native-swipeout";

const FlatListItem = props => {
  const {
    itemIndex,
    id,
    name,
    creationDate,
    popupDialogComponent,
    onPressItem,
    EditClickHandler
  } = props;
  var swipeoutBtns = [
    {
      text: "Update"
    }
  ];

  return (
    <Swipeout
      right={[
        {
          text: "Edit",
          backgroundColor: "rgb(81,134,237)",
          onPress: EditClickHandler
        },
        ,
        {
          text: "Delete",
          backgroundColor: "rgb(217, 80, 64)",
          onPress: onPressItem
        }
      ]}
      autoClose={true}
    >
      <TouchableHighlight>
        <View
          style={{
            backgroundColor: itemIndex % 2 == 0 ? "powderblue" : "skyblue"
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, margin: 10 }}>
            {name}
          </Text>
          <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>
            {creationDate.toLocaleString()}
          </Text>
        </View>
      </TouchableHighlight>
    </Swipeout>
  );
};

export default FlatListItem;
