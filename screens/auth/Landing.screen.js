import React from "react";
import { Button, View } from "react-native";

function LandingScreen({ navigation }) {
  return (
    <View>
      <Button title="Signup" onPress={() => navigation.navigate("Register")} />
      <Button title="login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

export default LandingScreen;
