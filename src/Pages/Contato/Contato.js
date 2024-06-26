import {useState, useEffect, useContext} from "react";
import { TouchableOpacity, FlatList, ActivityIndicator, View } from "react-native";
import { 
   MainView, InfoView, InfoViewText, InfoViewIcon, CardView, CardViewNome, CardViewNumero, NoItemsList 
} from "./ContatoStyle.js";
import Icon from "react-native-vector-icons/Feather.js"; 
import Title from "../../Components/Title/Title.js";

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
      function getDataNumbers(){
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
         });
      }
      getDataNumbers();
   }, []);

   function renderItem({item}) {
      return <Card data={item} />
   } 

   return (
      <MainView>
         <Title>LISTA DE CONTATOS</Title>

         <InfoView>
            <InfoViewText>
               {dataNumbers?.length > 1 ? `${dataNumbers.length} contatos` : dataNumbers?.length === 1 ? `${dataNumbers.length} contato` : ''}
            </InfoViewText>

            <InfoViewIcon>
               <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Icon name="user-plus" size={24} color="#185A3D" />
               </TouchableOpacity>
            </InfoViewIcon> 
         </InfoView>

         {
            haveData === null 
            ? <ActivityIndicator color="gray" size={30} />
            : haveData === false ? (
               <FlatList
                  showsVerticalScrollIndicator={false}
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
         </CardView>
      </TouchableOpacity>
   )
}

export default Contato;