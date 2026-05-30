import { ActivityIndicator, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import AdminRoutes from "./admin.routes";

import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Routes() {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF2FB" }}>
        <StatusBar
          backgroundColor="#EEF2FB"
          barStyle="dark-content"
        />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="small" color="#FBBC05" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF2FB" }}>
      <StatusBar
        backgroundColor="#EEF2FB"
        barStyle="dark-content"
      />

      {!signed ? (
        <AuthRoutes />
      ) : user?.role === "ADMIN" ? (
        <AdminRoutes />
      ) : (
        <AppRoutes />
      )}
    </SafeAreaView>
  );
}