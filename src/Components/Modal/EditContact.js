import { 
   View, Modal, ScrollView, Keyboard,
   ActivityIndicator
} from "react-native";
import {
   ModalView, MainTitle, ContainerInput, TextLabel, Input, ErrorText, ContainerButtons, ButtonSave, ButtonCancel, ButtonText
} from "./ModalStyle.js"

import {useEffect, useState} from "react";
import { schemaModal } from '../../Validation/validation.js';
import { useAuth, database } from "../../Firebase/firebase.js";
import { ref, update } from 'firebase/database';

function EditContact({visible, setVisible, uid, userName, userPhone, userEmail, userExtra}){
   const [name, setName] = useState(userName);
   const [email, setEmail] = useState(userEmail);
   const [phone, setPhone] = useState(userPhone);
   const [extra, setExtra] = useState(userExtra);
   const [feedback, setFeedback] = useState({});
   const [loading, setLoading] = useState(false);
   const user = useAuth();

   useEffect(() => {
      setName(userName);
      setEmail(userEmail);
      setPhone(userPhone);
      setExtra(userExtra);
   }, [userName, userPhone, userEmail, userExtra]);

   async function editContact(){
      try {
         if(!user) return;
         setLoading(true);
         const referencia = ref(database, `AppTelContato/${user}/${uid}`);
         const result = await schemaModal.validate({name, email, phone, extra}, {abortEarly: false});

         if(result.name && result.email && result.phone){
            await update(referencia, {
               nome: result.name,
               email: result.email,
               numero: result.phone,
               extra: result.extra
            });
         }
         setFeedback({});
         setVisible(false);
      } catch (error) {
         const errors = {};
         if(error.inner){
            error.inner.forEach(error => {
               errors[error.path] = error.message;
            });
            setFeedback(errors);
            return;
         }
      } finally {
         Keyboard.dismiss();
         setLoading(false);
      }
   }

   return (
      <Modal
         animationType="slide"
         visible={visible}
         onRequestClose={() => {
            setVisible(false);
         }}
      >
         <ModalView>
            <ScrollView showsVerticalScrollIndicator={false}>
               <MainTitle>Editar Contato</MainTitle>

               <ContainerInput>
                  <View>
                     <TextLabel nativeID="formLabelName">Nome *</TextLabel>
                     <Input 
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelName"
                        value={name}
                        onChangeText={(text) => setName(text)}
                     />
                     {feedback?.name && <ErrorText>{feedback.name}</ErrorText>}
                  </View>
                  
                  <View>
                     <TextLabel nativeID="formLabelEmail">Email *</TextLabel>
                     <Input
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelEmail"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                     />
                     {feedback?.email && <ErrorText>{feedback.email}</ErrorText>}
                  </View>

                  <View>
                     <TextLabel nativeID="formLabelTelefone">Telefone *</TextLabel>
                     <Input
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelTelefone"
                        placeholder="(XX) XXXXX-XXXX ou XXXXXXXXXXX"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                     />
                     {feedback?.phone && <ErrorText>{feedback.phone}</ErrorText>}
                  </View>

                  <View>
                     <TextLabel nativeID="formLabelInformaçãoExtra">Informação Extra</TextLabel>
                     <Input
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelInformaçãoExtra"
                        value={extra}
                        onChangeText={(text) => setExtra(text)}
                     />
                  </View>
               </ContainerInput>

               <ContainerButtons>
                  <ButtonSave 
                     onPress={editContact}
                     color={name && email && phone} 
                     disabled={name && email && phone ? false : true} 
                  >
                     {loading 
                        ? <ActivityIndicator size={27} color="#fff" />
                        : <ButtonText>EDIT</ButtonText>
                     }
                  </ButtonSave>

                  <ButtonCancel onPress={() => setVisible(false)}>
                     <ButtonText>CANCELAR</ButtonText>
                  </ButtonCancel>
               </ContainerButtons>
            </ScrollView>
         </ModalView>
      </Modal>
   );
};

export default EditContact;
