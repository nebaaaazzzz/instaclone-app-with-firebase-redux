import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../config/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useSignOut } from "react-firebase-hooks/auth";

const Profilescreen = ({ route, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  const {
    currentUser,
    posts,
    following: userfollowing,
  } = useSelector((state) => {
    return {
      currentUser: state.currentUser,
      posts: state.posts,
      following: state.following,
    };
  });
  useEffect(() => {
    if (route?.params?.uid !== currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
    }
    if (userfollowing.includes(currentUser.uid)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [route?.params?.uid]);
  const handleFollow = async () => {
    await setDoc(
      collection(
        db,
        "following",
        currentUser.uid,
        "userFollowing",
        route?.params?.uid
      ),
      {}
    );
  };
  const handleUnfollow = async () => {
    await deleteDoc(
      doc(db, "following", currentUser.uid, "userFollowing", route?.params?.uid)
    );
  };
  if (!user) return <View></View>;
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>
          {user.firstName} {currentUser.lastName}{" "}
        </Text>
        <Text> {user.email}</Text>
        {route?.params?.id !== currentUser.uid ? (
          <Button title="logout" onPress={() => signOut()} />
        ) : (
          <View>
            {following ? (
              <Button title="unFollow" onPress={handleUnfollow} />
            ) : (
              <Button title="Follow" onPress={handleFollow} />
            )}
          </View>
        )}
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerImage}>
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadUrl }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: { marginTop: 20 },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
    margin: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
export default Profilescreen;
