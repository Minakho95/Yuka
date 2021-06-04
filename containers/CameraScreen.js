import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
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

export default function CameraScreen({ setProductStorage, productStorage }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productData, setProductData] = useState();
  const [barCodeScanned, setbarCodeScanned] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fr.openfoodfacts.org/api/v0/product/${barCodeScanned}.json`
        );

        if (response.data.code) {
          // getting product data
          setProductData(response.data.product);

          // storing data in AsyncStorage (setProductStorage)
          let newProduct;
          if (
            productStorage &&
            productStorage.indexOf(barCodeScanned) === -1 &&
            productStorage.length > 0
          ) {
            newProduct = [...productStorage];
          } else if (productStorage.includes(barCodeScanned)) {
            alert("Ce produit est déjà dans la liste");
          } else {
            newProduct = [];
          }
          newProduct.push(barCodeScanned);
          await AsyncStorage.setItem("products", JSON.stringify(newProduct));
          setProductStorage(newProduct);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [barCodeScanned, scanned]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setbarCodeScanned(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        width: null,
        height: null,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
    // MODAL POP UP
  );
}
