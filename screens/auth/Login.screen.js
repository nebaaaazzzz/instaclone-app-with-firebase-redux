import { Button, TextInput, View } from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <TextInput placeholder="email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="signin" onPress={signIn} />
    </View>
  );
};

export default Loginscreen;
