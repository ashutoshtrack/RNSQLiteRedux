import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  YellowBox
} from "react-native";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

class TodoItemScreen extends Component {
  state = {
    term: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ term: text })}
          value={this.state.term}
        />
        <TouchableOpacity onPress={() => alert("Gotchya")}>
          <Text style={styles.button}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    color: "white",
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: "center",
    width: 300
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 37,
    width: "100%"
  }
});

export default TodoItemScreen;
