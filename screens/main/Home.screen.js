import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/features/user";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feedscreen from "./Feed.screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Addscreen from "./Add.screen";
import Profilescreen from "./Profile.screen";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import SearchScreen from "./Search.screen";
import { fetchUserPosts } from "../../redux/features/posts";
import { fetchUserFollowing } from "../../redux/features/following";
const Tab = createBottomTabNavigator();
const Empty = () => <></>;
const Homescreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useAuthState(auth);
  useEffect(() => {
    dispatch(fetchUserById(user[0].uid));
    dispatch(fetchUserPosts(user[0].uid));
    dispatch(fetchUserFollowing(user[0].uid));
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feedscreen}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="home" {...props} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="magnify" {...props} size={26} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="plus-box" {...props} size={26} />
          ),
        }}
        name="Add"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        }}
        component={Empty}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="account-circle"
              {...props}
              size={26}
            />
          ),
        }}
        name="Prolfie"
        component={Profilescreen}
      />
    </Tab.Navigator>
  );
};

export default Homescreen;
