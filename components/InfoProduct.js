import React from "react";
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

export default function InfoProduct({ productData }) {
  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.infoTitle}>
            <Text>Qualité</Text>
            <Text>
              {" "}
              {productData.nutriscore_data.is_beverage
                ? "Pour 100ml"
                : "Pour 100g"}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            {productData.nutriscore_data.proteins >= 8 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Protéines</Text>
                </View>
                <Text>{productData.nutriments.proteins_100g}g</Text>
              </View>
            )}
            {productData.nutriscore_data.fiber >= 3.5 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Fibres</Text>
                </View>
                <Text>{productData.nutriments.fiber_100g}g</Text>
              </View>
            )}
            {productData.nutriscore_data.energy_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Calories</Text>
                </View>
                <Text>{productData.nutriments["energy-kcal_100g"]}g</Text>
              </View>
            )}
            {productData.nutriscore_data.sugars_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Sucre</Text>
                </View>
                <Text>{productData.nutriments.sugars_100g}g</Text>
              </View>
            )}
            {productData.nutriscore_data.saturated_fat_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Graisses saturées</Text>
                </View>
                <Text>{productData.nutriscore_data.saturated_fat}g</Text>
              </View>
            )}
            {productData.nutriscore_data.sodium_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Sel</Text>
                </View>
                <Text>{productData.nutriments.salt_100g}g</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.defaults}>
        <View style={styles.container}>
          <View style={styles.infoTitle}>
            <Text>Défauts</Text>
            <Text>
              {" "}
              {productData.nutriscore_data.is_beverage
                ? "Pour 100ml"
                : "Pour 100g"}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            {productData.nutriscore_data.is_beverage ? (
              <View></View>
            ) : (
              productData.nutriscore_data.proteins < 8 && (
                <View style={styles.infoLine}>
                  <View style={styles.infoLineLeft}>
                    <Text>Protéines</Text>
                  </View>
                  <Text>{productData.nutriments.proteins_100g}g</Text>
                </View>
              )
            )}
            {productData.nutriscore_data.is_beverage ? (
              <View></View>
            ) : (
              productData.nutriscore_data.fiber < 3.5 && (
                <View style={styles.infoLine}>
                  <View style={styles.infoLineLeft}>
                    <Text>Fibres</Text>
                  </View>
                  <Text>{productData.nutriscore_data.fiber}g</Text>
                </View>
              )
            )}
            {productData.nutriscore_data.energy_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Calories</Text>
                </View>
                <Text>{productData.nutriments["energy-kcal_100g"]}g</Text>
              </View>
            )}
            {productData.nutriscore_data.sugars_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Sucre</Text>
                </View>
                <Text>{productData.nutriments.sugars_100g}g</Text>
              </View>
            )}
            {productData.nutriscore_data.saturated_fat_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Graisses saturées</Text>
                </View>
                <Text>{productData.nutriscore_data.saturated_fat}g</Text>
              </View>
            )}
            {productData.nutriscore_data.sodium_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Text>Sel</Text>
                </View>
                <Text>{productData.nutriments.salt_100g}g</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginTop: 15,
  },
  infoLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  defaults: {
    marginTop: 15,
    borderTopWidth: 10,
    borderTopColor: "#dee1e8",
  },
});
