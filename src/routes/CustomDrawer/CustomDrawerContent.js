import { StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { 
   ViewDataUser, ViewDataUserView, ViewDataUserImg, ViewDataUserInfo, ViewDataUserInfoName, ViewDataUserInfoEmail, 
   ViewNav, ViewNavLink, ViewNavLinkText, ViewNavLinkTextExit 
} from "./CustomDrawerStyle.js"
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
         <ViewDataUser>
            <ViewDataUserView>
               {user?.photoURL ? (
                  <ViewDataUserImg source={{uri: user.photoURL}} resizeMode="cover" /> 
               ) : (
                  <ViewDataUserImg source={noPhoto} resizeMode="cover" /> 
               )}
            </ViewDataUserView>

            <ViewDataUserInfo>
               <ViewDataUserInfoName style={style.userDataInfoName}>{user.displayName}</ViewDataUserInfoName>
               <ViewDataUserInfoEmail style={style.userDataInfoEmail}>{user.email}</ViewDataUserInfoEmail>
            </ViewDataUserInfo>
         </ViewDataUser>

         <ViewNav>
            <ViewNavLink active={activeRoute.name === 'Contato'} onPress={() => navigation.navigate('Contato')}>
               <Icon name="home" size={24} color={activeRoute.name === 'Contato' ? '#fff' : '#000'}  />
               <ViewNavLinkText active={activeRoute.name === 'Contato'}>Tela Principal</ViewNavLinkText>
            </ViewNavLink>

            <ViewNavLink active={activeRoute.name === 'Favorito'} onPress={() => navigation.navigate('Favorito')}>
               <Icon name="heart" size={24} color={activeRoute.name === 'Favorito' ? '#fff' : '#000'}  />
               <ViewNavLinkText active={activeRoute.name === 'Favorito'}>Meus Favoritos</ViewNavLinkText>
            </ViewNavLink>

            <ViewNavLink onPress={() => navigation.navigate('EditarPerfil')}>
               <Icon name="settings" size={24} color="#1A1E23"  />
               <ViewNavLinkText>Editar Perfil</ViewNavLinkText>
            </ViewNavLink>

            <ViewNavLink onPress={() => logOut()}>
               <Icon name="log-out" size={24} color="#FF6348" />
               <ViewNavLinkTextExit>Sair</ViewNavLinkTextExit>
            </ViewNavLink>
         </ViewNav>
     </DrawerContentScrollView>
   );
};

const style = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 84,
      paddingHorizontal: 24,
      backgroundColor: '#FFFFFF',
   }
})

export default CustomDrawerContent;
