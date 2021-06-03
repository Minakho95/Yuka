import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
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
  StatusBar,
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
      {isNotEmpty ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.code)}
          renderItem={({ item }) => {
            const handleScore = () => {
              const score = item.product.nutriscore_grade;
              let scoreColor;
              let scoreText;
              if (score === "a") {
                scoreText = "Excellent";
                scoreColor = "#028141";
              } else if (score === "b") {
                scoreText = "Bon";
                scoreColor = "#85BB2F";
              } else if (score === "c") {
                scoreText = "Moyen";
                scoreColor = "#FECB03";
              } else if (score === "d") {
                scoreText = "Mauvais";
                scoreColor = "#EE8100";
              } else if (score === "e") {
                scoreText = "Très mauvais";
                scoreColor = "#E63D11";
              } else if (score === null) {
                scoreText = "Pas de note";
                scoreColor = "grey";
              }
              return { scoreColor: scoreColor, scoreText: scoreText };
            };
            const { scoreColor, scoreText } = handleScore();
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  navigation.navigate("Product", {
                    productCode: item.code,
                  });
                }}
              >
                <View style={styles.list}>
                  <Image
                    style={styles.listImg}
                    source={{ uri: item.product.image_url }}
                  ></Image>
                  <View style={styles.listText}>
                    <Text style={styles.productName}>
                      {item.product.product_name}
                    </Text>
                    <Text>{item.product.brands}</Text>
                    <View style={styles.productRating}>
                      <FontAwesome
                        name="circle"
                        size={18}
                        style={{ color: scoreColor }}
                      />
                      <Text style={styles.textRating}>{scoreText}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text>Scannez un produit</Text>
      )}
      <TouchableOpacity
        style={{ height: 44 }}
        onPress={() => {
          handleDelete();
        }}
      >
        <Text>Delete products</Text>
      </TouchableOpacity>
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
  listImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  list: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  productName: {
    fontWeight: "bold",
  },
  productRating: {
    flexDirection: "row",
  },
  textRating: {
    marginLeft: 5,
  },
});
