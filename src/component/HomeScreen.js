import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  DrawerLayoutAndroid,
  FlatList,
  Button,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import * as Animatable from "react-native-animatable";

import { TextField } from "react-native-material-textfield";
import KeyboardSpacer from "react-native-keyboard-spacer";
import DatePicker from "react-native-datepicker";
import Card from "./common/Card";
import CardSection from "./common/CardSection";
import sorticon from "../../images/sort-asc-icon.png";
import sortDescIcon from "../../images/sort-desc-icon.png";
import searchIcon from "../../images/search.png";
import {
  updateTodoList,
  deleteTodoList,
  queryAllTodoLists,
  insertNewTodoList
} from "../../database/allSchemas";
import realm from "../../database/allSchemas";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import HeaderComponent from "./HeaderComponent";
import FlatListItem from "./FlatListItem";
const today = new Date();
const countey = 0;
const slideAnimation = new SlideAnimation({
  slideFrom: "bottom"
});
const slideAnimation2 = new SlideAnimation({
  slideFrom: "right"
});
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      todoLists: [],
      FilterTodoLists: [],
      sorty: true,
      TitlePointer: true,
      FilterPointer: true,
      //Pagination Concept Trials 1
      sliceStartIndex: 0,
      sliceUptoIndex: 5,
      prevsliceUptoIndex: 5,
      //Pagination end concept trials end
      LoadMore: false,
      LoadFlag: true,
      date:
        today.getFullYear() +
        "-" +
        "0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate()
    };
    this.reloadData();
    // alert("something");
    realm.addListener("change", () => {
      this.reloadData();
    });
  }

  componentDidUpdate() {
    console.log("cwu");
  }

  reloadData = () => {
    /* let sortFilu = realm.objects("TodoList").sorted("creationDate", false);
    var newArrayDataOfOjbect = Object.values(sortFilu); */

    queryAllTodoLists(0, this.state.sliceUptoIndex)
      .then(todoLists => {
        var newArrayDataOfOjbect = Object.values(todoLists);
        /*     console.log(newArrayDataOfOjbect, "slickecheck");
        alert(this.state.sliceStartIndex);
        alert(JSON.stringify(newArrayDataOfOjbect)); */
        /*     newArrayDataOfOjbect.sort(function(a, b) {
          var dateA = new Date(a.creationDate),
            dateB = new Date(b.creationDate);
          return dateB - dateA; //sort by date ascending
        }); */
        console.log(this.state.sliceStartIndex, "slicestrt");
        console.log(this.state.sliceUptoIndex, "sliceUpto");
        console.log(this.state.prevsliceUptoIndex, "prev");
        /*        if (this.state.sliceStartIndex === this.state.prevsliceUptoIndex) {
          newArrayDataOfOjbect = newArrayDataOfOjbect.concat(
            Object.values(todoLists)
          );
        } */
        //        console.log(newArrayDataOfOjbect);

        /*  if (this.state.sliceStartIndex === 0) {
          alert("here oned");
          this.setState({
            todoLists: newArrayDataOfOjbect,
            FilterPointer: true
            // LoadMore: !prevState.LoadMore
          });
        } else { */
        // alert("here second");
        this.setState(prevState => ({
          todoLists: newArrayDataOfOjbect,
          FilterPointer: true
          // LoadMore: !prevState.LoadMore
        }));
        //   }
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });
  };

  /*   shouldComponentUpdate(nextProps, nextState) {

    return this.state.todoLists !== nextState.todoLists;
  }
 */
  AddHandler = (namer, dater) => {
    //  navigate("Tada");

    var todayMate = new Date();
    /*     var updatedDate =
      (todayMate.getFullYear()) +
      "-" +
      "0" +
      (todayMate.getMonth() + 1) +
      "-" +
      todayMate.getDate(); */
    /*   alert(updatedDate); */
    const newTodoList = {
      id: Math.floor(Date.now() / 1000),
      name: namer,
      creationDate: dater
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

  UpdateHandlerFromTodoScreen = (namer, item, datex) => {
    let updatedCreationDate = "";

    if (item.creationDate !== datex) {
      //console.log(datex, "upfts");

      updatedCreationDate = datex;
    } else {
      updatedCreationDate = item.creationDate;
    }
    console.log(updatedCreationDate, "upfts");
    const newTodoList = {
      id: item.id,
      name: namer,
      creationDate: updatedCreationDate
    };

    updateTodoList(newTodoList)
      .then()
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  //addClicked() {}

  // Two Way binding from child screen goBack();
  onSelect = (namer, dateum) => {
    this.AddHandler(namer, dateum);
  };

  //To waay binding for child screen update goBack();

  OnUpdate = (namer, item, datex) => {
    this.UpdateHandlerFromTodoScreen(namer, item, datex);
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

  LoadMore = () => {
    var count = realm.objects("TodoList").length;
    //ToastAndroid.show("Loaded More", ToastAndroid.SHORT);
    console.log("load fire", count);

    if (this.state.sliceUptoIndex <= count + 5) {
      this.setState({
        //  sliceStartIndex: this.state.sliceStartIndex + 5,
        sliceUptoIndex: this.state.sliceUptoIndex + 5
      });

      this.reloadData();
      ToastAndroid.show("Loaded More", ToastAndroid.SHORT);
    }

    /*  if (this.state.sliceUptoIndex) {
      this.setState(prevState => ({
        sliceStartIndex: prevState.sliceStartIndex + 5,
        sliceUptoIndex: prevState.sliceUptoIndex + 5,
        prevsliceUptoIndex: this.state.sliceUptoIndex
      }));

      console.log("LoadMore Fired");
      //this.reloadData();
    } */
    /*  if (this.state.LoadMore) {
      ToastAndroid.show("Loaded More", ToastAndroid.SHORT);

      this.setState({ slicePeice: 10 });
      this.reloadData();
      this.setState({ LoadMore: false });
    } */

    //console.log(this.state.)
  };

  //Sorts Defined bel0w

  reloadSorty = () => {
    let sortFilu = realm.objects("TodoList").sorted("creationDate", false);
    var newArrayDataOfOjbect = Object.values(sortFilu);

    // var newArrayDataOfOjbect = Object.values(todoLists);

    this.setState({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true,
      sorty: true,
      LoadMore: false
    });
    //   });
  };

  sortChecker = () => {
    if (this.state.sorty) {
      this.reloadDescData();
    } else {
      this.reloadSorty();
    }
    //alert(this.state.sorty);
    /*  this.setState(prevState => ({
      sorty: !prevState.sorty
    })); */
  };

  reloadDescData = () => {
    let sortFilu = realm.objects("TodoList").sorted("creationDate", true);

    // console.log(sortFilu, "sortFilu");
    /* queryAllTodoLists()
      .then(todoLists => { */
    var newArrayDataOfOjbect = Object.values(sortFilu);
    /*    newArrayDataOfOjbect.sort(function(a, b) {
          var dateA = new Date(a.creationDate),
            dateB = new Date(b.creationDate);
          return dateA - dateB; //sort by date desc
        }); */
    this.setState({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true,
      sorty: false,
      LoadMore: false
    });
    /*    })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
     });*/
  };

  reloadTitleAscendingSorter = () => {
    let sortTitle = realm.objects("TodoList").sorted("name", true);
    let newArrayDataOfOjbect = Object.values(sortTitle);
    /*  this.setState({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true
    }); */
    /*   queryAllTodoLists()
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
      }); */

    this.setState(prevState => ({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true,
      TitlePointer: !prevState.TitlePointer,
      LoadMore: false
    }));

    ToastAndroid.show("Sorted By Names Z-A", ToastAndroid.SHORT);
  };

  reloadTitleDescendingSorter = () => {
    /*     queryAllTodoLists()
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
      }); */
    let sortTitleDesc = realm.objects("TodoList").sorted("name", false);
    let newArrayDataOfOjbect = Object.values(sortTitleDesc);

    this.setState(prevState => ({
      todoLists: newArrayDataOfOjbect,
      TitlePointer: !prevState.TitlePointer,
      LoadMore: false
    }));
    ToastAndroid.show("Sorted By Desc A-Z", ToastAndroid.SHORT);
  };
  reloadFilterDataByName = (name, date) => {
    if (new Date(date).getDate() + 1 < 10) {
      var tempupdatedDate =
        new Date(date).getFullYear() +
        "-" +
        "0" +
        (new Date(date).getMonth() + 1) +
        "-" +
        "0" +
        (new Date(date).getDate() + 1);
    } else {
      tempupdatedDate =
        new Date(date).getFullYear() +
        "-" +
        "0" +
        (new Date(date).getMonth() + 1) +
        "-" +
        (new Date(date).getDate() + 1);
    }
    let tempFilter = [];
    let Drag = 0;
    if (new Date(date).getDate() === 30) {
      tempupdatedDate =
        new Date(date).getFullYear() +
        "-" +
        "0" +
        (new Date(date).getMonth() + 1) +
        "-" +
        (new Date(date).getDate() - 1);

      ///alert(new Date(date).getDate()-1 + "Date");
      //  alert(new Date(tempupdatedDate));
      tempFiltere = realm
        .objects("TodoList")
        .filtered(
          "creationDate > $0 && creationDate <= $1",
          new Date(tempupdatedDate),
          new Date(date)
        );
      Drag = 1;
    }

    let flag = 0;
    console.log(date, "simple");
    console.log(tempupdatedDate, "tud");
    console.log(new Date(date), "Date");
    console.log(new Date(tempupdatedDate), "Tempdate");
    if (name === "") {
      if (Drag === 1) {
        tempFilter = tempFiltere;
      } else {
        tempFilter = realm
          .objects("TodoList")
          .filtered(
            "creationDate >= $0 && creationDate < $1",
            new Date(date),
            new Date(tempupdatedDate)
          );
      }
    } else {
      if (Drag === 1) {
        tempFilter = tempFiltere;
      } else {
        tempFilter = realm
          .objects("TodoList")
          .filtered(
            "creationDate >= $0 && creationDate < $1 AND name = $2",
            new Date(date),
            new Date(tempupdatedDate),
            name
          );
      }
    }
    Drag = 0;
    console.log(tempFilter);

    if (tempFilter.length === 0) {
      tempFilter = realm.objects("TodoList").filtered("name = $0", name);

      flag = 1;
    }

    if (tempFilter.length === 0) {
      return ToastAndroid.show("No Results", ToastAndroid.SHORT);
    }

    if (flag === 1) {
      ToastAndroid.show("Found Dated " + new Date(date), ToastAndroid.LONG);
    } else {
      ToastAndroid.show("Filtered", ToastAndroid.SHORT);
    }
    /*   let hondas = realm
      .objects("TodoList")
      .filtered(
        "creationDate >= $0 && creationDate < $1 OR name = $2",
        new Date(date),
        new Date(tempupdatedDate),
        name
      ); */
    var updatedTempFilter = Object.values(tempFilter);

    // updatedTempFilter = Object.values(tempFiltere);

    // console.log(new Date(date));

    this.setState({
      todoLists: updatedTempFilter,
      FilterPointer: false,
      LoadMore: false
    });

    this.popupDialog.dismiss();
    //console.log(new Date(tempupdatedDate));
    // console.log(updatedTempFilter, "Hondas");

    /*   queryAllTodoLists().then(todoLists => {
      var newArrayDataOfOjbect = Object.values(todoLists);
     
        var updatedfilter = newArrayDataOfOjbect.filter(todo => {
          var updatedDate =
            todo.creationDate.getFullYear() +
            "-" +
            "0" +
            (todo.creationDate.getMonth() + 1) +
            "-" +
            todo.creationDate.getDate();

          //     console.log(updatedDate);
          //    console.log(date + "der");
          if (name === "") {
            // console.log("updated Date", updatedDate);
         //   console.log("date", date); 
            return updatedDate === date;
          }

          return todo.name === name && updatedDate === date;
        }); */
    /*         console.log(updatedfilter); */
    /*   if (updatedfilter.length === 0) {
          return ToastAndroid.show("No Records Found", ToastAndroid.SHORT);
        }
        this.setState({ todoLists: updatedfilter });
        this.setState({
          FilterPointer: false
        });
        this.popupDialog.dismiss();
        ToastAndroid.show("filtered", ToastAndroid.SHORT);
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] }); */
    // });
  };

  unloadFilterDataByName = () => {
    this.reloadData();
    this.setState(prevState => ({
      FilterPointer: !prevState.FilterPointer,
      term: ""
    }));
    ToastAndroid.show("Removed", ToastAndroid.SHORT);
  };
  checker = () => {
    //    alert("fireda");
    this.state.FilterPointer ? this.LoadMore() : null;
  };
  render() {
    /*    console.log(this.state.sliceStartIndex);
    console.log(this.state.sliceUptoIndex); */

    // console.log(this.state.todoLists.slice(0, 5));
    /* 
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
    ); */

    return (
      /*    <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
      > */

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
          sortpoppy={() => {
            this.popupDialogtwo.show();
          }}
        />

        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          slideFrom={"right"}
          animationDuration={1000}
          dialogAnimation={slideAnimation}
          height={this.state.FilterPointer ? 230 : 260}
          containerStyle={{ paddingBottom: 180 }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "tomato",
                fontSize: 30,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 7,
                fontStyle: "italic"
              }}
            >
              Just Filter
            </Text>

            <Card>
              <View style={{ flexDirection: "row" }}>
                {/*   <View>
                    <Text style={{ fontSize: 20, margin: 4 }}> Title: </Text>
                  </View> */}
                <View>
                  <TextInput
                    label="Add Todo"
                    style={styles.input}
                    onChangeText={text => this.setState({ term: text })}
                    value={this.state.term}
                    placeholder="Add Your Task Here"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
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
                      elevation: 3
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={date => {
                    this.setState({ date: date });
                  }}
                />
              </View>
              <Button
                title="Filter"
                onPress={this.reloadFilterDataByName.bind(
                  this,
                  this.state.term,
                  this.state.date
                )}
              />
              {this.state.FilterPointer ? null : (
                <Button
                  title="Remove Filter"
                  color="red"
                  onPress={this.unloadFilterDataByName.bind(this)}
                />
              )}
            </Card>
          </View>
        </PopupDialog>

        <PopupDialog
          ref={popupDialogtwo => {
            this.popupDialogtwo = popupDialogtwo;
          }}
          dialogAnimation={slideAnimation2}
          height={125}
          width={185}
        >
          <View style={{ alignItems: "center" }}>
            <Card>
              <CardSection>
                <Text style={{ paddingTop: 10, color: "teal", fontSize: 18 }}>
                  Sort By Title -->
                </Text>
                <TouchableOpacity
                  onPress={
                    this.state.TitlePointer
                      ? () => this.reloadTitleAscendingSorter()
                      : () => this.reloadTitleDescendingSorter()
                  }
                >
                  <Image
                    style={styles.addButtonImage}
                    source={
                      //  sortState ? sorticon : sortDescIcon
                      this.state.TitlePointer ? sorticon : sortDescIcon
                    }
                  />
                </TouchableOpacity>
              </CardSection>
              <CardSection>
                <Text style={{ paddingTop: 10, color: "teal", fontSize: 18 }}>
                  Sort By Date -->
                </Text>

                <TouchableOpacity onPress={() => this.sortChecker()}>
                  <Image
                    style={styles.addButtonImage}
                    source={
                      //  sortState ? sorticon : sortDescIcon
                      this.state.sorty ? sorticon : sortDescIcon
                    }
                  />
                </TouchableOpacity>
              </CardSection>
            </Card>
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
          onEndReachedThreshold={1}
          onEndReached={this.checker.bind(this)}
        />
      </View>
      //  </DrawerLayoutAndroid>
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
    width: 170,
    marginBottom: 25,
    width: 230,
    shadowColor: "#000",
    borderRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    paddingLeft: 30,
    fontSize: 14,
    fontStyle: "italic",
    color: "purple"
  },
  addButtonImage: {
    width: 42,
    height: 42,
    tintColor: "black"
  }
});

export default HomeScreen;
