import React from "react";
import Contato from "../Pages/Contato/Contato";
import ContatoUsuario from "../Pages/ContatoUsuario/ContatoUsuario";

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function UserRoute() {
   return (
      <Stack.Navigator initialRouteName="Contato">
         <Stack.Screen 
            name="Contato" 
            component={Contato} 
            options={configHeader} 
         />
         <Stack.Screen 
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
      </Stack.Navigator>
   );
}

const configHeader = {
   headerShown: false
}
