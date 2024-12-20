import { View, StyleSheet, ImageBackground, Image } from "react-native";
import React, { useRef, useEffect } from "react";
import Colors from "./utills/Colors";
import LottieView from "lottie-react-native";

export default function LoaderScreen({ navigation }) {
  const animation = useRef(null);

  useEffect(() => {
    // Simulate a loading period before navigating to the LoginScreen
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 3000); // Adjust the time as needed
  }, [navigation]);

  return (
    <View style={styles.animationContainer}>
      <ImageBackground 
        style={styles.bgImage}
        source={require('../../assets/images/dogpow.png')}
        blurRadius={5} // Apply blur effect
      >
        <View style={styles.centerContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/log.png')}
          />
          <LottieView
            autoPlay
            ref={animation}
            style={styles.loader}
            source={require('../../assets/images/loader.json')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 150,
    marginBottom: 20,
  },
  loader: {
    width: 200,
    height: 200,
  },
});
