import React from "react";
import Contato from "../Pages/Contato/Contato";
import ContatoUsuario from "../Pages/ContatoUsuario/ContatoUsuario";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useNavigationState } from '@react-navigation/native';

import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import { UserContext } from "../context/userContext";
import EditarPerfil from "../Pages/EditarPerfil/EditarPerfil";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent({ navigation, user, logOut }) {
   const state = useNavigationState(state => state);
   
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
                  <View style={style.userDataPhotoImg}>
                     <Text>{user.displayName[0]}</Text>
                  </View>
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
               <Text style={[style.userNavLinkButtonText, activeRoute.name === 'Contato' && style.userNavLinkButtonTextActive]}>Home</Text>
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
}

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
      justifyContent: 'center',
      alignItems: 'center',
   },
   userDataPhotoImg: {
      width: 160,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 999,
      overflow: 'hidden'
   },
   userDataPhotoText: {
      fontSize: 32,
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

function Root(){
   const { credential, logOut } = React.useContext(UserContext);

   return (
      <Drawer.Navigator
         initialRouteName="Contato" 
         drawerContent={(props) => <CustomDrawerContent {...props} user={credential} logOut={logOut} />}
      >
         <Drawer.Screen 
            name="Contato" 
            component={Contato}
            options={{
               headerTitle: '',
               headerShadowVisible: false,
               headerStyle: {
                  backgroundColor: 'transparent'
               }
            }} 
         />
         <Drawer.Screen 
            name="Usuario"
            component={ContatoUsuario} 
            options={{
               headerTitle: '',
               headerStyle: {
                  backgroundColor: 'transparent'
               },
               headerShadowVisible: false
            }} 
         />
      </Drawer.Navigator>
   )
}

export default function UserRoute() {
   return (
      <Stack.Navigator>
         <Stack.Screen 
            name="Root" 
            component={Root} 
            options={configHeader} 
         />

         <Stack.Screen 
            name="EditarPerfil"
            component={EditarPerfil}
            //options={configHeader}
         />
      </Stack.Navigator>
   );
}

const configHeader = {
   headerShown: false
}
