import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../redux/features/user";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feedscreen from "./Feed.screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Addscreen from "./Add.screen";
import Profilescreen from "./Profile.screen";
const Tab = createBottomTabNavigator();

const Homescreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserById(user.id));
  }, []);
  return (
    <Tab.Navigator>
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
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="plus-box" {...props} size={26} />
          ),
        }}
        name="Add"
        component={Addscreen}
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
