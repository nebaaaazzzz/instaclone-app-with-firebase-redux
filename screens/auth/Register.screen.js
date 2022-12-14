import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setDoc(doc(db, "users", res.user.uid), {
          name,
          email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="signup" onPress={signUp} />
    </View>
  );
}

export default RegisterScreen;
