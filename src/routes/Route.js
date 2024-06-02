import { View, ActivityIndicator } from "react-native";
import React from "react";
import Reload from "../Pages/Reload/Reload";
import {NavigationContainer} from '@react-navigation/native';
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import { UserContext } from "../context/userContext";

export default function Route() {
   const { credential, loading } = React.useContext(UserContext)

   if(loading){
      return <Reload />
   }

   return (
      <NavigationContainer>
         { credential ? <UserRoute /> : <AuthRoute /> }
      </NavigationContainer>
   );
}