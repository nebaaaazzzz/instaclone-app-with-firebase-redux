import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Feedscreen = ({ route, navigation }) => {
  const { currentUser, following, users, usersLoaded } = useSelector(
    (state) => {
      return {
        currentUser: state.currentUser,
        following: state.following,
        users: state.users,
        usersLoaded: state.usersLoaded,
      };
    }
  );
  return (
    <View>
      <FlatList
        numColumns={1}
        data={posts}
        horizontal={false}
        renderItem={({ item }) => {
          <View>
            <Text>{item.user.name}</Text>
            <Image source={{ uri: item.downloadUrl }} />
            <Text
              onPress={() => {
                navigation.navigate("Comment", {
                  postId: item.id,
                  uid: item.user.uid,
                });
              }}
            >
              View comments...
            </Text>
          </View>;
        }}
      />
    </View>
  );
};

export default Feedscreen;
