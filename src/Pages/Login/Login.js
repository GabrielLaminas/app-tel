import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { 
   MainView, MainTitle, ViewIcon, ContainerInput, TextLabel, 
   Input, ButtonContaText, ButtonEntrar, ButtonEntrarText
} from './LoginStyle.js';
import Icon from "react-native-vector-icons/Feather";

function Login() {
   return (
      <MainView>
         <MainTitle>LISTA TELEFONICA</MainTitle>

         <ViewIcon>
            <Icon name="phone" size={60} color="#fff" />
         </ViewIcon>

         <ContainerInput>
            <View>
               <TextLabel nativeID="formLabelEmail">Email</TextLabel>
               <Input 
                  accessibilityLabel="input"
                  accessibilityLabelledBy="formLabelEmail"
               />
            </View>

            <View>
               <TextLabel nativeID="formLabelSenha">Senha</TextLabel>
               <Input
                  accessibilityLabel="input"
                  accessibilityLabelledBy="formLabelSenha"
               />
            </View>
         </ContainerInput>

         <TouchableOpacity>
            <ButtonContaText>Criar uma conta</ButtonContaText>
         </TouchableOpacity>

         <ButtonEntrar>
            <ButtonEntrarText>Entrar</ButtonEntrarText>
         </ButtonEntrar>
      </MainView>
   );
}
export default Login;