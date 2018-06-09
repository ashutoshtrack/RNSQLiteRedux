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

const FlatListItem = props => {
  const {
    itemIndex,
    id,
    name,
    creationDate,
    popupDialogComponent,
    onPressItem
  } = props;

  return (
    <TouchableHighlight onPress={onPressItem}>
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
  );
};

export default FlatListItem;
