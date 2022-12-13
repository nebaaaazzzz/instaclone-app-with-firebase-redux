import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { TextInput } from "react-native-gesture-handler";
import { app, db, storage } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
export default function Addscreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const currentUser = useSelector((state) => state.currentUser);
  const [caption, setCaption] = useState("");
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  async function takePic() {
    const res = await cameraRef.current.takePictureAsync();
    setImage(res.uri);
  }

  const createPost = async (downloadUrl) => {
    await addDoc(collection(db, "posts", currentUser.uid, "userPosts"), {
      caption,
      downloadUrl,
      timestamp: serverTimestamp(),
    });
  };
  const handleSave = async () => {
    const imageBlob = await (await fetch(image)).blob();
    const userStorageRef = ref(
      storage,
      `post/${currentUser.uid}/${Math.random().toString(36).split(".")[1]}`
    );
    const uploadTask = uploadBytesResumable(userStorageRef, imageBlob);
    //posts/userid/userPosts

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => downloadURL
        );
        await createPost(downloadURL);
        navigation.popToTop();
      }
    );
  };
  return (
    <View style={styles.container}>
      {image ? (
        <View style={{ flex: 1 }}>
          <Image style={{ flex: 0.7 }} source={{ uri: image }} />
          <TextInput
            placeholder="Write someting..."
            multiline={true}
            selectionColor="black"
            value={caption}
            onChangeText={setCaption}
            numberOfLines={5}
            style={{
              textAlignVertical: "top",
              paddingHorizontal: 10,
              marginVertical: 10,
              paddingVertical: 15,
            }}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <MaterialIcons name="photo-library" size={26} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePic}>
              <MaterialCommunityIcons name="camera-iris" size={26} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <MaterialCommunityIcons name="camera-flip-outline" size={26} />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
