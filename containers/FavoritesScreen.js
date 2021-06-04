import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import {
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function FavoritesScreen({ favoriteStorage, navigation }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const newTab = [];
      if (favoriteStorage) {
        for (let i = 0; i < favoriteStorage.length; i++) {
          const response = await axios.get(
            `https://fr.openfoodfacts.org/api/v0/product/${favoriteStorage[i]}.json`
          );
          newTab.push(response.data);
        }
      }
      setData(newTab);
      setIsLoading(false);
    };
    fetchData();
  }, [favoriteStorage]);

  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.code)}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate("Product", {
                  fromFav: "true",
                  productCode: item.code,
                });
              }}
            >
              <Product productData={item.product} navigation={navigation} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
