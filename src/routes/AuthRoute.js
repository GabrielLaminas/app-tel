import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Login from "../Pages/Login/Login";
import Conta from "../Pages/Conta/Conta";

const Stack = createStackNavigator();

export default function AuthRoute() {
   return (
      <Stack.Navigator initialRouteName="Login">
         <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ 
               headerShown: false
            }}
         />
         <Stack.Screen 
            name="Conta" 
            component={Conta}
            options={configHeader} 
         />   
      </Stack.Navigator>
   );
}

const configHeader = {
   headerShown: false
}
