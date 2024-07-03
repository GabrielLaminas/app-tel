import { TouchableWithoutFeedback, Alert, Modal } from "react-native";
import React from "react";
import { updateProfile } from "firebase/auth";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Title from "../../Components/Title/Title";
import Input from "../../Components/Input/Input";
import {
   MainView, ViewCamera, ViewImageBackground, ButtonCamera, ButtonSave, ButtonSaveText,
   ModalButton, ModalMain, ModalHeader, ModalHeaderTitle, ModalGroupButton, ModalGroupColumn, 
   ModalGroupColumnIcon, ModalGroupColumnText
} from "./EditarPerfilStyle.js"

import Icon from "react-native-vector-icons/Feather";
import { UserContext } from "../../context/userContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { schemaPerfil } from "../../Validation/validation";

export default function EditarPerfil() {
   const noPhoto = require('../../Assets/Images/no-user.png');
   const [image, setImage] = React.useState('');
   const [name, setName] = React.useState('');
   const [visible, setVisible] = React.useState(false);
   const { credential } = React.useContext(UserContext); 
   const { goBack } = useNavigation();
   
   React.useEffect(() => {
      if(credential){
         setImage(credential.photoURL);
         setName(credential.displayName);
      }
   }, []);

   async function launchCameraPhone(){
      try {
         setVisible(false);

         const result = await launchCamera({saveToPhotos: true});
         
         if(result.didCancel === true) return;

         if(result.assets.length > 0){
            setImage(result.assets[0].uri);
         } 
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   async function launchGaleriaPhone(){
      try {
         setVisible(false);

         const result = await launchImageLibrary();
        
         if(result.didCancel === true) return;

         if(result.assets.length > 0){
            setImage(result.assets[0].uri);
         }         
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   async function updateUser(){
      try {
         const result = await schemaPerfil.validate({image, name}, {abortEarly: false});

         if(result.image || result.name){
            await updateProfile(credential, {
               displayName: result.name,
               photoURL: result.image
            });
    
            Alert.alert('Perfil atualizado');
            goBack();
         }
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   async function removePhoto(){
      try {
         if(image){
            await updateProfile(credential, { photoURL: '' });
            setVisible(false);
            setImage('');
            Alert.alert('Imagem removida');
         } 
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   return (
      <MainView>
         <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 16, paddingVertical: 80}}
         >
            <Title>Editar Perfil</Title>

            <ViewCamera>
               <ViewImageBackground source={image ? {uri: image} : noPhoto} resizeMode="stretch">
                  <ButtonCamera onPress={() => setVisible(true)}>
                     <Icon name="camera" size={42} color="#FFF" />
                  </ButtonCamera>
               </ViewImageBackground>
            </ViewCamera>

            <Input 
               textLabel="Nome"
               value={name}
               setInput={setName}
            />

            <ButtonSave onPress={() => updateUser()}>
               <ButtonSaveText>Editar</ButtonSaveText>
            </ButtonSave>

            <ModalButtons visible={visible} setVisible={setVisible}>
               <ModalMain>
                  <ModalHeader>
                     <ModalHeaderTitle>Foto de perfil</ModalHeaderTitle>

                     <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <Icon name="x" size={24} color="#1A1E23" />
                     </TouchableWithoutFeedback>
                  </ModalHeader>

                  <ModalGroupButton>
                     <TouchableWithoutFeedback onPress={() => launchCameraPhone()}>
                        <ModalGroupColumn>
                           <ModalGroupColumnIcon>
                              <Icon name="camera" size={20} color="#2E7555" />
                           </ModalGroupColumnIcon>

                           <ModalGroupColumnText>Câmera</ModalGroupColumnText>
                        </ModalGroupColumn>
                     </TouchableWithoutFeedback>

                     <TouchableWithoutFeedback onPress={() => launchGaleriaPhone()}>
                        <ModalGroupColumn>
                           <ModalGroupColumnIcon>
                              <Icon name="image" size={20} color="#2E7555" />
                           </ModalGroupColumnIcon>

                           <ModalGroupColumnText>Galeria</ModalGroupColumnText>
                        </ModalGroupColumn>
                     </TouchableWithoutFeedback>

                     <TouchableWithoutFeedback onPress={() => removePhoto()} disabled={image ? false : true}>
                        <ModalGroupColumn>
                           <ModalGroupColumnIcon>
                              <Icon name="camera-off" size={20} color="#2E7555" />
                           </ModalGroupColumnIcon>

                           <ModalGroupColumnText>Remover</ModalGroupColumnText>
                        </ModalGroupColumn>
                     </TouchableWithoutFeedback>
                  </ModalGroupButton>
               </ModalMain>
            </ModalButtons>
         </ScrollView>
      </MainView>
   );
}

function ModalButtons({children, visible, setVisible}){
   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={visible}
         onRequestClose={() => setVisible(!visible)}
      >
         <ModalButton>{children}</ModalButton>
      </Modal>
   )
}