import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { 
   MainView, MainTitle, ViewIcons, ViewIconsButton, 
   ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody 
} from "./ContatoUsuarioStyle.js"
import IconEdit from "react-native-vector-icons/Feather.js"; 
import IconDelete from "react-native-vector-icons/Feather.js"; 

import { database, useAuth } from "../../Firebase/firebase.js";
import { ref, child, get, remove } from "firebase/database";
import { useRoute, useNavigation } from "@react-navigation/native";

function ContatoUsuario() {
   const { params } = useRoute();
   const { navigate } = useNavigation();
   const [userInfo, setUserInfo] = useState({});
   const user = useAuth();

   useEffect(() => {
      async function getUserInfo(){
         try {
            const referencia = ref(database);
            const snapshot = await get(child(referencia, `AppTelContato/${user}/${params?.id}`));
            
            if(!snapshot.exists()) return;

            const data = {
               nome: snapshot.val().nome,
               numero: snapshot.val().numero,
               email: snapshot.val().email,
               extra: snapshot.val().extra,
            }

            setUserInfo(data);
         } catch (error) {
            console.log(error.code)
         }
      }
      getUserInfo()
   }, [user]);

   async function removeContact(){
      try {
         if(!user) return;
         const referencia = ref(database, `AppTelContato/${user}/${params?.id}`);
         Alert.alert(
            'Excluir Contato', 
            'Tem certeza que deseja excluir contato?',
            [ 
               {
                  text: 'EXCLUIR',
                  onPress: async () => {
                     await remove(referencia);
                     navigate('Contato');
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

   return (
      <MainView>
         <MainTitle>{userInfo.nome}</MainTitle>

         <ViewIcons>
            <ViewIconsButton>
               <IconEdit name="user-check" size={24} color="white" />
            </ViewIconsButton>
            
            <ViewIconsButton onPress={removeContact}>
               <IconDelete name="user-x" size={24} color="white" />
            </ViewIconsButton>
         </ViewIcons>

         <ViewInfos>
            <ViewInfosItem>
               <ViewInfosItemTitle>Telefone</ViewInfosItemTitle>
               <ViewInfosItemBody>{userInfo.numero}</ViewInfosItemBody>
            </ViewInfosItem>

            <ViewInfosItem>
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
      </MainView>
   );
}

export default ContatoUsuario;