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
  insertNewTodoList,
  filterByDate,
  filterByName,
  sortByNameAsc,
  sortByNameDesc,
  sortByDateAsc,
  sortByDateDsc,
  getLastInsertedId,
  getLastInsertedIdtwo
} from "../../database/sqliteSchema";
//import realm from "../../database/allSchemas";
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
        today.getDate(),
      // Pagination Trials continuation for Sqlite
      initialuserId: 0
    };
    this.reloadData();
  }

  componentDidUpdate() {
    console.log("cwu");
  }

  reloadData = () => {
    queryAllTodoLists(this.state.initialuserId)
      .then(todoLists => {
        var newArrayDataOfOjbect = todoLists;

        //  newArrayDataOfOjbect.concat(todoLists);

        //   console.log(newArrayDataOfOjbect, "Sdfdssf");
        console.log("triggered", todoLists);

        /* var newArray = this.state.todoLists.concat(todoLists);

          var uniqueNames = [];
          $.each(newArray, function(i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
          }); */

        //  console.log(uniqueNames, "ydff");

        //  console.log(uniqueNames, "sddf");
        this.setState(prevState => ({
          todoLists: this.state.todoLists.concat(todoLists),
          initialuserId: this.state.initialuserId + 8,
          FilterPointer: true
        }));
      })
      .catch(error => {
        alert("Error");
        this.setState({ todoLists: [] });
      });
  };

  AddHandler = (namer, dater) => {
    //  navigate("Tada");

    var todayMate = new Date();

    const newTodoList = {
      id: Math.floor(Date.now() / 1000),
      name: namer,
      creationDate: dater
    };
    insertNewTodoList(newTodoList)
      .then(res => {
        this.setState({ todoLists: res });
      })
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };
  /*   shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);

    return nextState.initialuserId <= this.state.initialuserId;
  } */

  DeleteHandler = id => {
    deleteTodoList(id)
      .then(res => {
        this.setState({ todoLists: res });
      })
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
    // console.log(updatedCreationDate, "upfts");
    const newTodoList = {
      id: item.id,
      name: namer,
      creationDate: updatedCreationDate
    };

    updateTodoList(newTodoList)
      .then(res => {
        this.setState({ todoLists: res });
      })
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
    //  alert("loadMore");
    // let count = null;
    getLastInsertedId()
      .then(res => {
        if (this.state.initialuserId < res) {
          ToastAndroid.show("Loaded More", ToastAndroid.SHORT);
          //   this.setState({});
          // alert(this.state.initialuserId);

          this.reloadData();
        }
      })
      .catch(err => alert(error));

    //ToastAndroid.show("Loaded More", ToastAndroid.SHORT);
    /*     var count = realm.objects("TodoList").length;

    console.log("load fire", count);

    if (this.state.sliceUptoIndex <= count + 5) {
      this.setState({
        sliceUptoIndex: this.state.sliceUptoIndex + 5
      });

      this.reloadData();
      ToastAndroid.show("Loaded More", ToastAndroid.SHORT);
    } */
    /*  if (this.state.initialuserId < 15) {
      getLastInsertedId()
        .then(res => {
          console.log("getter ", res); */
    // console.log(this.state.initialuserId);
    //  if (this.state.initialuserId <= res) {
    /*  queryAllTodoLists(this.state.initialuserId)
            .then(todoLists => {
              //  var newArrayDataOfOjbect = newArrayDataOfOjbect.concat(todoLists);

              this.setState(prevState => ({
                todoLists: todoLists,
                FilterPointer: true
              }));
            })
            .catch(error => {
              alert("Error");
              this.setState({ todoLists: [] });
            }); */
    /*             this.setState({ initialuserId: this.state.initialuserId + 10 });
            this.reloadData();
          }
        })

        .catch(error => {
          alert(JSON.stringify(error));
        });
    } */
    /*  getLastInsertedIdtwo()
      .then(res => console.log(res))
      .catch(err => alert(error)); */
  };

  //Sorts Defined bel0w

  reloadSorty = () => {
    /*     let sortFilu = realm.objects("TodoList").sorted("creationDate", false);
    var newArrayDataOfOjbect = Object.values(sortFilu);

    this.setState({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true,
      sorty: true,
      LoadMore: false
    }); */

    sortByDateAsc()
      .then(res => {
        this.setState({
          todoLists: res,
          FilterPointer: true,
          sorty: true,
          LoadMore: false
        });
      })
      .catch(err => alert("SORT ASC error"));
  };

  sortChecker = () => {
    if (this.state.sorty) {
      this.reloadDescData();
    } else {
      this.reloadSorty();
    }
  };

  reloadDescData = () => {
    sortByDateDsc()
      .then(res => {
        this.setState({
          todoLists: res,
          FilterPointer: true,
          sorty: false,
          LoadMore: false
        });
      })
      .catch(err => alert("SORT desc error"));

    /*  let sortFilu = realm.objects("TodoList").sorted("creationDate", true);

    var newArrayDataOfOjbect = Object.values(sortFilu);

    this.setState({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true,
      sorty: false,
      LoadMore: false
    }); */
  };

  reloadTitleAscendingSorter = () => {
    /*    let sortTitle = realm.objects("TodoList").sorted("name", true);
    let newArrayDataOfOjbect = Object.values(sortTitle);

    this.setState(prevState => ({
      todoLists: newArrayDataOfOjbect,
      FilterPointer: true,
      TitlePointer: !prevState.TitlePointer,
      LoadMore: false
    }));

    ToastAndroid.show("Sorted By Names Z-A", ToastAndroid.SHORT); */
    //  alert("Ascending Sorter");

    sortByNameAsc()
      .then(res => {
        this.setState(prevState => ({
          todoLists: res,
          FilterPointer: true,
          TitlePointer: !prevState.TitlePointer,
          LoadMore: false
        }));
        ToastAndroid.show("Sorted By Names A-Z", ToastAndroid.SHORT);
      })
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });
  };

  reloadTitleDescendingSorter = () => {
    sortByNameDesc()
      .then(res => {
        this.setState(prevState => ({
          todoLists: res,
          FilterPointer: true,
          TitlePointer: !prevState.TitlePointer,
          LoadMore: false
        }));
        ToastAndroid.show("Sorted By Names Z-A", ToastAndroid.SHORT);
      })
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });

    /*  let sortTitleDesc = realm.objects("TodoList").sorted("name", false);
    let newArrayDataOfOjbect = Object.values(sortTitleDesc);


    this.setState(prevState => ({
      todoLists: newArrayDataOfOjbect,
      TitlePointer: !prevState.TitlePointer,
      LoadMore: false
    }));
    ToastAndroid.show("Sorted By Desc A-Z", ToastAndroid.SHORT); */
  };
  reloadFilterDataByName = (name, date) => {
    var tempFilter = [];
    var flag = 0;

    filterByDate(name, date)
      .then(res => {
        tempFilter = res;

        if (tempFilter.length === 0) {
          filterByName(name)
            .then(res => {
              tempFilter = res;

              if (tempFilter.length === 0) {
                return ToastAndroid.show("No Results", ToastAndroid.SHORT);
              } else {
                flag = 1;
              }
              if (flag === 1) {
                ToastAndroid.show(
                  "Found Dated " + new Date(date).getDate(),
                  ToastAndroid.LONG
                );
              } else {
                ToastAndroid.show("Filtered", ToastAndroid.SHORT);
              }

              this.setState({
                todoLists: tempFilter,
                FilterPointer: false,
                LoadMore: false
              });

              this.popupDialog.dismiss();
            })
            .catch(error => {
              alert(`Insert new todoList error ${error}`);
            });
          //
        } else {
          if (tempFilter.length === 0) {
            return ToastAndroid.show("No Results", ToastAndroid.SHORT);
          } else {
            ToastAndroid.show("Filtered", ToastAndroid.SHORT);
          }
          this.setState({
            todoLists: tempFilter,
            FilterPointer: false,
            LoadMore: false
          });
        }
      })
      .catch(error => {
        alert(`Insert new todoList error ${error}`);
      });

    //  console.log(tempFilter, "tempfilter");

    /*    if (new Date(date).getDate() + 1 < 10) {
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

    var updatedTempFilter = Object.values(tempFilter);

    this.setState({
      todoLists: updatedTempFilter,
      FilterPointer: false,
      LoadMore: false
    });

    this.popupDialog.dismiss(); */
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
    return (
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
          onEndReachedThreshold={0.5}
          onEndReached={this.checker.bind(this)}
        />
      </View>
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
