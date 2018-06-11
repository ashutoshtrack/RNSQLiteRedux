import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Alert
} from "react-native";

import addicon from "../../images/add-icon.png";
import sorticon from "../../images/sort-asc-icon.png";
import sortDescIcon from "../../images/sort-desc-icon.png";
import searchIcon from "../../images/search.png";

class HeaderComponent extends Component {
  render() {
    const {
      title,
      showAddTodoList,
      hasAddButton,
      hasSortButton,
      sort,
      sortState,
      hasDeleteAllButton,
      navinavigate,
      sortMono,
      poppy
    } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 35, color: "white" }}> {title}</Text>
        </View>

        {hasAddButton && (
          <TouchableOpacity style={styles.addButton} onPress={poppy}>
            <Image style={styles.addButtonImage} source={searchIcon} />
          </TouchableOpacity>
        )}
        {hasSortButton && (
          <TouchableOpacity style={styles.addButton} onPress={sortMono}>
            <Image
              style={styles.addButtonImage}
              source={sortState ? sorticon : sortDescIcon}
            />
          </TouchableOpacity>
        )}
        {hasAddButton && (
          <TouchableOpacity style={styles.addButton} onPress={navinavigate}>
            <Image style={styles.addButtonImage} source={addicon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "teal",
    height: Platform.OS === "ios" ? 100 : 80
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 50
  },
  addButton: {
    zIndex: 2,
    marginRight: 10,
    marginTop: 5
  },
  addButtonImage: {
    width: 42,
    height: 42,
    tintColor: "white"
  }
});
export default HeaderComponent;
