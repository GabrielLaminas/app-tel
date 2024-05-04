import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";

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
   return (
      <View>
         <Text>LISTA DE CONTATOS</Text>

         <View>
            <Text>{data.length} contatos</Text>
            <TouchableOpacity>
               <Text>Novo Contato</Text>
            </TouchableOpacity>
         </View>

         <FlatList 
            data={data}
            renderItem={({item}) => <Card data={item} />}
            keyExtractor={(item) => item.id}
         />
      </View>
   );
}

function Card({data}){
   return (
      <View>
         <TouchableOpacity>
            <Text>{data.nome}</Text>
            <Text>{data.numero}</Text>
            <Text>{data.email}</Text>
            <Text>{data.extra ? data.extra : ""}</Text>
         </TouchableOpacity>
      </View>
   )
}

export default Contato;