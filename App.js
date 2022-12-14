import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./screens/auth/Landing.screen";
import RegisterScreen from "./screens/auth/Register.screen";
import { auth } from "./config/firebase";
import Loginscreen from "./screens/auth/Login.screen";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";

import Homescreen from "./screens/main/Home.screen";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthState } from "react-firebase-hooks/auth";
import Addscreen from "./screens/main/Add.screen";
import Commentscreen from "./screens/main/Comment.screen";
const StackNavigator = createStackNavigator();
export default function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color="#000" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {!user ? (
        <StackNavigator.Navigator>
          <StackNavigator.Screen
            name="Landing"
            component={LandingScreen}
            option={{ headerShown: false }}
          />
          <StackNavigator.Screen
            name="Register"
            component={RegisterScreen}
            option={{ headerShown: false }}
          />
          <StackNavigator.Screen
            name="Login"
            component={Loginscreen}
            option={{ headerShown: false }}
          />
        </StackNavigator.Navigator>
      ) : (
        <Provider store={store}>
          <StackNavigator.Navigator>
            <StackNavigator.Screen
              name="Home"
              component={Homescreen}
              options={{ headerShown: false }}
            />
            <StackNavigator.Screen
              name="Add"
              options={{ headerShadowVisible: false }}
              component={Addscreen}
            />
            <StackNavigator.Screen
              name="Comment"
              options={{ headerShadowVisible: false }}
              component={Commentscreen}
            />
          </StackNavigator.Navigator>
        </Provider>
      )}
    </NavigationContainer>
  );
}
