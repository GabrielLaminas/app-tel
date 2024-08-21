import { useState, useEffect, useContext } from "react";
import { ScrollView, Share, Linking, Alert, View, TouchableOpacity, Text } from "react-native";
import { 
   MainView, ViewName, ViewNameCircle, ViewNameCircleLetter, ViewFullName,  ViewIcons, ViewIconsButton, ViewIconsGroup, ViewIconsGroupText,  ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody
} from "./ContatoUsuarioStyle.js"
import Icon from "react-native-vector-icons/Feather.js"; 

import { database } from "../../Firebase/firebase.js";
import { ref, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import EditContact from "../../Components/Modal/EditContact.js";
import { UserContext } from "../../context/userContext.js";
import DeleteContact from "../../Components/Modal/DeleteContact.js";

function ContatoUsuario({navigation}) {
   const { params } = useRoute();
   const [userInfo, setUserInfo] = useState({});
   const [visible, setVisible] = useState({
      "editModal": false,
      "deleteModal": false
   });
   const [visibleMenu, setVisibleMenu] = useState(false);
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

   useEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <View style={{marginRight: 20, position: 'relative'}}>
               <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => {
                     setVisibleMenu(false)
                     setVisible({...visible, "editModal": true });
                  }}>
                     <Icon name="edit-2" size={22} color="#45505E" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setVisibleMenu((prev) => !prev)} style={{paddingVertical: 6}}>
                     <Icon name="more-vertical" size={22} color="#000" />
                  </TouchableOpacity>
               </View>

               <View style={!visibleMenu ? {display: 'none'} : {
                  position: 'absolute', top: '110%', right: -8, zIndex: 100, display: 'flex',
                  paddingVertical: 10, paddingHorizontal: 20, gap: 14, borderRadius: 4, backgroundColor: '#FAFAFA', elevation: 2,
               }}>
                  <TouchableOpacity onPress={() => {
                     setVisibleMenu(false)
                     setVisible({...visible, "deleteModal": true })
                  }}>
                     <Text style={{textAlign: 'right', color: '#1A1E23'}}>Excluir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={shareContact}>
                     <Text style={{textAlign: 'right', color: '#1A1E23'}}>Compartilhar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         )
      });
   }, [navigation, visibleMenu]);

   async function shareContact(){
      const title = `Compartilhar Contato`;
      const message = `Nome: ${userInfo.nome} | Numero: ${userInfo.numero}`
      setVisibleMenu(false)
      try {
         await Share.share({message: message, title: title}, {dialogTitle: title});
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   async function makeCall(){
      const regexcharacter = /\(?\)?\s?-?/g
      const number = userInfo.numero.replace(regexcharacter, '');
      const numberSupport = await Linking.canOpenURL(`tel:${number}`);
      
      if(numberSupport){
         await Linking.openURL(`tel:${number}`);
      } else {
         Alert.alert(
            'Erro ao fazer ligação', 
            'Número de telefone está incorreto'
         );
      }
   }

   async function sendEmail(){
      const emailSupport = await Linking.canOpenURL(`mailto:${userInfo.email}`);
      
      if(emailSupport){
         await Linking.openURL(`mailto:${userInfo.email}`);
      } else {
         Alert.alert(
            'Erro ao enviar e-mail', 
            'Email está incorreto'
         );
      }
   }

   async function sendMessage() {
      const regexcharacter = /\(?\)?\s?-?/g
      const number = userInfo.numero.replace(regexcharacter, '');
      const numberSupport = await Linking.canOpenURL(`sms:${number}`);
      
      if(numberSupport){
         await Linking.openURL(`sms:${number}`);
      } else {
         Alert.alert(
            'Erro ao mandar mensagem', 
            'Número de telefone está incorreto'
         );
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
                  <ViewIconsButton onPress={makeCall}>
                     <Icon name="phone-call" size={22} color="#45505E" />
                  </ViewIconsButton>

                  <ViewIconsGroupText>Ligar</ViewIconsGroupText>
               </ViewIconsGroup>

               <ViewIconsGroup>
                  <ViewIconsButton onPress={sendMessage}>
                     <Icon name="message-square" size={22} color="#45505E" />
                  </ViewIconsButton>

                  <ViewIconsGroupText>Enviar SMS</ViewIconsGroupText>
               </ViewIconsGroup>

               <ViewIconsGroup>
                  <ViewIconsButton onPress={sendEmail}>
                     <Icon name="mail" size={22} color="#45505E" />
                  </ViewIconsButton>

                  <ViewIconsGroupText>Enviar Email</ViewIconsGroupText>
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

         <DeleteContact 
            visible={visible}
            setVisible={setVisible}
            uid={params?.id}
            userName={userInfo.nome}
         />
      </MainView>
   );
}

export default ContatoUsuario;