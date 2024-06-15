import React from "react";
import Contato from "../Pages/Contato/Contato";
import ContatoUsuario from "../Pages/ContatoUsuario/ContatoUsuario";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import { UserContext } from "../context/userContext";
import EditarPerfil from "../Pages/EditarPerfil/EditarPerfil";

import CustomDrawerContent from "./CustomDrawer/CustomDrawerContent";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
