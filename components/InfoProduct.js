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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CircleColor from "./CircleColor";
import { FontAwesome } from "@expo/vector-icons";

export default function InfoProduct({ productData }) {
  const handleScore = () => {};
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
                  <FontAwesome5 name="fish" size={24} color="grey" />
                  <Text style={styles.textLeft}>Protéines</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text>{productData.nutriments.proteins_100g} g</Text>
                  <CircleColor
                    rate={productData.nutriscore_data.proteins_points}
                    elem="Protéines"
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.fiber >= 3.5 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <MaterialCommunityIcons name="corn" size={24} color="grey" />
                  <Text style={styles.textLeft}>Fibres</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text>{productData.nutriments.fiber_100g} g</Text>
                  <CircleColor
                    rate={productData.nutriscore_data.fiber_points}
                    elem="Fibres"
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.energy_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <FontAwesome5 name="burn" size={24} color="grey" />
                  <Text style={styles.textLeft}>Calories</Text>
                </View>
                {productData.nutriments["energy-kcal_100g"] ? (
                  <View style={styles.infoRight}>
                    <Text style={styles.textLeft}>
                      {productData.nutriments["energy-kcal_100g"]} kcal
                    </Text>
                    <CircleColor
                      rate={productData.nutriscore_data.energy_points}
                      elem="Calories"
                    />
                  </View>
                ) : (
                  <Text>0 kcal</Text>
                )}
              </View>
            )}
            {productData.nutriscore_data.sugars_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <MaterialCommunityIcons
                    name="spoon-sugar"
                    size={24}
                    color="grey"
                  />
                  <Text style={styles.textLeft}>Sucre</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text>{productData.nutriscore_data.sugars_value} g</Text>
                  <CircleColor
                    rate={productData.nutriscore_data.sugars_points}
                    elem="Sucre"
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.saturated_fat_points <= 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Ionicons name="water-sharp" size={24} color="grey" />
                  <Text style={styles.textLeft}>Graisses saturées</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text>
                    {productData.nutriscore_data.saturated_fat_value} g
                  </Text>
                  <CircleColor
                    rate={productData.nutriscore_data.saturated_fat_points}
                    elem="Graisses"
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.is_beverage ? (
              <View></View>
            ) : (
              productData.nutriscore_data.sodium_points <= 2 && (
                <View style={styles.infoLine}>
                  <View style={styles.infoLineLeft}>
                    <MaterialCommunityIcons
                      name="food-variant"
                      size={24}
                      color="grey"
                    />
                    <Text style={styles.textLeft}>Sel</Text>
                  </View>
                  <View style={styles.infoRight}>
                    <Text>{productData.nutriments.salt_100g} g</Text>
                    <CircleColor
                      rate={productData.nutriscore_data.sodium_points}
                      elem="Sel"
                    />
                  </View>
                </View>
              )
            )}
          </View>
        </View>
      </View>
      {/* DEFAUTS ********************************************************************/}
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
                    <FontAwesome5 name="fish" size={24} color="grey" />
                    <Text style={styles.textLeft}>Protéines</Text>
                  </View>
                  <View style={styles.infoRight}>
                    <Text>{productData.nutriments.proteins_100g} g</Text>
                    <FontAwesome
                      name="circle"
                      size={18}
                      style={{ color: "red", marginLeft: 5 }}
                    />
                  </View>
                </View>
              )
            )}
            {productData.nutriscore_data.is_beverage ? (
              <View></View>
            ) : (
              productData.nutriscore_data.fiber < 3.5 && (
                <View style={styles.infoLine}>
                  <View style={styles.infoLineLeft}>
                    <MaterialCommunityIcons
                      name="corn"
                      size={24}
                      color="grey"
                    />
                    <Text style={styles.textLeft}>Fibres</Text>
                  </View>
                  <View style={styles.infoRight}>
                    <Text>{productData.nutriments.fiber_100g} g</Text>
                    <FontAwesome
                      name="circle"
                      size={18}
                      style={{ color: "red", marginLeft: 5 }}
                    />
                  </View>
                </View>
              )
            )}
            {productData.nutriscore_data.energy_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <FontAwesome5 name="burn" size={24} color="grey" />
                  <Text style={styles.textLeft}>Calories</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text style={styles.textLeft}>
                    {productData.nutriments["energy-kcal_100g"]} kcal
                  </Text>
                  <FontAwesome
                    name="circle"
                    size={18}
                    style={{ color: "red", marginLeft: 5 }}
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.sugars_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <MaterialCommunityIcons
                    name="spoon-sugar"
                    size={24}
                    color="grey"
                  />
                  <Text style={styles.textLeft}>Sucre</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text>{productData.nutriscore_data.sugars_value} g</Text>
                  <FontAwesome
                    name="circle"
                    size={18}
                    style={{ color: "red", marginLeft: 5 }}
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.saturated_fat_points > 2 && (
              <View style={styles.infoLine}>
                <View style={styles.infoLineLeft}>
                  <Ionicons name="water-sharp" size={24} color="grey" />
                  <Text style={styles.textLeft}>Graisses saturées</Text>
                </View>
                <View style={styles.infoRight}>
                  <Text>
                    {productData.nutriscore_data.saturated_fat_value} g
                  </Text>
                  <FontAwesome
                    name="circle"
                    size={18}
                    style={{ color: "red", marginLeft: 5 }}
                  />
                </View>
              </View>
            )}
            {productData.nutriscore_data.is_beverage ? (
              <View></View>
            ) : (
              productData.nutriscore_data.sodium_points > 2 && (
                <View style={styles.infoLine}>
                  <View style={styles.infoLineLeft}>
                    <MaterialCommunityIcons
                      name="food-variant"
                      size={24}
                      color="grey"
                    />
                    <Text style={styles.textLeft}>Sel</Text>
                  </View>
                  <View style={styles.infoRight}>
                    <Text>{productData.nutriments.salt_100g} g</Text>
                    <FontAwesome
                      name="circle"
                      size={18}
                      style={{ color: "red", marginLeft: 5 }}
                    />
                  </View>
                </View>
              )
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
  infoLineLeft: {
    flexDirection: "row",
  },
  infoRight: {
    flexDirection: "row",
  },
  textLeft: {
    marginLeft: 10,
  },
  defaults: {
    marginTop: 15,
    borderTopWidth: 10,
    borderTopColor: "#dee1e8",
  },
});
