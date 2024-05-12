import React from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { 
   MainView, MainTitle, ContainerInput, 
   TextLabel, Input, ButtonContaText, 
   ButtonEntrar, ButtonEntrarText, ErrorText 
} from "./ContaStyle.js"
import { useNavigation } from "@react-navigation/native";

function Conta() {
   const { navigate } = useNavigation();
   const [name, setName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassWord] = React.useState('');
   const [feedback, setFeedback] = React.useState(null);
   const [laoding, setLoading] = React.useState(false);

   async function handleCreateCount(){
   }

   return (
      <ScrollView>
         <MainView>
            <MainTitle>CRIAR CONTA</MainTitle>

            <ContainerInput>
               <View>
                  <TextLabel nativeID="formLabelNome">Nome</TextLabel>
                  <Input
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