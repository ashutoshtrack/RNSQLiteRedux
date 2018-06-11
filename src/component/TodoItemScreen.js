import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  YellowBox
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

class TodoItemScreen extends Component {
  state = {
    term: ""
  };
  //For Add Go Back
  goBack() {
    if (this.state.term === "") {
      alert("Add Some Task");
      return;
    }
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect(this.state.term);
  }

  // For UPdate Go Back

  UpdateGoBack() {
    if (this.state.term === "") {
      alert("Add Some Task");
      return;
    }
    const { navigation } = this.props;
    navigation.goBack();

    const item = this.props.navigation.getParam("packetName", "psdfadfaf");

    navigation.state.params.OnUpdate(this.state.term, item);
  }

  componentWillMount() {
    const itemId = this.props.navigation.getParam(
      "updateEdit",
      "alksjalkdjfdlkjgakfj"
    );
    const item = this.props.navigation.getParam("packetName", "psdfadfaf");

    if (itemId !== "alksjalkdjfdlkjgakfj") {
      this.setState({ term: item.name });
    }
  }
  componentWillReceiveProps() {}

  render() {
    const { navigate } = this.props.navigation;
    const itemId = this.props.navigation.getParam("updateEdit", "Bool");
    const TitleName = this.props.navigation.getParam(
      "packetName",
      "alksjalkdjfdlkjgakfj"
    );

    //this.props.addnewTodo.bind(this, this.state.term)

    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ term: text })}
          value={this.state.term}
          underlineColorAndroid={"transparent"}
        />
        {itemId === true ? (
          <TouchableOpacity onPress={this.UpdateGoBack.bind(this)}>
            <Text style={styles.button}>Update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.goBack.bind(this)}>
            <Text style={styles.button}>Add</Text>
          </TouchableOpacity>
        )}
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

export default connect(
  null,
  actions
)(TodoItemScreen);
