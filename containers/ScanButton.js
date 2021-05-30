import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  Platform,
  StyleSheet,
} from "react-native";

export default function ScanButton() {
  const scanNavigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.barcode}
      onPress={() => {
        scanNavigation.navigate("Camera");
      }}
    >
      <MaterialCommunityIcons name="barcode-scan" size={25} color="white" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  barcode: {
    position: "absolute",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    right: 30,
    bottom: 50,
    borderRadius: 50,
  },
});
