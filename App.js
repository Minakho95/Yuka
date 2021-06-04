import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductListScreen from "./containers/ProductListScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import ScanButton from "./containers/ScanButton";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [productStorage, setProductStorage] = useState([]);
  const [favoriteStorage, setFavoriteStorage] = useState([]);

  useEffect(() => {
    const dataAsync = async () => {
      const stored = await AsyncStorage.getItem("products");
      const storedFav = await AsyncStorage.getItem("favorites");
      setProductStorage(JSON.parse(stored));
      setFavoriteStorage(JSON.parse(storedFav));
    };

    dataAsync();
  }, []);
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
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === "ProductList") {
                      iconName = focused ? "fast-food" : "fast-food-outline";
                    } else if (route.name === "Favorite") {
                      iconName = focused ? "star" : "star-outline";
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={22} color="white" />;
                  },
                })}
                tabBarOptions={{
                  showLabel: false,
                  showIcon: true,
                  style: { backgroundColor: "#5dcc71" },
                  indicatorStyle: {
                    backgroundColor: "white",
                  },
                  activeTintColor: "white",
                  inactiveTintColor: "white",
                }}
              >
                {/* PRODUCT LIST */}
                <Tab.Screen name="ProductList">
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
                            productStorage={productStorage}
                            setProductStorage={setProductStorage}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* FAVORITE */}
                <Tab.Screen name="Favorite">
                  {(props) => (
                    <FavoritesScreen
                      {...props}
                      favoriteStorage={favoriteStorage}
                      setFavoriteStorage={setFavoriteStorage}
                    />
                  )}
                </Tab.Screen>
              </Tab.Navigator>
              {/* SCAN BUTTON */}
              <ScanButton />
            </>
          )}
        </Stack.Screen>
        {/* CAMERA SCREEN */}
        <Stack.Screen name="Camera" options={{ headerShown: false }}>
          {(props) => (
            <CameraScreen
              {...props}
              setProductStorage={setProductStorage}
              productStorage={productStorage}
            />
          )}
        </Stack.Screen>
        {/* PRODUIT SCREEN */}
        <Stack.Screen
          name="Product"
          options={{ headerShown: false, title: "Product" }}
        >
          {(props) => (
            <ProductScreen
              {...props}
              setFavoriteStorage={setFavoriteStorage}
              favoriteStorage={favoriteStorage}
            />
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
    marginTop: Platform.OS === "android" ? 0 : 50,
  },
});
