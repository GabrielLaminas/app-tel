import styled from 'styled-components/native';

const MainView = styled.View`
   flex: 1;
   padding: 100px 16px 16px 16px;
   background-color: #FFFFFF;
`;

const ContainerInput = styled.View`
   margin-top: 62px;
   margin-bottom: 24px;
   gap: 24px;
`;

const ViewConta = styled.View`
   margin-bottom: 46px;
   flex-direction: row;
   gap: 4px;
`;

const ViewContaText = styled.Text`
   color: #353636;
   font-size: 14px;
   font-weight: 400;
`;

const ButtonContaText = styled.Text`
   color: #2E7555;
   font-size: 14px;
   font-weight: 600;
`;

export { 
   MainView, ContainerInput, ViewConta, ViewContaText, ButtonContaText
};