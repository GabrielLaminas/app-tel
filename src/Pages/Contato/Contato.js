import React from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { 
   MainView, MainTitle, InfoView, InfoViewText, 
   CardView, CardViewNome, CardViewNumero, CardViewEmail, CardViewExtra 
} from "./ContatoStyle.js";
import IconPlus from "react-native-vector-icons/Feather.js"; 

import { database } from "../../Firebase/firebase.js";
import { ref, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";

function Contato() {
   //const { params } = useRoute()
   const [dataNumbers, setDataNumbers] = React.useState([]);
   const uid = '8RsRuXyaNMP6BlHntx7TD9iCBZl1';

   React.useEffect(() => {
      async function getDataNumbers(){
         try {
            const referencia = ref(database, `AppTelContato/${uid}`);

            onValue(referencia, (snapshot) => {
               if(!snapshot.exists()) return;
               
               setDataNumbers([]);

               snapshot.forEach((child) => {
                  const data = {
                     id: child.key,
                     nome: child.val().nome,
                     numero: child.val().numero,
                     email: child.val().email,
                     extra: child.val().extra
                  }
                  setDataNumbers((prevNumbers) => [...prevNumbers, data])
               });           
            })
         } catch (error) {
            console.log(error.code, error.message)
         } finally {

         }
      }
      getDataNumbers()
   }, [])

   function renderItem({item}) {
      return <Card data={item} />
   } 

   return (
      <MainView>
         <MainTitle>LISTA DE CONTATOS</MainTitle>

         <InfoView>
            <InfoViewText>{dataNumbers?.length} contatos</InfoViewText>

            <TouchableOpacity>
               <IconPlus name="user-plus" size={28} color="black" />
            </TouchableOpacity>
         </InfoView>

         {
            dataNumbers?.length > 0 
            ? (
               <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingTop: 16}}
                  data={dataNumbers}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
               />
            )
            : <ActivityIndicator color="gray" size={30} />
         }
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