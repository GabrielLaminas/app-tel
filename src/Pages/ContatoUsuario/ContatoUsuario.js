import { useState, useEffect, useContext } from "react";
import { Alert, ScrollView, Share } from "react-native";
import { 
   MainView, ViewName, ViewNameCircle, ViewNameCircleLetter, ViewFullName,  ViewIcons, ViewIconsButton, ViewIconsGroup, ViewIconsGroupText,  ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody
} from "./ContatoUsuarioStyle.js"
import Icon from "react-native-vector-icons/Feather.js"; 

import { database } from "../../Firebase/firebase.js";
import { ref, onValue, remove } from "firebase/database";
import { useRoute, useNavigation } from "@react-navigation/native";
import EditContact from "../../Components/Modal/EditContact.js";
import { UserContext } from "../../context/userContext.js";

function ContatoUsuario() {
   const { params } = useRoute();
   const { navigate } = useNavigation();
   const [userInfo, setUserInfo] = useState({});
   const [visible, setVisible] = useState(false);
   const { user } = useContext(UserContext);

   useEffect(() => {
      function getUserInfo(){
         const referencia = ref(database, `AppTelContato/${user}/${params?.id}`);
         
         onValue(referencia, (snapshot) => {
            if(!snapshot.exists()) return;
            setUserInfo({});

            const data = {
               nome: snapshot.val().nome,
               numero: snapshot.val().numero,
               email: snapshot.val().email,
               extra: snapshot.val().extra,
            }
            setUserInfo(data);
         });
      }
      getUserInfo()
   }, [params.id]);

   async function removeContact(){
      try {
         const referencia = ref(database, `AppTelContato/${user}/${params?.id}`);
         Alert.alert(
            'Excluir Contato', 
            `Tem certeza que deseja excluir ${userInfo.nome}?`,
            [ 
               {
                  text: 'EXCLUIR',
                  onPress: async () => {
                     await remove(referencia);
                     navigate('Root');
                  },
                  style: 'destructive'
               }, 
               {
                  text: 'CANCELAR',
                  style: 'cancel'
               }
            ]
         )
      } catch (error) {
         console.log(error.message)
      }
   }

   async function shareContact(){
      const title = `Compartilhar Contato`;
      const message = `Nome: ${userInfo.nome} | Numero: ${userInfo.numero}`
      try {
         await Share.share({message: message, title: title}, {dialogTitle: title});
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   return (
      <MainView>
         <ScrollView showsVerticalScrollIndicator={false}>
            <ViewName>
               <ViewNameCircle>
                  <ViewNameCircleLetter>{userInfo.nome?.at(0)}</ViewNameCircleLetter>
               </ViewNameCircle>

               <ViewFullName>{userInfo.nome}</ViewFullName>
            </ViewName>

            <ViewIcons>
               <ViewIconsGroup>
                  <ViewIconsButton onPress={() => setVisible(true)}>
                     <Icon name="edit-2" size={22} color="#45505E" />
                  </ViewIconsButton>

                  <ViewIconsGroupText>Editar</ViewIconsGroupText>
               </ViewIconsGroup>
               
               <ViewIconsGroup>
                  <ViewIconsButton onPress={() => shareContact()}>
                     <Icon name="share-2" size={22} color="#45505E" />
                  </ViewIconsButton>

                  <ViewIconsGroupText>Compartilhar</ViewIconsGroupText>
               </ViewIconsGroup>

               <ViewIconsGroup>
                  <ViewIconsButton onPress={removeContact}>
                     <Icon name="trash-2" size={22} color="#45505E" />
                  </ViewIconsButton>

                  <ViewIconsGroupText>Excluir</ViewIconsGroupText>
               </ViewIconsGroup>
            </ViewIcons>

            <ViewInfos>
               <ViewInfosItem borderB={true}>
                  <ViewInfosItemTitle>Telefone</ViewInfosItemTitle>
                  <ViewInfosItemBody>{userInfo.numero}</ViewInfosItemBody>
               </ViewInfosItem>

               <ViewInfosItem borderB={true}>
                  <ViewInfosItemTitle>Email</ViewInfosItemTitle>
                  <ViewInfosItemBody>{userInfo.email}</ViewInfosItemBody>
               </ViewInfosItem>

               {userInfo.extra 
                  ? (
                     <ViewInfosItem>
                        <ViewInfosItemTitle>Informação extra</ViewInfosItemTitle>
                        <ViewInfosItemBody>{userInfo.extra}</ViewInfosItemBody>
                     </ViewInfosItem>
                  )
                  : ""
               }
            </ViewInfos>
         </ScrollView>

         <EditContact 
            visible={visible}
            setVisible={setVisible}
            uid={params?.id}  
            userName={userInfo.nome}
            userPhone={userInfo.numero}
            userEmail={userInfo.email}
            userExtra={userInfo.extra}
         />
      </MainView>
   );
}

export default ContatoUsuario;