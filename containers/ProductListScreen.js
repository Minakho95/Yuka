import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";

// HomeScreen reçoit la props navigation
export default function ProducListScreen({ navigation, dataBarCode }) {
  const [isLoading, setIsloading] = useState(true);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("Product");
        }}
      >
        <View>
          <Text>{dataBarCode}</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.barcode}
        onPress={() => {
          navigation.navigate("Camera");
        }}
      >
        <MaterialCommunityIcons name="barcode-scan" size={25} color="white" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  barcode: {
    position: "absolute",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    right: 0,
    top: 100,
    borderRadius: 50,
  },
});
