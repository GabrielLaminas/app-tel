import { TouchableWithoutFeedback, Alert, Modal } from "react-native";
import {useState, useContext, useEffect }from "react";
import { updateProfile } from "firebase/auth";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Title from "../../Components/Title/Title";
import Input from "../../Components/Input/Input";
import {
   MainView, ViewContainer, ViewContainerContent, ViewCamera, ViewImageBackground, ButtonCamera, ButtonSave, ButtonSaveText,
   ModalButton, ModalMain, ModalHeader, ModalHeaderTitle, ModalGroupButtons, ModalGroupColumn, ModalGroupColumnButton, ModalGroupColumnText
} from "./EditarPerfilStyle.js"

import Icon from "react-native-vector-icons/Feather";
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";
import { schemaPerfil } from "../../Validation/validation";

export default function EditarPerfil() {
   const noPhoto = require('../../Assets/Images/no-user.png');
   const [image, setImage] = useState('');
   const [name, setName] = useState('');
   const [visible, setVisible] = useState(false);
   const { credential } = useContext(UserContext); 
   const { goBack } = useNavigation();
   
   useEffect(() => {
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
         <ViewContainer>
            <ViewContainerContent>
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
            </ViewContainerContent>

            <ButtonSave onPress={() => updateUser()}>
               <ButtonSaveText>Editar</ButtonSaveText>
            </ButtonSave>
         </ViewContainer>

         <ModalButtons visible={visible} setVisible={setVisible}>
            <ModalMain>
               <ModalHeader>
                  <ModalHeaderTitle>Foto de perfil</ModalHeaderTitle>

                  <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                     <Icon name="x" size={24} color="#1A1E23" />
                  </TouchableWithoutFeedback>
               </ModalHeader>

               <ModalGroupButtons> 
                  <ModalGroupColumn>
                     <ModalGroupColumnButton onPress={() => launchCameraPhone()}>
                        <Icon name="camera" size={20} color="#2E7555" />
                     </ModalGroupColumnButton>

                     <ModalGroupColumnText>Câmera</ModalGroupColumnText>
                  </ModalGroupColumn>

                  <ModalGroupColumn>
                     <ModalGroupColumnButton onPress={() => launchGaleriaPhone()}> 
                        <Icon name="image" size={20} color="#2E7555" />
                     </ModalGroupColumnButton>

                     <ModalGroupColumnText>Galeria</ModalGroupColumnText>
                  </ModalGroupColumn>

                  <ModalGroupColumn>
                     <ModalGroupColumnButton 
                        onPress={() => removePhoto()} 
                        disabled={image ? false : true}
                     >
                        <Icon 
                           name="camera-off" size={20} 
                           color={`${image ? '#2E7555' : '#B8B8B8'}`} 
                        />
                     </ModalGroupColumnButton>

                     <ModalGroupColumnText color={image ? false : true}>
                        Remover
                     </ModalGroupColumnText>
                  </ModalGroupColumn>
               </ModalGroupButtons>
            </ModalMain>
         </ModalButtons>
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