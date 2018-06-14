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
import * as Animatable from "react-native-animatable";

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
        <Animatable.View
          animation="rubberBand"
          iterationCount={1}
          easing="ease-out"
          style={{ width: "100%" }}
          delay={500}
        >
          <Card>
            <View
              style={{
                backgroundColor: itemIndex % 2 == 0 ? "#03A9F4" : "#9C27B0"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Times New Roman",
                    color: "white",

                    fontStyle: "italic",
                    fontSize: 25,
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
            </View>
          </Card>
        </Animatable.View>
      </TouchableHighlight>
    </Swipeout>
  );
};

export default FlatListItem;
