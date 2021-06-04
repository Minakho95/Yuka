import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import {
  View,
  Text,
  Image,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Product({ navigation, productData }) {
  const handleScore = () => {
    const score = productData.nutriscore_grade;
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
    <View style={styles.list}>
      <Image
        style={styles.listImg}
        source={{ uri: productData.image_url }}
      ></Image>
      <View style={styles.listText}>
        <Text style={styles.productName}>{productData.product_name}</Text>
        <Text>{productData.brands}</Text>
        <View style={styles.productRating}>
          <FontAwesome name="circle" size={18} style={{ color: scoreColor }} />
          <Text style={styles.textRating}>{scoreText}</Text>
        </View>
      </View>
    </View>
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
