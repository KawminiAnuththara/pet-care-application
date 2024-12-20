import { View, Text, StatusBar } from "react-native";
import React, { useCallback, useEffect,useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "../screen/LoginScreen/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import HomeScreen from "../screen/LoginScreen/HomeScreen";
import TabNavigation from "../screen/Navigations/TabNavigation";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from 'expo-location';
import { UserLocationContext } from "./Context/UserLocationContext";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
 
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Error getting token:", err);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },
};

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-medium": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_Z3VpZGluZy1tb2xseS0zMi5jbGVyay5hY2NvdW50cy5kZXYk"

    >
      <UserLocationContext.Provider
      value={{location,setLocation}}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <SignedIn>
          <NavigationContainer independent={true}>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>

        <StatusBar style="auto" />
      </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}
