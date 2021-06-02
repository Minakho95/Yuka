import React from "react";
import { View, Text, Button } from "react-native";

export default function ProductScreen({ navigation }) {
  console.log("test");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Product Screen</Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack("Home");
        }}
      ></Button>
    </View>
  );
}
