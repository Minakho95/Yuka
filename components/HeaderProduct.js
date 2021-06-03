import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// import Images from "./Images";

export default function HeaderProduct({ productData }) {
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleImg = () => {
    let scoreLetter = productData.nutriscore_grade;
    if (scoreLetter === "a") {
      return require("./nutriscore-a.png");
    } else if (scoreLetter === "b") {
      return require("./nutriscore-b.png");
    } else if (scoreLetter === "c") {
      return require("./nutriscore-c.png");
    } else if (scoreLetter === "d") {
      return require("./nutriscore-d.jpg");
    } else if (scoreLetter === "e") {
      return require("./nutriscore-e.png");
    }
  };
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Image
          style={styles.headerImg}
          source={{ uri: productData.image_url }}
        ></Image>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>
            {Capitalize(productData.product_name)}
          </Text>
          <Text>{Capitalize(productData.brands)}</Text>
          <Image source={handleImg()} style={styles.nutriscore}></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 10,
    borderBottomColor: "#dee1e8",
  },
  container: {
    flexDirection: "row",
    margin: 10,
  },
  headerImg: {
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
  headerText: {
    marginLeft: 20,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  nutriscore: {
    width: 100,
    resizeMode: "contain",
    height: 100,
  },
});
