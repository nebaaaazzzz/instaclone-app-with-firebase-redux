import { View, Text } from "react-native";
import React from "react";

const Save = ({ navigation }) => {
  console.log(navigation.params);
  return (
    <View>
      <Text>Save</Text>
    </View>
  );
};

export default Save;
