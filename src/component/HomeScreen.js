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
import {
  updateTodoList,
  deleteTodoList,
  queryAllTodoLists,
  insertNewTodoList
} from "../../database/allSchemas";
import realm from "../../database/allSchemas";

import HeaderComponent from "./HeaderComponent";
import FlatListItem from "./FlatListItem";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: []
    };
    this.reloadData();
    realm.addListener("change", () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    queryAllTodoLists()
      .then(todoLists => {
        var newArrayDataOfOjbect = Object.values(todoLists);
        this.setState({ todoLists: newArrayDataOfOjbect });
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });
  };

  AddHandler = () => {
    //  navigate("Tada");

    const newTodoList = {
      id: Math.floor(Date.now() / 1000),
      name: "Pop",
      creationDate: new Date()
    };
    insertNewTodoList(newTodoList)
      .then()
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  NavigateNow = () => {
    const { navigate } = this.props.navigation;

    navigate("Tada");
  };

  //Handle Delete

  DeleteHandling = id => {
    // alert("delete " + id);
    deleteTodoList(id)
      .then()
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  render() {
    console.log(this.state.todoLists);
    var navigationView = (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: "left" }}>
          I'm in the Drawer!
        </Text>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
      >
        <View style={styles.container}>
          <HeaderComponent
            title={"Todo List"}
            hasAddButton={true}
            navinavigate={this.NavigateNow}
          />
          <FlatList
            data={this.state.todoLists}
            renderItem={({ item, separators, index }) => (
              <FlatListItem
                {...item}
                itemIndex={index}
                //   popupDialogComponent={this.refs.popupDialogComponent}
                onPressItem={this.DeleteHandling.bind(this, item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </DrawerLayoutAndroid>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  flatList: {
    flex: 1,
    flexDirection: "column"
  }
});

export default HomeScreen;
