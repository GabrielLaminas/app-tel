import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert, ImageBackground, Modal } from "react-native";
import React from "react";
import { updateProfile } from "firebase/auth";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from "react-native-vector-icons/Feather";
import { UserContext } from "../../context/userContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

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
         if(image || name){
            await updateProfile(credential, {
               displayName: name,
               photoURL: image
            });
            Alert.alert('Perfil atualizado');
            goBack();
         }
      } catch (error) {
         console.log(error.code, error.message)
      }
   }

   return (
      <View style={style.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.viewButtonCamera}>
               <ImageBackground source={image ? {uri: image} : noPhoto} resizeMode="stretch" style={style.viewImageBackground}>
                  <TouchableOpacity style={style.buttonCamera} onPress={() => setVisible(true)}>
                     <Icon name="camera" size={42} color="#FFF" />
                  </TouchableOpacity>
               </ImageBackground>
            </View>

            <View style={style.viewInput}>
               <Text style={style.viewInputText}>Nome *</Text>
               <TextInput 
                  style={style.viewInputInput}
                  placeholder="Nome"
                  value={name}
                  onChangeText={(text) => setName(text)}
               />
            </View>

            <TouchableOpacity onPress={() => updateUser()} style={style.buttonSave}>
               <Text style={style.buttonSaveText}>Salvar</Text>
            </TouchableOpacity>

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
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 32,
      paddingHorizontal: 24,
      position: 'relative'
   },
   viewButtonCamera: {
      marginBottom: 32,
      justifyContent: 'center',
      alignItems: 'center',
   },
   viewImageBackground: {
      width: 160,
      height: 160,
      borderRadius: 999,
      overflow: 'hidden',
   }, 
   buttonCamera: {
      width: 160,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 999,
      overflow: 'hidden',
   },
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
   },
   viewInput: {
      marginBottom: 42,
      gap: 8,
   },
   viewInputText: {
      fontSize: 14
   },
   viewInputInput: {
      padding: 10,
      backgroundColor: '#ecf0f1',
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#000'
   },
   buttonSave: {
      width: '30%',
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: 'green'
   },
   buttonSaveText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
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