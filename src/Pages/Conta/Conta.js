import React from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Keyboard } from "react-native";
import { 
   MainView, MainTitle, ContainerInput, 
   TextLabel, Input, ButtonContaText, 
   ButtonEntrar, ButtonEntrarText, ErrorText 
} from "./ContaStyle.js"
import { useNavigation } from "@react-navigation/native";

import { schemaConta } from "../../Validation/validation.js";

import { auth, database } from "../../Firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
 
function Conta() {
   const { navigate } = useNavigation();
   const [name, setName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassWord] = React.useState('');
   const [feedback, setFeedback] = React.useState(null);
   const [laoding, setLoading] = React.useState(false);

   async function handleCreateCount(){
      try {
         setLoading(true);
         const result = await schemaConta.validate({name, email, password}, {abortEarly: false})
         console.log(result)
         if(result.name && result.email && result.password){
            const { user } = await createUserWithEmailAndPassword(auth, result.email, result.password);
            const referencia = ref(database, `AppTelUser/${user.uid}`);
               
            await set(referencia, {
               name: result.name,
               email: result.email
            })

            navigate('Contato');
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
      <ScrollView showsVerticalScrollIndicator={false}>
         <MainView>
            <MainTitle>CRIAR CONTA</MainTitle>

            <ContainerInput>
               <View>
                  <TextLabel nativeID="formLabelNome">Nome</TextLabel>
                  <Input
                     autoFocus={true}
                     accessibilityLabel="input"
                     accessibilityLabelledBy="formLabelNome"
                     value={name}
                     onChangeText={(text) => setName(text.trim())} 
                  />
                  {feedback?.name && <ErrorText>{feedback.name}</ErrorText>}
               </View>

               <View>
                  <TextLabel nativeID="formLabelEmail">Email</TextLabel>
                  <Input 
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

            <TouchableOpacity onPress={() => navigate('Login')}>
               <ButtonContaText>Entrar na minha conta</ButtonContaText>
            </TouchableOpacity>

            <ButtonEntrar 
               color={name && email && password} 
               disabled={name && email && password ? false : true}
               onPress={handleCreateCount}
            >
               { laoding 
                  ? <ActivityIndicator size={27} color="#fff" />
                  : <ButtonEntrarText>CRIAR</ButtonEntrarText>
               }
            </ButtonEntrar>
         </MainView>
      </ScrollView>
   );
}

export default Conta;