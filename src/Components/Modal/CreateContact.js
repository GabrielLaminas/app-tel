import { 
   View, Modal, ScrollView, Keyboard,
   ActivityIndicator
} from "react-native";
import {
   ModalView, MainTitle, ContainerInput, TextLabel, Input, ErrorText,
   ContainerButtons, ButtonSave, ButtonCancel, ButtonText
} from "./ModalStyle.js"

import React from "react";

import { schemaModal } from '../../Validation/validation.js';

import { useAuth, database } from "../../Firebase/firebase.js";
import { ref, child, push, set } from 'firebase/database';

const CreateContact = ({visible, setVisible}) => {
   const [name, setName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [phone, setPhone] = React.useState('');
   const [extra, setExtra] = React.useState('');
   const [feedback, setFeedback] = React.useState({});
   const [loading, setLoading] = React.useState(false);
   const user = useAuth();

   async function createContact(){
      try {
         if(!user) return;
         setLoading(true);
         const newKey = push(child(ref(database), `AppTelContato/${user}`)).key;
         const referencia = ref(database, `AppTelContato/${user}`);
         const result = await schemaModal.validate({name, email, phone, extra}, {abortEarly: false});

         if(result.name && result.email && result.phone){
            await set(child(referencia, newKey), {
               nome: result.name,
               email: result.email,
               numero: result.phone,
               extra: result.extra
            });
         }
         setName('');
         setEmail('');
         setPhone('');
         setExtra('');
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
               <MainTitle>Criar Contato</MainTitle>

               <ContainerInput>
                  <View>
                     <TextLabel nativeID="formLabelEmail">Nome *</TextLabel>
                     <Input 
                        autoFocus={true}
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
                     <TextLabel nativeID="formLabelEmail">Telefone *</TextLabel>
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
                     <TextLabel nativeID="formLabelEmail">Informação Extra</TextLabel>
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
                     onPress={createContact}
                     color={name && email && phone} 
                     disabled={name && email && phone ? false : true} 
                  >
                     {loading 
                        ? <ActivityIndicator size={27} color="#fff" />
                        : <ButtonText>SALVAR</ButtonText>
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

export default CreateContact;
