import React from "react";
import { 
   ScrollView, TouchableOpacity, Alert, Keyboard 
} from "react-native";
import { 
   MainView, ContainerInput, ViewConta, ViewContaText, ButtonContaText
} from "./ContaStyle.js";

import Title from "../../Components/Title/Title.js";
import Input from "../../Components/Input/Input.js";
import BtnSuccess from "../../Components/Buttons/Buttons.js";

import { useNavigation } from "@react-navigation/native";
import { schemaConta } from "../../Validation/validation.js";

import { auth, database } from "../../Firebase/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
 
function Conta() {
   const { navigate } = useNavigation();
   const [name, setName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassWord] = React.useState('');
   const [feedback, setFeedback] = React.useState(null);
   const [loading, setLoading] = React.useState(false);

   async function handleCreateCount(){
      try {
         setLoading(true);
         const result = await schemaConta.validate({name, email, password}, {abortEarly: false})

         if(result.name && result.email && result.password){
            const { user } = await createUserWithEmailAndPassword(auth, result.email, result.password);
            const referencia = ref(database, `AppTelUser/${user.uid}`);
            
            await set(referencia, {
               name: result.name,
               email: result.email
            });

            await updateProfile(user, {
               displayName: result.name,
            });   

            navigate('Root');
         }
         setFeedback(null);
         setName('');
         setEmail('');
         setPassWord('');
      } catch (error) {
         const erros = {};
         console.log('Entrou aqui', error.code)
         if(error.inner){
            error.inner.forEach(e => {
               erros[e.path] = e.message;
            });
            setFeedback(erros);
            return;
         }

         if(error.code === 'auth/email-already-exists' || error.code === 'auth/email-already-in-use'){
            setFeedback(null);
            Alert.alert('E-mail já foi cadastrado!')
            return;
         }
      } finally {
         Keyboard.dismiss();
         setLoading(false);
      }
   }

   return (
      <MainView>
         <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{paddingVertical: 30, paddingHorizontal: 16}} 
         >
            <Title>CRIAR CONTA</Title>

            <ContainerInput>
               <Input 
                  textLabel="Nome"
                  value={name}
                  setInput={setName}
                  errorMessage={feedback?.name}
               />

               <Input 
                  textLabel="Email"
                  value={email}
                  setInput={setEmail}
                  errorMessage={feedback?.email}
                  keyboardType="email-address"
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
               <ViewContaText>Já possui uma conta?</ViewContaText>

               <TouchableOpacity onPress={() => navigate('Login')}>
                  <ButtonContaText>Fazer Login</ButtonContaText>
               </TouchableOpacity>
            </ViewConta>

            <BtnSuccess
               color={name && email && password}
               disabled={name && email && password ? false : true}
               status={loading}
               onPress={handleCreateCount}
            >
               CRIAR
            </BtnSuccess>
         </ScrollView>
      </MainView>
   );
}

export default Conta;