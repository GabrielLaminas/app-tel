import { View, Text } from "react-native";
import React from "react";
import { 
   MainView, MainTitle, ViewIcons, ViewIconsButton, 
   ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody 
} from "./ContatoUsuarioStyle.js"
import IconEdit from "react-native-vector-icons/Feather.js"; 
import IconDelete from "react-native-vector-icons/Feather.js"; 

function ContatoUsuario() {
   return (
      <MainView>
         <MainTitle>Nome</MainTitle>

         <ViewIcons>
            <ViewIconsButton>
               <IconEdit name="user-check" size={24} color="white" />
            </ViewIconsButton>
            
            <ViewIconsButton>
               <IconDelete name="user-x" size={24} color="white" />
            </ViewIconsButton>
         </ViewIcons>

         <ViewInfos>
            <ViewInfosItem>
               <ViewInfosItemTitle>Telefone</ViewInfosItemTitle>
               <ViewInfosItemBody>91 99801-0000</ViewInfosItemBody>
            </ViewInfosItem>

            <ViewInfosItem>
               <ViewInfosItemTitle>Email</ViewInfosItemTitle>
               <ViewInfosItemBody>nome123@xx.com.br</ViewInfosItemBody>
            </ViewInfosItem>

            <ViewInfosItem>
               <ViewInfosItemTitle>Informação extra</ViewInfosItemTitle>
               <ViewInfosItemBody>Amigo da faculdade</ViewInfosItemBody>
            </ViewInfosItem>
         </ViewInfos>
      </MainView>
   );
}

export default ContatoUsuario;