import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  DrawerLayoutAndroid,
  FlatList,
  Button,
  ToastAndroid,
  TouchableHighlight,
  TextInput
} from "react-native";
import {
  updateTodoList,
  deleteTodoList,
  queryAllTodoLists,
  insertNewTodoList
} from "../../database/allSchemas";
import realm from "../../database/allSchemas";
import PopupDialog from "react-native-popup-dialog";
import HeaderComponent from "./HeaderComponent";
import FlatListItem from "./FlatListItem";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      todoLists: [],
      FilterTodoLists: [],
      sorty: true,
      TitlePointer: true,
      FilterPointer: true
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
        newArrayDataOfOjbect.sort(function(a, b) {
          var dateA = new Date(a.creationDate),
            dateB = new Date(b.creationDate);
          return dateB - dateA; //sort by date ascending
        });
        this.setState({ todoLists: newArrayDataOfOjbect, FilterPointer: true });
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });
  };

  AddHandler = namer => {
    //  navigate("Tada");

    const newTodoList = {
      id: Math.floor(Date.now() / 1000),
      name: namer,
      creationDate: new Date()
    };
    insertNewTodoList(newTodoList)
      .then()
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  DeleteHandler = id => {
    deleteTodoList(id)
      .then()
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  UpdateHandlerFromTodoScreen = (namer, item) => {
    const newTodoList = {
      id: item.id,
      name: namer,
      creationDate: item.creationDate
    };

    updateTodoList(newTodoList)
      .then()
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  //addClicked() {}

  // Two Way binding from child screen goBack();
  onSelect = namer => {
    this.AddHandler(namer);
  };

  //To waay binding for child screen update goBack();

  OnUpdate = (namer, item) => {
    this.UpdateHandlerFromTodoScreen(namer, item);
  };

  NavigateNow = () => {
    const { navigate } = this.props.navigation;

    navigate("Tada", { onSelect: this.onSelect });
  };

  //Handle Delete

  DeleteHandling = id => {
    Alert.alert(
      "Delete",
      "You Sure To Delete?",
      [
        {
          text: "No",
          onPress: () => {}, //Do nothing
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: this.DeleteHandler.bind(this, id)
        }
      ],
      { cancelable: true }
    );
  };

  EditHandling = item => {
    const { navigate } = this.props.navigation;

    navigate("Tada", {
      updateEdit: true,
      packetName: item,
      OnUpdate: this.OnUpdate
    });
  };

  //Sorts Defined bel0w

  sortChecker = () => {
    if (this.state.sorty) {
      this.reloadDescData();
    } else {
      this.reloadData();
    }
    //alert(this.state.sorty);
    this.setState(prevState => ({
      sorty: !prevState.sorty
    }));
  };

  reloadDescData = () => {
    queryAllTodoLists()
      .then(todoLists => {
        var newArrayDataOfOjbect = Object.values(todoLists);
        newArrayDataOfOjbect.sort(function(a, b) {
          var dateA = new Date(a.creationDate),
            dateB = new Date(b.creationDate);
          return dateA - dateB; //sort by date desc
        });
        this.setState({ todoLists: newArrayDataOfOjbect, FilterPointer: true });
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });
  };

  reloadTitleAscendingSorter = () => {
    queryAllTodoLists()
      .then(todoLists => {
        var newArrayDataOfOjbect = Object.values(todoLists);
        newArrayDataOfOjbect.sort(function(a, b) {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        this.setState({ todoLists: newArrayDataOfOjbect, FilterPointer: true });
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });

    this.setState(prevState => ({
      TitlePointer: !prevState.TitlePointer
    }));

    ToastAndroid.show("Sorted By Names A-Z", ToastAndroid.SHORT);
  };

  reloadTitleDescendingSorter = () => {
    queryAllTodoLists()
      .then(todoLists => {
        var newArrayDataOfOjbect = Object.values(todoLists);
        newArrayDataOfOjbect.sort(function(a, b) {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return 1;
          if (nameA > nameB) return -1;
          return 0; //default return value (no sorting)
        });
        this.setState({ todoLists: newArrayDataOfOjbect });
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });

    this.setState(prevState => ({
      TitlePointer: !prevState.TitlePointer
    }));
    ToastAndroid.show("Sorted By Desc z-A", ToastAndroid.SHORT);
  };
  reloadFilterDataByName = () => {
    queryAllTodoLists()
      .then(todoLists => {
        var newArrayDataOfOjbect = Object.values(todoLists);
        var updatedfilter = newArrayDataOfOjbect.filter(todo => {
          return todo.name === "Mango";
        });
        console.log("ppp ", updatedfilter);
        this.setState({ todoLists: updatedfilter });
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });

    this.setState(prevState => ({
      FilterPointer: !prevState.FilterPointer
    }));
    ToastAndroid.show("filtered", ToastAndroid.SHORT);
  };

  unloadFilterDataByName = () => {
    this.reloadData();
    this.setState(prevState => ({
      FilterPointer: !prevState.FilterPointer
    }));
    ToastAndroid.show("Removed", ToastAndroid.SHORT);
  };

  render() {
    var navigationView = (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text
          style={{
            margin: 10,
            fontSize: 25,
            textAlign: "left",
            color: "tomato"
          }}
        >
          Sorting By Name
        </Text>

        <Button
          title={this.state.TitlePointer ? "Set Ascending" : "Set Descinding"}
          onPress={
            this.state.TitlePointer
              ? () => this.reloadTitleAscendingSorter()
              : () => this.reloadTitleDescendingSorter()
          }
        />
        <Text
          style={{
            margin: 10,
            fontSize: 25,
            textAlign: "left",
            color: "teal"
          }}
        >
          Filter By Title
        </Text>

        <Button
          title={this.state.FilterPointer ? "Filter up?" : "remove Filter"}
          onPress={
            this.state.FilterPointer
              ? () => this.reloadFilterDataByName()
              : () => this.unloadFilterDataByName()
          }
        />
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
            sortMono={this.sortChecker}
            hasSortButton={true}
            sortState={this.state.sorty}
            poppy={() => {
              this.popupDialog.show();
            }}
          />
          <PopupDialog
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "tomato", fontSize: 35, marginBottom: 10 }}>
                Filter Your Search
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={{ fontSize: 20, margin: 4 }}> Title: </Text>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ term: text })}
                  value={this.state.term}
                  underlineColorAndroid={"transparent"}
                />
              </View>
            </View>
          </PopupDialog>
          <FlatList
            data={this.state.todoLists}
            renderItem={({ item, separators, index }) => (
              <FlatListItem
                {...item}
                itemIndex={index}
                onPressItem={this.DeleteHandling.bind(this, item.id)}
                EditClickHandler={this.EditHandling.bind(this, item)}
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
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 37,
    width: 120
  }
});

export default HomeScreen;
