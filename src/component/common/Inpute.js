import React from "react";
import { TextInput, View, Text } from "react-native";

const Inpute = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { inputStyle, labelStye, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStye}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autocorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStye: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
};

export { Inpute };
