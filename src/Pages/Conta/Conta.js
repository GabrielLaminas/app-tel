import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { 
   MainView, MainTitle, ContainerInput, 
   TextLabel, Input, ButtonContaText, 
   ButtonEntrar, ButtonEntrarText 
} from "./ContaStyle.js"

function Conta() {
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
                  />
               </View>

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
               <ButtonContaText>Entrar na minha conta</ButtonContaText>
            </TouchableOpacity>

            <ButtonEntrar>
               <ButtonEntrarText>CRIAR</ButtonEntrarText>
            </ButtonEntrar>
         </MainView>
      </ScrollView>
   );
}

export default Conta;