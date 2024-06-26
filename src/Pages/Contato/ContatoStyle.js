import styled from "styled-components/native";

const MainView = styled.View`
   padding: 16px 16px 0 16px;
   flex: 1;
   background-color: #FFFFFF;
`;

const InfoView = styled.View`
   margin: 32px 0 24px 0;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

const InfoViewText = styled.Text`
   color: #45505E;
   font-size: 16px;
   font-weight: 500;
`;

const InfoViewIcon = styled.View`
   width: 48px;
   height: 48px;
   justify-content: center;
   align-items: center;
   background-color: #F3F5F7;
   border-radius: 999px;
`;

const CardView = styled.View`
   padding: 24px;
   gap: 12px;
   background-color: #F0F9F5;
   border-radius: 14px;
`;

const CardViewNome = styled.Text`
   color: #1A1E23;
   font-size: 24px;
   font-weight: 700;
`;

const CardViewNumero = styled.Text`
   color: #45505E;
   font-size: 24px;
   font-weight: 400;
`;

const NoItemsList = styled.Text`
   color: #45505E;
   font-size: 17px;
   font-weight: 400;
   text-align: center;
`;

export { 
   MainView, InfoView, InfoViewText, InfoViewIcon, CardView, CardViewNome, CardViewNumero, NoItemsList 
}