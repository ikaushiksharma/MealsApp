import React from "react";
import { HeaderButton, HeaderButtons } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    {...props}
  />
);

export const CustomHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={CustomHeaderButton} {...props} />;
};

export default CustomHeaderButtons;
