import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Dashboard from "../pages/admin/Dashboard";
import GerenciarOcorrencias from "../pages/admin/GerenciarOcorrencias";
import GerenciarComentarios from "../pages/admin/GerenciarComentarios";
import Perfil from "../pages/Perfil";

const Tab = createBottomTabNavigator();

export default function AdminRoutes() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1B4FBB",
        tabBarInactiveTintColor: "#9AA9CC",
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom || 10,
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#E4EAF7",
          elevation: 8,
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather name="bar-chart-2" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ocorrencias"
        component={GerenciarOcorrencias}
        options={{
          title: "Ocorrências",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="alert-circle" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Comentarios"
        component={GerenciarComentarios}
        options={{
          title: "Comentários",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="message-circle" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}