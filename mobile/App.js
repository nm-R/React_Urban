import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0B49B7" }}>
        <StatusBar
          style="light"
          backgroundColor="#0B49B7"
          translucent={false}
        />

        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}