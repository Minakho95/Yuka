import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import ProductListScreen from "./containers/ProductListScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import ScanButton from "./containers/ScanButton";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [dataBarCode, setDataBarCode] = useState("");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          options={{
            headerShown: false,
          }}
        >
          {() => (
            <>
              <Tab.Navigator
                style={styles.tab}
                tabBarOptions={{
                  activeTintColor: "green",
                  inactiveTintColor: "gray",
                }}
              >
                {/* PRODUCT LIST */}
                <Tab.Screen
                  name="ProductList"
                  options={{
                    tabBarLabel: "ProductList",
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      {/* PRODUCT LISTS SCREEN */}
                      <Stack.Screen
                        name="ProductList"
                        options={{ headerShown: false }}
                      >
                        {(props) => (
                          <ProductListScreen
                            {...props}
                            dataBarCode={dataBarCode}
                          />
                        )}
                      </Stack.Screen>
                      {/* PRODUIT SCREEN */}
                      <Stack.Screen
                        name="Product"
                        options={{ headerShown: false, title: "Product" }}
                      >
                        {(props) => <ProductScreen {...props} />}
                      </Stack.Screen>
                      {/* CAMERA SCREEN */}
                      <Stack.Screen
                        name="Camera"
                        options={{ headerShown: false }}
                      >
                        {(props) => (
                          <CameraScreen
                            {...props}
                            setDataBarCode={setDataBarCode}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* FAVORITE */}
                <Tab.Screen
                  name="Favorite"
                  options={{
                    tabBarLabel: "Favorite",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => <FavoritesScreen />}
                </Tab.Screen>
              </Tab.Navigator>
              {/* SCAN BUTTON */}
              <ScanButton />
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 50,
  },
});
