import React from "react";
import { TouchableOpacity, ScrollView, Keyboard, Alert } from "react-native";
import { 
   MainView, ContainerInput, ViewConta, ViewContaText, ButtonContaText
} from './LoginStyle.js';

import Title from "../../Components/Title/Title.js";
import Input from "../../Components/Input/Input.js";
import { BtnSuccess } from "../../Components/Buttons/Buttons.js";

import { auth } from "../../Firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

import { schemaLogin } from '../../Validation/validation.js';
import { useNavigation } from "@react-navigation/native";

function Login() {
   const { navigate } = useNavigation();
   const [email, setEmail] = React.useState('');
   const [password, setPassWord] = React.useState('');
   const [feedback, setFeedback] = React.useState(null);
   const [loading, setLoading] = React.useState(false);

   async function handleLogin(){
      try {
         setLoading(true);
         const result = await schemaLogin.validate({email, password}, {abortEarly: false});

         if(result.email && result.password){
            await signInWithEmailAndPassword(auth, result.email, result.password);
            navigate('Root');
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
            return;
         }
         if(error.code === 'auth/invalid-credential'){
            setFeedback(null);
            Alert.alert('Verificar se seu email e senha estão corretos');
            return;
         }
      } finally {
         Keyboard.dismiss();
         setLoading(false)
      }
   }

   return (
      <MainView>
         <ScrollView showsVerticalScrollIndicator={false}>
            <Title>LISTA TELEFONICA</Title>

            <ContainerInput>
               <Input 
                  textLabel="Email"
                  value={email}
                  setInput={setEmail}
                  errorMessage={feedback?.email}
                  keyboardType="email-address"
                  autoFocus={true}
               />

               <Input 
                  textLabel="Senha"
                  value={password}
                  setInput={setPassWord}
                  errorMessage={feedback?.password}
                  secureTextEntry
               />
            </ContainerInput>

            <ViewConta>
               <ViewContaText>Não possui uma conta?</ViewContaText>

               <TouchableOpacity onPress={() => navigate('Conta')}>
                  <ButtonContaText>Criar uma conta</ButtonContaText>
               </TouchableOpacity>
            </ViewConta>

            <BtnSuccess
               onPress={handleLogin}
               status={loading}
               color={email && password} 
               disabled={email && password ? false : true}
            >
               Entrar
            </BtnSuccess>
         </ScrollView>
      </MainView>
   );
}
export default Login;