import { Modal, ScrollView, Keyboard,} from "react-native";
import { ModalView, ContainerInput,ContainerButtons } from "./ModalStyle.js"

import Title from "../Title/Title.js";
import Input from "../Input/Input.js";
import { BtnSuccess, BtnCancel } from "../Buttons/Buttons.js";

import {useState, useContext} from "react";

import { schemaModal } from '../../Validation/validation.js';

import { database } from "../../Firebase/firebase.js";
import { ref, child, push, set } from 'firebase/database';
import { UserContext } from "../../context/userContext.js";

const CreateContact = ({visible, setVisible}) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [extra, setExtra] = useState('');
   const [feedback, setFeedback] = useState({});
   const [loading, setLoading] = useState(false);
   const { user } = useContext(UserContext);

   async function createContact(){
      try {
         setLoading(true);
         const newKey = push(child(ref(database), `AppTelContato/${user}`)).key;
         const referencia = ref(database, `AppTelContato/${user}`);
         const result = await schemaModal.validate({name, email, phone, extra}, {abortEarly: false});

         if(result.name && result.email && result.phone){
            await set(child(referencia, newKey), {
               nome: result.name,
               email: result.email,
               numero: result.phone,
               extra: result.extra,
               favorito: false
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
            <ScrollView showsVerticalScrollIndicator={false} >
               <Title>Criar Contato</Title>

               <ContainerInput>
                  <Input 
                     textLabel="Nome *"
                     value={name}
                     setInput={setName}
                     errorMessage={feedback?.name}
                     autoFocus={true}
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
                     onPress={createContact}
                     color={name && email && phone} 
                     disabled={name && email && phone ? false : true} 
                     status={loading}
                  >
                     Criar
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

export default CreateContact;
