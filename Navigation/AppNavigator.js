import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../src/component/HomeScreen";
import TodoItemScreen from "../src/component/TodoItemScreen";

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Tada: {
    screen: TodoItemScreen,
    navigationOptions: {
      title: "Todo Item"
    }
  }
});
