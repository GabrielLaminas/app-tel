import {View, Text} from 'react-native';
import React from 'react';
import Login from './src/Pages/Login/Login.js';
import Conta from './src/Pages/Conta/Conta.js';
import Contato from './src/Pages/Contato/Contato.js';
import ContatoUsuario from './src/Pages/ContatoUsuario/ContatoUsuario.js';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contato">
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
        <Stack.Screen 
          name="Contato" 
          component={Contato} 
          options={configHeader} 
        />
        <Stack.Screen name="Usuario" component={ContatoUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const configHeader = {
  headerShown: false
}

export default App;
