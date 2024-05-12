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
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
