import styled from "styled-components/native";

const ModalView = styled.View`
   padding: 24px 16px;
   flex: 1;
   height: 100%;
`;

const MainTitle = styled.Text`
   font-size: 32px;
   text-align: center;
   font-weight: 700;
   text-transform: uppercase;
`;

const ContainerInput = styled.View`
   margin: 32px 0 24px 0;
   gap: 24px;
`;

const TextLabel = styled.Text`
   margin-bottom: 8px;
   font-size: 20px;
   font-weight: 500;
`;

const Input = styled.TextInput`
   padding: 12px 10px;
   border: 1px solid gray;
   border-radius: 4px;
   color: #000
`;

const ErrorText = styled.Text`
   margin-top: 8px;
   color: red;
`;

const ContainerButtons = styled.View`
   flex-direction: row;
   gap: 20px;
`;

const ButtonSave = styled.TouchableOpacity`
   flex: 1;
   padding: 16px 12px;
   background-color: ${ props => props.color ? 'green' : '#b2bec3'};
`;

const ButtonCancel = styled.TouchableOpacity`
   flex: 1;
   padding: 16px 12px;
   background-color: transparent;
   border: 1px solid gray;
`;

const ButtonText = styled.Text`
   font-size: 20px;
   font-weight: 500;
   text-align: center;
`;

export { 
   ModalView, MainTitle, ContainerInput, TextLabel, Input, ErrorText,
   ContainerButtons, ButtonSave, ButtonCancel, ButtonText
}