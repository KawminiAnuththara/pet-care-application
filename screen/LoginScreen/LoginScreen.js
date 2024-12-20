import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../LoginScreen/utills/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/WarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession(); 

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        
      } else {
        console.log('No session created');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logoo.png')}
        style={styles.logoImage}
      />
      <Image
        source={require('../../assets/images/doggroup.png')}
        style={styles.bgImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Find the Nearest Veterinary Clinic for Your Beloved Pet
        </Text>
        <Text style={styles.desc}>
          Ensure your furry friends receive the best care by finding trusted
          vets in your area in just a few taps.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>
          Let's Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Outfit-bold',
    textAlign: 'center',
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'Outfit',
    marginTop: 15,
    textAlign: 'center',
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontSize: 17,
    paddingHorizontal: 30,
  },
  bgImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
  },
});
