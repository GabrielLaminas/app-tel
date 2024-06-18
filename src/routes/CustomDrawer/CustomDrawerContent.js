import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

import { useNavigationState } from '@react-navigation/native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const CustomDrawerContent = ({ navigation, user, logOut }) => {
   const state = useNavigationState(state => state);
   const noPhoto = require('../../Assets/Images/no-user.png');

   const getActiveRoute = (state) => {
      const route = state.routes[state.index];
      if (route.state) {
         return getActiveRoute(route.state);
      }
      return route;
   };
   const activeRoute = getActiveRoute(state);

   return (
     <DrawerContentScrollView {...navigation} style={style.container}>
         <View style={style.userData}>
            <View style={style.userDataPhoto}>
               {user?.photoURL ? (
                  <Image source={{uri: user.photoURL}} resizeMode="cover" style={style.userDataPhotoImg} /> 
               ) : (
                  <Image source={noPhoto} resizeMode="cover" style={style.userDataPhotoImg} /> 
               )}
            </View>
            <View style={style.userDataInfo}>
               <Text style={style.userDataInfoName}>{user.displayName}</Text>
               <Text style={style.userDataInfoEmail}>{user.email}</Text>
            </View>
         </View>

         <View style={style.userNavLink}>
            <TouchableOpacity style={[style.userNavLinkButton, activeRoute.name === 'Contato' && style.userNavLinkButtonActive]} onPress={() => navigation.navigate('Contato')}>
               <Icon name="home" size={24} color={activeRoute.name === 'Contato' ? '#fff' : '#000'}  />
               <Text style={[style.userNavLinkButtonText, activeRoute.name === 'Contato' && style.userNavLinkButtonTextActive]}>Tela Principal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.userNavLinkButton} onPress={() => navigation.navigate('EditarPerfil')}>
               <Icon name="settings" size={24} color="black"  />
               <Text style={style.userNavLinkButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.userNavLinkButton} onPress={() => logOut()}>
               <Icon name="log-out" size={22} color="red"  />
               <Text style={[style.userNavLinkButtonText, style.userNavLinkButtonTextRed]}>Sair</Text>
            </TouchableOpacity>
         </View>
     </DrawerContentScrollView>
   );
};

const style = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 32,
      paddingHorizontal: 16,
   },
   userData: {
      marginBottom: 32,
      gap: 12,
      alignItems: 'center',
   },
   userDataPhoto: {
      width: 160,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 999,
      overflow: 'hidden',
   },
   userDataPhotoImg: {
      width: '100%',
      height: '100%',
   },
   userDataInfo: {
      gap: 8
   },
   userDataInfoName: {
      fontSize: 20,
      fontWeight: "500",
      textAlign: 'center'
   },
   userDataInfoEmail: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: 'center'
   },
   userNavLink: {
      gap: 8,
   },
   userNavLinkButton: {
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 6,
   },
   userNavLinkButtonActive: {
      backgroundColor: 'gray',
   },
   userNavLinkButtonText: {
      fontSize: 16,
   },
   userNavLinkButtonTextRed: {
      color: 'red'
   },
   userNavLinkButtonTextActive: {
      color: '#fff'
   }
})

export default CustomDrawerContent;
