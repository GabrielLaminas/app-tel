import React from "react";
import { 
   MainView, MainTitle, ViewIcons, ViewIconsButton, 
   ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody 
} from "./ContatoUsuarioStyle.js"
import IconEdit from "react-native-vector-icons/Feather.js"; 
import IconDelete from "react-native-vector-icons/Feather.js"; 

import { database, useAuth } from "../../Firebase/firebase.js";
import { ref, child, get } from "firebase/database";
import { useRoute } from "@react-navigation/native";

function ContatoUsuario() {
   const { params } = useRoute()
   const [userInfo, setUserInfo] = React.useState({});
   const user = useAuth();

   React.useEffect(() => {
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
   }, [user])

   return (
      <MainView>
         <MainTitle>{userInfo.nome}</MainTitle>

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