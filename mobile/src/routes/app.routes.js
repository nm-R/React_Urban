import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "../pages/Home";
import Ocorrencias from "../pages/Ocorrencias";
import Perfil from "../pages/Perfil";

const Tab = createBottomTabNavigator();

function TabIcon({ icon, color, focused }) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? "#EEF4FF" : "transparent",
      }}
    >
      <Feather name={icon} size={focused ? 21 : 20} color={color} />
    </View>
  );
}

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#0B49B7",
        tabBarInactiveTintColor: "#94A3C7",

        tabBarStyle: {
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E7ECF7",
          elevation: 8,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          marginTop: -2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="home" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Ocorrencias"
        component={Ocorrencias}
        options={{
          tabBarLabel: "Ocorrências",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="alert-circle" color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="user" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}