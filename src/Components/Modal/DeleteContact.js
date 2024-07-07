import { Modal, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { ref, remove } from "firebase/database";
import { database } from "../../Firebase/firebase.js"
import { UserContext } from "../../context/userContext";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const DeleteContact = ({visible, setVisible, uid, userName}) => {
   const { navigate } = useNavigation()
   const { user } = React.useContext(UserContext);
   const [loading, setLoading] = React.useState(false);

   async function removeContact(){
      try {
         setLoading(true)
         const referencia = ref(database, `AppTelContato/${user}/${uid}`);
         await remove(referencia);
         setVisible({...visible, "deleteModal": false})
         navigate('Root');
      } catch (error) {
         console.log(error.message)
      } finally {
         setLoading(false)
      }
   }

   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={visible.deleteModal}
         onRequestClose={() => {
            setVisible({...visible, "deleteModal": false})
         }}
      >
         <ModalContent>
            <ModalContainer>
               <ModalTitle>Excluir Contato</ModalTitle>

               <ModalTextBody>
                  Tem certeza que deseja excluir <TextStrong>{userName}</TextStrong> da sua lista de contatos?
               </ModalTextBody>

               <ContainerButtons>
                  <BtnDelete onPress={() => removeContact()}>
                     {
                        loading 
                        ? <ActivityIndicator size={27} color="#fff" />
                        : <BtnDeleteText>Excluir</BtnDeleteText>
                     }
                  </BtnDelete> 

                  <BtnCancel onPress={() => setVisible({...visible, "deleteModal": false })}>
                     <BtnCancelText>Cancelar</BtnCancelText>
                  </BtnCancel> 
               </ContainerButtons>
            </ModalContainer>
         </ModalContent>
      </Modal>
   );
};


const ModalContent = styled.View`
   padding: 16px;
   flex: 1;
   justify-content: center;
   align-items: center;
   background-color: rgba(0, 0, 0, .5);
`

const ModalContainer = styled.View`  
   width: 100%;
   padding: 46px 24px 24px 24px;
   background-color: #FFFFFF;
   border-radius: 14px;
`

const ModalTitle = styled.Text`
   margin-bottom: 24px;
   color: #FF6348;
   font-size: 28px;
   font-weight: 700;
   text-align: center;
   text-transform: uppercase;
`

const ModalTextBody = styled.Text`
   margin-bottom: 56px;
   color: #45505E;
   font-size: 20px;
   font-weight: 400;
   line-height: 30px;
`

const TextStrong = styled.Text`
   font-weight: 700;
`

const ContainerButtons = styled.View`
   flex-direction: row;
   gap: 20px;
`

const BtnDelete = styled.TouchableOpacity`
   flex: 1;
   padding: 12px 24px;
   flex-direction: row;
   gap: 8px;
   align-items: center;
   justify-content: center;
   background-color: #FF6348;
   border-radius: 7px;
`

const BtnDeleteText = styled.Text`
   color: #fff;
   font-size: 20px;
   font-weight: 600;
   text-align: center;
   text-transform: uppercase;
`

const BtnCancel = styled.TouchableOpacity`
   padding: 12px 24px;
   background-color: transparent;
`

const BtnCancelText = styled.Text`
   color: #45505E;
   font-size: 20px;
   font-weight: 600;
   text-align: center;
   text-transform: uppercase;
`

export default DeleteContact;
