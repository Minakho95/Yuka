import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// import Images from "./Images";

export default function CircleColor({ rate, elem }) {
  return (
    <View>
      <FontAwesome
        name="circle"
        size={18}
        style={{ color: "green", marginLeft: 5 }}
      />
    </View>
  );
}
