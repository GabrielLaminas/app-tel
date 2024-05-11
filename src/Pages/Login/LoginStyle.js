import styled from 'styled-components/native';

const MainView = styled.View`
   padding: 16px;
   flex: 1;
`;

const MainTitle = styled.Text`
   font-size: 32px;
   text-align: center;
   font-weight: 700;
`;

const ViewIcon = styled.Text`
   margin: 24px auto;
   padding: 25px;
   background-color: gray;
   border-radius: 200px
`;

const ContainerInput = styled.View`
   margin-bottom: 24px;
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

const ButtonContaText = styled.Text`
   color: #000;
   font-size: 17px;
   text-decoration: underline;
`;

const ButtonEntrar = styled.TouchableOpacity`
   margin-top: 24px;
   padding: 14px;
   display: flex;
   flex-direction: row;
   gap: 8px;
   align-items: center;
   justify-content: center;
   background-color: ${props => props.color ? 'green' : 'gray' };
   border-radius: 4px;
`;

const ButtonEntrarText = styled.Text`
   text-align: center;
   font-size: 20px;
   font-weight: 600;
   text-transform: uppercase;
   color: #fff
`;

const ErrorText = styled.Text`
   margin-top: 8px;
   color: red;
`;

export { 
   MainView, MainTitle, ViewIcon, ContainerInput, TextLabel, Input, ButtonContaText, ButtonEntrar, ButtonEntrarText, ErrorText
};