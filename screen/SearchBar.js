import { View, Text } from 'react-native'
import React from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import Colors from './LoginScreen/utills/Colors';
import { Ionicons } from '@expo/vector-icons';

const mapApiJs="https://maps.googleapis.com/maps/api/js";

export default function SearchBar() {
  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      marginTop:15,
      paddingHorizontal:5,
      backgroundColor:Colors.WHITE,
      borderRadius:6
    }}>
      <Ionicons name="location-sharp" size={24} color={Colors.GRAY}  style={{paddingTop:10}}/>

      <GooglePlacesAutocomplete
      placeholder='Search PetCare Center'
      fetchDetails={true}
      enablePoweredByContainer={false}
      onPress={(data,details=null)=>{
        
        searchedLocation(details?.geometry?.location);
      }}
      query={{
        key:'AIzaSyAdxgOhJzlhkLLiZXRYA63K2r5YlT0J3vE',
        language:'en',
      }}
    />
    </View>
  )
}