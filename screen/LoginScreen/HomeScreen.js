import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import AppMapView from './AppMapView';
import Header from '../Header';
import SearchBar from '../SearchBar';
import { UserLocationContext } from '../../app/Context/UserLocationContext';
import GlobalApi from './utills/GlobalApi';

export default function HomeScreen() {

  const {location,setLocation}=useContext(UserLocationContext);
  
  useEffect(()=>{
     location&&GetNearByPlace();
  },[location])

  const GetNearByPlace=()=>{
    const data={
      "includedTypes":["Veterinary_care"],
      "maxResultCount":10,
      "locationRestriction":{
        "circle":{
          "center":{
            "latitude":location?.latitude,
            "longitude":-location?.longitude
          },
          "radius":5000.0
          }
        }
      }
    
    GlobalApi.NewNearByPlaces(data).then(resp=>{
      console.log(JSON.stringify(resp.data));
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header/>
        <SearchBar searchedLocation={(location)=>console.log(location)}/>
      </View>
      <AppMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer:{
    position:'absolute',
    zIndex:10,
    padding:10,
    width:'100%',
    paddingHorizontal:20
  }
});
