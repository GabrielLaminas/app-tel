import {
   View, Text, StyleSheet, TouchableWithoutFeedback, Alert, Modal 
} from "react-native";
import React from "react";
import { updateProfile } from "firebase/auth";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Title from "../../Components/Title/Title";
import Input from "../../Components/Input/Input";
import {
   MainView, ViewCamera, ViewImageBackground, ButtonCamera, ButtonSave, ButtonSaveText
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
               <View style={style.modalMain}>
                  <View style={style.modalHeader}>
                     <Text style={style.modalHeaderTitle}>Foto de Perfil</Text>

                     <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <Icon name="x" size={22} color="#000" />
                     </TouchableWithoutFeedback>
                  </View>

                  <View style={style.modalGroupButton}>
                     <TouchableWithoutFeedback onPress={() => launchCameraPhone()}>
                        <View style={style.modalGroupColumn}>
                           <View style={style.modalGroupColumnIcon}>
                              <Icon name="camera" size={20} color="#000" />
                           </View>
                           <Text style={style.modalGroupColumnText}>Câmera</Text>
                        </View>
                     </TouchableWithoutFeedback>

                     <TouchableWithoutFeedback onPress={() => launchGaleriaPhone()}>
                        <View style={style.modalGroupColumn}>
                           <View style={style.modalGroupColumnIcon}>
                              <Icon name="image" size={20} color="#000" />
                           </View>
                           <Text style={style.modalGroupColumnText}>Galeria</Text>
                        </View>
                     </TouchableWithoutFeedback>
                  </View>
               </View>
            </ModalButtons>
         </ScrollView>
      </MainView>
   );
}

const style = StyleSheet.create({
   modalMain: {
      width: '100%',
      padding: 24,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#f1f2f6',
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
   },
   modalHeader: {
      marginBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
   },
   modalHeaderTitle: {
      color: '#000',
      fontSize: 18,
      fontWeight: '500'
   },
   modalGroupButton: {
      flexDirection: 'row',
      gap: 32,
   },
   modalGroupColumn: {
      gap: 6,
      alignItems: 'center'
   },
   modalGroupColumnIcon: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 999,
   },
   modalGroupColumnText: {
      color: '#000',
      fontSize: 16,
   }
});

function ModalButtons({children, visible, setVisible}){
   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={visible}
         onRequestClose={() => setVisible(!visible)}
      >
         <View style={styleModal.container}>
            {children}
         </View>
      </Modal>
   )
}

const styleModal = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, .15)'
   }
});