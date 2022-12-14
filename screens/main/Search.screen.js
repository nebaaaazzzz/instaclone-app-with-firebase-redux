import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const SearchScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async (search) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("firstName", ">=", search));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    //user = snapshot.data()
    // user.id = snapshot.id
    //fetch user followingPosts
    //clear state before fetching data
    //add  comment to post
    //
    setUsers(users);
  };
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <TextInput
        onChangeText={(text) => fetchUsers(text)}
        placeholder="Type here ..."
        selectionColor={"#000"}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("profile", {
                  uid: item.uid,
                })
              }
            >
              <Text>{item.firstName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;
