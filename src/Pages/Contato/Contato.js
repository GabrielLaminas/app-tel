import {useState, useEffect, useContext} from "react";
import { TouchableOpacity, FlatList, ActivityIndicator, View } from "react-native";
import { 
   MainView, MainTitle, InfoView, InfoViewText, 
   CardView, CardViewNome, CardViewNumero, CardViewEmail, CardViewExtra, NoItemsList 
} from "./ContatoStyle.js";
import Icon from "react-native-vector-icons/Feather.js"; 

import { database } from "../../Firebase/firebase.js";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

import CreateContact from "../../Components/Modal/CreateContact.js";
import { UserContext } from "../../context/userContext.js";

function Contato() {
   const [dataNumbers, setDataNumbers] = useState([]);
   const [haveData, setHaveData] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const { user } = useContext(UserContext);

   useEffect(() => {
      async function getDataNumbers(){
         try {
            const referencia = ref(database, `AppTelContato/${user}`);

            onValue(query(referencia, orderByChild('nome')), (snapshot) => {
               if(snapshot.exists()){
                  setDataNumbers([]);

                  snapshot.forEach((child) => {
                     const data = {
                        id: child.key,
                        nome: child.val().nome,
                        numero: child.val().numero,
                        email: child.val().email,
                        extra: child.val().extra
                     }
                     setDataNumbers((prevNumbers) => [...prevNumbers, data]);
                  });
                  setHaveData(false);
               } else{
                  setHaveData(true);
               }    
            })
         } catch (error) {
            console.log(error.code, error.message);
         }
      }
      getDataNumbers();
   }, []);

   function renderItem({item}) {
      return <Card data={item} />
   } 

   return (
      <MainView>
         <MainTitle>LISTA DE CONTATOS</MainTitle>

         <InfoView>
            <InfoViewText>
               {dataNumbers?.length > 1 ? `${dataNumbers.length} contatos` : dataNumbers?.length === 1 ? `${dataNumbers.length} contato` : ''}
            </InfoViewText>

            <View style={{flexDirection: 'row', gap: 20}}>
               <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Icon name="user-plus" size={28} color="black" />
               </TouchableOpacity>
            </View>
         </InfoView>

         {
            haveData === null 
            ? <ActivityIndicator color="gray" size={30} />
            : haveData === false ? (
               <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingTop: 16}}
                  data={dataNumbers}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
               />
            ) : <NoItemsList>Você não possui contatos</NoItemsList>
         }

         <CreateContact visible={showModal} setVisible={setShowModal} />
      </MainView>
   );
}

function Card({data}){
   const { navigate } = useNavigation();
   
   return (
      <TouchableOpacity style={{marginBottom: 16}} onPress={() => navigate('Usuario', {id: data.id})}>
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