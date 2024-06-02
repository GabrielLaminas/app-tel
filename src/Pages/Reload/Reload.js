import { View, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React from "react";

export default function Reload() {
   return (
      <View style={style.container}>
         <View style={style.icon}>
            <Icon name="phone" size={60} color="#fff" />
         </View>
         
         <ActivityIndicator size={32} color="#E6EBEF" />
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 42,
      backgroundColor: '#1e272e'
   },
   icon: {
      padding: 24,
      borderWidth: 2,
      borderColor: '#28343E',
      borderRadius: 999
   }
});