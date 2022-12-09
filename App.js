import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./screens/Landing.screen";
import RegisterScreen from "./screens/Register.screen";
import { auth } from "./config/firebase";
import Loginscreen from "./screens/Login.screen";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";

import Homescreen from "./screens/Home.screen";
const StackNavigator = createStackNavigator();
export default function App() {
  const dispatch = useDispatch();

  const [user, loading, error] = useAuthState(auth);

  return (
    <NavigationContainer>
      {user ? (
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
              option={{ headerShown: false }}
            />
          </StackNavigator.Navigator>
        </Provider>
      )}
    </NavigationContainer>
  );
}

// <Provider store={store}>
//   <NavigationContainer>
//
//     </StackNavigator.Navigator>
//   </NavigationContainer>
// </Provider>
