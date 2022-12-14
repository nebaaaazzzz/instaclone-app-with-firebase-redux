import { View, Text, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { TextInput } from "react-native-gesture-handler";

const Commentscreen = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const { currentUser, users } = useState((state) => state.currentUser);
  const sendComment = () => {
    addDoc(
      collection(
        db,
        "posts",
        props.route.params.uid,
        "userPosts",
        route.params,
        postId,
        "comments"
      ),
      {
        creator: currentUser.uid,
        text,
      }
    );
  };
  useEffect(() => {
    function matchUserToComment() {
      comments.forEach((comment) => {
        if (comment.hasOwnProperty("user")) {
          return;
        }
        const user = users.find((x) => x.uid == comment.creator);
        if (user == undefined) {
          //fetchUserData using creator from firebase
        } else {
          comment.user = user;
        }
      });
    }
    if (route?.param?.postId !== postId) {
      (async () => {
        const snapshot = await getDocs(
          collection(
            db,
            "posts",
            route.params.uid,
            "userPosts",
            route.params.postId,
            "comments"
          )
        );
        let comments = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setComments(comments);
      })();
    } else {
      matchUserToComment(comments);
    }
  }, [route?.params?.postId]);
  return (
    <View>
      <FlatList
        data={comments}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View>
              {item.user !== undefined ? <Text>{item.user.name}</Text> : null}
              <Text>{item.text}</Text>
            </View>
          );
        }}
      />
      <View>
        <TextInput placeholder="comment..." onChangeText={setText} />
        <Button title="send" onPress={sendComment} />
      </View>
    </View>
  );
};

export default Commentscreen;
