import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from "react-native";
import React from "react";
import { updateProfile } from "firebase/auth";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from "react-native-vector-icons/Feather";
import { UserContext } from "../../context/userContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"

export default function EditarPerfil() {
   const [img, setImg] = React.useState('https://images.unsplash.com/photo-1546617885-4822125f891e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
   const [name, setName] = React.useState('');
   const { credential } = React.useContext(UserContext); 
   const { goBack } = useNavigation();

   React.useEffect(() => {
      if(credential){
         setImg(credential.photoURL);
         setName(credential.displayName);
      }
   }, [])

   async function openCamera(){
      const result = await launchCamera({saveToPhotos: true});
      console.log('Abriu aqui: ', result)

      if(result){
         setImg(result.assets[0]?.uri)
      }
   }

   async function openGaleria(){
      const result = await launchImageLibrary();
      console.log('Abriu aqui: ', result)

      if(result){
         console.log(result)
         setImg(result.assets[0]?.uri)
      }
   }

   async function updateUser(){
      try {
         if(img || name){
            await updateProfile(credential, {
               displayName: name,
               photoURL: img
            });
            Alert.alert('Perfil atualizado');
            goBack();
         }
      } catch (error) {
         console.log(error.code, error.message)
      }
   }
   
   /** 
    * https://www.npmjs.com/package/react-native-image-picker
    * 
    * {"assets": [{"fileName": "rn_image_picker_lib_temp_5a396bdc-a606-45b5-b028-b83f361421f2.jpg", "fileSize": 176550, "height": 1280, "originalPath": "file:///data/user/0/com.apptel/cache/rn_image_picker_lib_temp_5a396bdc-a606-45b5-b028-b83f361421f2.jpg", "type": "image/jpeg", "uri": "file:///data/user/0/com.apptel/cache/rn_image_picker_lib_temp_5a396bdc-a606-45b5-b028-b83f361421f2.jpg", "width": 960}]}
    * 
   */

   return (
      <View style={style.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.viewButtonCamera}>
               <ImageBackground source={{uri: img}} resizeMode="stretch" style={style.viewImageBackground}>
                  <TouchableOpacity style={style.buttonCamera}>
                     <Icon name="camera" size={42} color="#FFF" />
                  </TouchableOpacity>
               </ImageBackground>
            </View>

            {/*<View>
               <Image source={{uri: img}} style={{width: '100%', height: 199}} resizeMode="cover" />
               
               <TouchableOpacity onPress={() => openCamera()}>
                  <Text>My Image</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => openGaleria()}>
                  <Text>My Galeria</Text>
               </TouchableOpacity>
            </View>*/}

            <View>
               <Text>Nome *</Text>
               <TextInput 
                  placeholder="Nome"
                  value={name}
                  onChangeText={(text) => setName(text)}
               />
            </View>

            <TouchableOpacity onPress={() => updateUser()}>
               <Text>Salvar</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 32,
      paddingHorizontal: 24
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
   }
});