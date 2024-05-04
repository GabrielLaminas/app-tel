import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { 
   MainView, MainTitle, InfoView, InfoViewText, 
   CardView, CardViewNome, CardViewNumero, CardViewEmail, CardViewExtra 
} from "./ContatoStyle.js";
import IconPlus from "react-native-vector-icons/Feather.js"; 

const data = [
   {
      id: '1',
      nome: "Handsa",
      numero: "91 99234-9321",
      email: "text@gmail.com",
      extra: "Amigo faculdade"
   },
   {
      id: '2',
      nome: "Grandsa",
      numero: "91 99234-3311",
      email: "text@gmail.com",
      extra: "Amigo academia"
   },
   {
      id: '3',
      nome: "Geqndsa",
      numero: "91 99234-1112",
      email: "text@gmail.com",
      extra: null
   }
]

function Contato() {

   function renderItem({item}) {
      return <Card data={item} />
   } 

   return (
      <MainView>
         <MainTitle>LISTA DE CONTATOS</MainTitle>

         <InfoView>
            <InfoViewText>{data.length} contatos</InfoViewText>

            <TouchableOpacity>
               <IconPlus name="user-plus" size={28} color="black" />
            </TouchableOpacity>
         </InfoView>

         <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 16}}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
         />
      </MainView>
   );
}

function Card({data}){
   return (
      <TouchableOpacity style={{marginBottom: 16}}>
         <CardView>
            <CardViewNome>{data.nome}</CardViewNome>
            <CardViewNumero>{data.numero}</CardViewNumero>
            <CardViewEmail>{data.email}</CardViewEmail>
            <CardViewExtra>{data.extra ? data.extra : ""}</CardViewExtra>
         </CardView>
      </TouchableOpacity>
   )
}

export default Contato;