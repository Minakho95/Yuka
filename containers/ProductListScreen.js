import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Product from "../components/Product";
import {
  ActivityIndicator,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

// HomeScreen reçoit la props navigation
export default function ProducListScreen({
  navigation,
  productStorage,
  setProductStorage,
}) {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState(null);
  const [isNotEmpty, setIsNotEmpty] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const newTab = [];
      if (productStorage) {
        for (let i = 0; i < productStorage.length; i++) {
          const response = await axios.get(
            `https://fr.openfoodfacts.org/api/v0/product/${productStorage[i]}.json`
          );
          newTab.unshift(response.data);
        }
        setIsNotEmpty(true);
      } else {
        setIsNotEmpty(false);
      }
      setData(newTab);
      setIsloading(false);
    };
    fetchData();
  }, [productStorage]);

  const handleDelete = async () => {
    setIsNotEmpty(false);
    setProductStorage([]);
    await AsyncStorage.removeItem("products");
  };
  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <SafeAreaView>
      <StatusBar backgroundColor="green" />
      <TouchableOpacity
        onPress={() => {
          handleDelete();
        }}
      >
        <Text>Tout retirer</Text>
      </TouchableOpacity>
      {isNotEmpty ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.code)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  navigation.navigate("Product", {
                    productCode: item.code,
                  });
                }}
              >
                <Product productData={item.product} navigation={navigation} />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text>Scannez un produit</Text>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
