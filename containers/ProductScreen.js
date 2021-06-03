import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import HeaderProduct from "../components/HeaderProduct";
import InfoProduct from "../components/InfoProduct";

export default function ProductScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const code = route.params.productCode;
      const response = await axios.get(
        `https://fr.openfoodfacts.org/api/v0/product/${code}.json`
      );
      if (response.data.code) {
        setProductData(response.data.product);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color="green" />
  ) : (
    <>
      <View style={styles.greenBar}>
        <Ionicons
          name="arrow-back"
          size={22}
          onPress={() => {
            navigation.goBack();
          }}
        />
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
  },
});
