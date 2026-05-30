import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#EEF2FB",
        },
        headerTintColor: "#0B49B7",
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "900",
          fontSize: 15,
          color: "#0B3F9F",
          letterSpacing: 0.4,
        },
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTransparent: true,
          headerShown: false
        }}
      />
    </AuthStack.Navigator>
  );
}