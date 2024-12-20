import { View, Text,Image ,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import Colors from './LoginScreen/utills/Colors';

export default function Header() {
    const {user}=useUser();
  return (
    <View style={styles.container}>
      <Image source={{uri:user?.imageUrl}}
        style={{width:45,height:45,borderRadius:99,marginLeft:10}}
      />
      <Image source={require('../assets/images/logoo.png')}
        style={{width:200,height:65,objectFit:'contain'}}
      />
      <FontAwesome name="filter" size={26} color="black"  style={{marginRight:10}}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        padding:5,
        
    }
})