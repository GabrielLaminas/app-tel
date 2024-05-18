import { 
   View, Modal, ScrollView
} from "react-native";
import {
   ModalView, MainTitle, ContainerInput, TextLabel, Input,
   ContainerButtons, ButtonSave, ButtonCancel, ButtonText
} from "./ModalStyle.js"

import React from "react";

const CreateContact = ({visible, setVisible}) => {
   return (
      <Modal
         animationType="slide"
         visible={visible}
         onRequestClose={() => {
            setVisible(false)
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
                        accessibilityLabelledBy="formLabelEmail"
                        //value={email}
                        //onChangeText={(text) => setEmail(text.trim())}
                     />
                     {/*feedback?.email && <Text>{feedback.email}</Text>*/}
                  </View>
                  
                  <View>
                     <TextLabel nativeID="formLabelEmail">Email *</TextLabel>
                     <Input
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelEmail"
                        keyboardType="email-address"
                        //value={email}
                        //onChangeText={(text) => setEmail(text.trim())}
                     />
                     {/*feedback?.email && <Text>{feedback.email}</Text>*/}
                  </View>

                  <View>
                     <TextLabel nativeID="formLabelEmail">Telefone *</TextLabel>
                     <Input
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelEmail"
                        //value={email}
                        //onChangeText={(text) => setEmail(text.trim())}
                     />
                     {/*feedback?.email && <Text>{feedback.email}</Text>*/}
                  </View>

                  <View>
                     <TextLabel nativeID="formLabelEmail">Informação Extra</TextLabel>
                     <Input
                        accessibilityLabel="input"
                        accessibilityLabelledBy="formLabelEmail"
                        //value={email}
                        //onChangeText={(text) => setEmail(text.trim())}
                     />
                     {/*feedback?.email && <Text>{feedback.email}</Text>*/}
                  </View>
               </ContainerInput>

               <ContainerButtons>
                  <ButtonSave>
                     <ButtonText>SALVAR</ButtonText>
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
