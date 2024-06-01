import { View, ActivityIndicator } from "react-native";
import React from "react";

import {NavigationContainer} from '@react-navigation/native';
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import { UserContext } from "../context/userContext";

export default function Route() {
   const { credential, loading } = React.useContext(UserContext)

   if(loading){
      return (
         <View style={{
            flex: 1, justifyContent: "center", alignItems: 'center'
         }}>
            <ActivityIndicator size="large" color="blue" />
         </View>
      )
   }

   return (
      <NavigationContainer>
         { credential ? <UserRoute /> : <AuthRoute /> }
      </NavigationContainer>
   );
}
