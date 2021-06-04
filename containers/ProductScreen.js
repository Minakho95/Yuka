import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View, StyleSheet, ScrollView } from "react-native";

import HeaderProduct from "../components/HeaderProduct";
import InfoProduct from "../components/InfoProduct";

export default function ProductScreen({
  route,
  navigation,
  setFavoriteStorage,
  favoriteStorage,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const code = route.params.productCode;
  const fromFavScreen = route.params.fromFav;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://fr.openfoodfacts.org/api/v0/product/${code}.json`
      );
      if (response.data.code) {
        setProductData(response.data.product);
        setIsLoading(false);
        setIsFav(favoriteStorage.indexOf(code) === -1 ? false : true);
      }
    };
    fetchData();
  }, []);

  const handleFav = async () => {
    setFavLoading(true);
    const newTab = favoriteStorage ? [...favoriteStorage] : [];
    if (isFav) {
      newTab.splice(newTab.indexOf(code), 1);
      setIsFav(false);
    } else {
      newTab.push(code);
      setIsFav(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(newTab));
    setFavoriteStorage(newTab);
    setFavLoading(false);
  };

  const handleDelete = async (index) => {
    try {
      const newTab = [...favoriteStorage];
      newTab.splice(newTab.indexOf(index), 1);
      setFavoriteStorage(newTab);
      await AsyncStorage.removeItem(index);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  console.log();
  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <>
      <View style={styles.greenBar}>
        <Ionicons
          name="arrow-back"
          color="white"
          size={22}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* If onPress from favoriteScreen, hide star */}
        {fromFavScreen ? (
          <Ionicons
            name="trash-sharp"
            color="white"
            size={22}
            onPress={() => handleDelete(code)}
          />
        ) : favLoading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <Ionicons
            name={isFav ? "star" : "star-outline"}
            color="white"
            size={22}
            onPress={() => handleFav()}
          />
        )}
      </View>
      <ScrollView>
        <HeaderProduct productData={productData} />
        <InfoProduct productData={productData} />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  greenBar: {
    backgroundColor: "#5DCC71",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
