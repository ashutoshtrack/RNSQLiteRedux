/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid
} from "react-native";
//import HeaderComponent from "./src/component/HeaderComponent";
import { AppNavigator } from "./Navigation/AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/reducers";

const store = createStore(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
