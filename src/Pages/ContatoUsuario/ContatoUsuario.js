import { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import { 
   MainView, MainTitle, ViewIcons, ViewIconsButton, 
   ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody 
} from "./ContatoUsuarioStyle.js"
import IconEdit from "react-native-vector-icons/Feather.js"; 
import IconDelete from "react-native-vector-icons/Feather.js"; 

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
   }, [params]);

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
            <ViewIconsButton onPress={() => setVisible(true)}>
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