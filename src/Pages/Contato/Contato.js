import React from "react";
import { TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { 
   MainView, MainTitle, InfoView, InfoViewText, 
   CardView, CardViewNome, CardViewNumero, CardViewEmail, CardViewExtra, NoItemsList 
} from "./ContatoStyle.js";
import IconPlus from "react-native-vector-icons/Feather.js"; 

import { database, useAuth } from "../../Firebase/firebase.js";
import { ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

import CreateContact from "../../Components/Modal/CreateContact.js";

function Contato() {
   const [dataNumbers, setDataNumbers] = React.useState([]);
   const [laoding, setLoading] = React.useState(false);
   const [showModal, setShowModal] = React.useState(false);
   const user = useAuth();

   React.useEffect(() => {
      async function getDataNumbers(){
         try {
            setLoading(true);
            const referencia = ref(database, `AppTelContato/${user}`);

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
                  setDataNumbers((prevNumbers) => [...prevNumbers, data]);
               });           
            })
         } catch (error) {
            console.log(error.code, error.message);
         } finally {
            setLoading(false);
         }
      }
      getDataNumbers();
   }, [user]);

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

            <TouchableOpacity onPress={() => setShowModal(true)}>
               <IconPlus name="user-plus" size={28} color="black" />
            </TouchableOpacity>
         </InfoView>

         {
            laoding
            ? <ActivityIndicator color="gray" size={30} />
            : dataNumbers?.length > 0 ? (
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