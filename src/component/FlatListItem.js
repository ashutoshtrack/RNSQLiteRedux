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
import Card from "./common/Card";

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
        <Card>
          <View
            style={{
              backgroundColor: itemIndex % 2 == 0 ? "#E1BEE7" : "#FFCC80"
            }}
          >
            <Text
              style={{
                fontFamily: "Comic Sans MS",

                fontSize: 21,
                margin: 10,
                elevation: 7
              }}
            >
              {name}
            </Text>
            <Text
              style={{ fontSize: 18, margin: 10, color: "#1A237E" }}
              numberOfLines={2}
            >
              {creationDate.toLocaleString()}
            </Text>
          </View>
        </Card>
      </TouchableHighlight>
    </Swipeout>
  );
};

export default FlatListItem;
