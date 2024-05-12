import React from "react";
import { View, TouchableOpacity, ScrollView, Keyboard, Alert, ActivityIndicator } from "react-native";
import { 
   MainView, MainTitle, ViewIcon, ContainerInput, TextLabel, 
   Input, ButtonContaText, ButtonEntrar, ButtonEntrarText, ErrorText
} from './LoginStyle.js';

import Icon from "react-native-vector-icons/Feather";

import { auth } from "../../Firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

import { schemaLogin } from '../../Validation/validation.js';

function Login() {
   const [email, setEmail] = React.useState('');
   const [password, setPassWord] = React.useState('');
   const [feedback, setFeedback] = React.useState(null);
   const [laoding, setLoading] = React.useState(false);

   async function handleLogin(){
      try {
         setLoading(true);
         const result = await schemaLogin.validate({email, password}, {abortEarly: false});

         if(result.email && result.password){
            const { user } = await signInWithEmailAndPassword(auth, result.email, result.password);
            console.log(user)
         }
         setFeedback(null);
         setEmail('');
         setPassWord('');
      } catch (error) {
         const errors = {};
         if(error.inner){
            error.inner.forEach(error => {
               errors[error.path] = error.message;
            });
            setFeedback(errors);
         }
         if(error.code === 'auth/invalid-credential'){
            setFeedback(null);
            Alert.alert('Verificar se seu email e senha estão corretos')
         }
      } finally {
         Keyboard.dismiss();
         setLoading(false)
      }
   }

   return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <MainView>
         <MainTitle>LISTA TELEFONICA</MainTitle>

         <ViewIcon>
            <Icon name="phone" size={60} color="#fff" />
         </ViewIcon>

         <ContainerInput>
            <View>
               <TextLabel nativeID="formLabelEmail">Email</TextLabel>
               <Input 
                  autoFocus={true}
                  accessibilityLabel="input"
                  accessibilityLabelledBy="formLabelEmail"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text.trim())}
               />
               {feedback?.email && <ErrorText>{feedback.email}</ErrorText>}
            </View>

            <View>
               <TextLabel nativeID="formLabelSenha">Senha</TextLabel>
               <Input
                  accessibilityLabel="input"
                  accessibilityLabelledBy="formLabelSenha"
                  value={password}
                  onChangeText={(text) => setPassWord(text.trim())}
               />
               {feedback?.password && <ErrorText>{feedback.password}</ErrorText>}
            </View>
         </ContainerInput>

         <TouchableOpacity>
            <ButtonContaText>Criar uma conta</ButtonContaText>
         </TouchableOpacity>

         <ButtonEntrar onPress={handleLogin} color={email && password} disabled={email && password ? false : true}>
            {
               laoding 
               ? <ActivityIndicator size={27} color="#fff" />
               : <ButtonEntrarText>Entrar</ButtonEntrarText>
            }
         </ButtonEntrar>
      </MainView>
      </ScrollView>
   );
}
export default Login;