import React, { Component } from "react";
import {
  ImageBackground,
  TextInput,
  StyleSheet,
  ImageBackgroundComponent,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  YellowBox
} from "react-native";
import * as Animatable from "react-native-animatable";
import Custombutton from "./common/Custombutton";
import { connect } from "react-redux";
import * as actions from "../actions";
import DatePicker from "react-native-datepicker";
import sorticon from "../../images/wood2.jpg";
import { Tile, Input } from "react-native-elements";
import CardDouble from "./common/CardDouble";

const today = new Date();
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

class TodoItemScreen extends Component {
  state = {
    term: "",
    date:
      today.getFullYear() +
      "-" +
      "0" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate()
  };
  //For Add Go Back
  goBack() {
    if (this.state.term === "") {
      alert("Add Some Task");
      return;
    }
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect(this.state.term, this.state.date);
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

    navigation.state.params.OnUpdate(this.state.term, item, this.state.date);
  }

  componentWillMount() {
    const itemId = this.props.navigation.getParam(
      "updateEdit",
      "alksjalkdjfdlkjgakfj"
    );
    const item = this.props.navigation.getParam("packetName", "psdfadfaf");

    if (new Date(item.creationDate).getDate() + 1 < 10) {
      var tempupdatedDate =
        new Date(item.creationDate).getFullYear() +
        "-" +
        "0" +
        (new Date(item.creationDate).getMonth() + 1) +
        "-" +
        "0" +
        new Date(item.creationDate).getDate();
    } else {
      tempupdatedDate =
        new Date(item.creationDate).getFullYear() +
        "-" +
        "0" +
        (new Date(item.creationDate).getMonth() + 1) +
        "-" +
        new Date(item.creationDate).getDate();
    }

    if (itemId !== "alksjalkdjfdlkjgakfj") {
      this.setState({ term: item.name, date: tempupdatedDate });
    }
  }

  /*   shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log("next", nextState.date);

    var tempupdatedDate =
      new Date(nextState.date).getFullYear() +
      "-" +
      "0" +
      (new Date(nextState.date).getMonth() + 1) +
      "-" +
      new Date(nextState.date).getDate();

    console.log("nexty", tempupdatedDate);

    console.log("this", this.state.date);

    return this.state.date !== tempupdatedDate;
  }
 */
  render() {
    const { navigate } = this.props.navigation;
    const itemId = this.props.navigation.getParam("updateEdit", "Bool");

    return (
      <ImageBackground source={sorticon} style={styles.container}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount={2}
          delay={2000}
          //  iterationCount={2}
        >
          <View>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ term: text })}
              value={this.state.term}
              placeholder="Add Your Task Here"
              underlineColorAndroid={"transparent"}
            />
          </View>
        </Animatable.View>
        <View style={{ margin: 5 }}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-06-01"
            maxDate="2018-06-30"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                marginBottom: 12,
                elevation: 3,
                backgroundColor: "white",
                borderRadius: 5,
                paddingTop: 3
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>
        <Animatable.View
          animation="bounceInDown"
          easing="ease-out"
          style={{ width: "100%" }}
          delay={1000}
        >
          {itemId === true ? (
            <Custombutton onPressed={this.UpdateGoBack.bind(this)}>
              Update
            </Custombutton>
          ) : (
            <Custombutton onPressed={this.goBack.bind(this)}>Add</Custombutton>
          )}
        </Animatable.View>
        <Tile
          imageSrc={sorticon}
          title="First Solve The Problem Then Write the Code"
          featured
          caption="- John Johnson"
        />
      </ImageBackground>
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
    alignItems: "center",
    paddingTop: 50,
    position: "absolute",
    backgroundColor: "#8D6E63"
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: "white",
    color: "orange",
    borderRadius: 15,
    fontWeight: "bold",

    alignContent: "center",
    padding: 10,
    paddingLeft: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 7
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'stretch'
  }
});

export default connect(
  null,
  actions
)(TodoItemScreen);
