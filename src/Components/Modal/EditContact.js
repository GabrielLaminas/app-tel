import { Modal, ScrollView, Keyboard } from "react-native";
import { ModalView, ContainerInput, ContainerButtons } from "./ModalStyle.js"

import Title from "../Title/Title.js";
import Input from "../Input/Input.js";
import { BtnSuccess, BtnCancel } from "../Buttons/Buttons.js";

import {useEffect, useState, useContext} from "react";
import { schemaModal } from '../../Validation/validation.js';
import { database } from "../../Firebase/firebase.js";
import { ref, update } from 'firebase/database';
import { UserContext } from "../../context/userContext.js";

function EditContact({visible, setVisible, uid, userName, userPhone, userEmail, userExtra}){
   const [name, setName] = useState(userName);
   const [email, setEmail] = useState(userEmail);
   const [phone, setPhone] = useState(userPhone);
   const [extra, setExtra] = useState(userExtra);
   const [feedback, setFeedback] = useState({});
   const [loading, setLoading] = useState(false);
   const { user } = useContext(UserContext);

   useEffect(() => {
      setName(userName);
      setEmail(userEmail);
      setPhone(userPhone);
      setExtra(userExtra);
   }, [userName, userPhone, userEmail, userExtra]);

   async function editContact(){
      try {
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
               <Title>Editar Contato</Title>

               <ContainerInput>
                  <Input 
                     textLabel="Nome *"
                     value={name}
                     setInput={setName}
                     errorMessage={feedback?.name}
                  />

                  <Input 
                     textLabel="Email *"
                     value={email}
                     setInput={setEmail}
                     errorMessage={feedback?.email}
                     keyboardType="email-address"
                  />

                  <Input 
                     textLabel="Telefone *"
                     value={phone}
                     setInput={setPhone}
                     errorMessage={feedback?.phone}
                     keyboardType="phone-pad"
                  />

                  <Input 
                     textLabel="Informação Extra"
                     value={extra}
                     setInput={setExtra}
                  />
               </ContainerInput>

               <ContainerButtons>
                  <BtnSuccess
                     onPress={editContact}
                     status={loading}
                     color={name && email && phone} 
                     disabled={name && email && phone ? false : true} 
                  >
                     Editar
                  </BtnSuccess>

                  <BtnCancel onPress={() => setVisible(false)}>
                     Cancelar
                  </BtnCancel>
               </ContainerButtons>
            </ScrollView>
         </ModalView>
      </Modal>
   );
};

export default EditContact;
