import styled from "styled-components/native";

const MainView = styled.View`
   padding: 16px 16px 0 16px;
   flex: 1;
`;

const MainTitle = styled.Text`
   font-size: 32px;
   text-align: center;
   font-weight: 700;
`;

const InfoView = styled.View`
   margin: 38px 0 16px 0;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

const InfoViewText = styled.Text`
   font-size: 20px;
   font-weight: 500;
`;

const CardView = styled.View`
   padding: 18px;
   gap: 8px;
   background-color: #D9D9D9;
   border-radius: 10px;
`;

const CardViewNome = styled.Text`
   font-size: 24px;
   font-weight: 700;
`;

const CardViewNumero = styled.Text`
   font-size: 20px;
   font-weight: 600;
`;

const CardViewEmail = styled.Text`
   font-size: 18px;
   font-weight: 500;
`;

const CardViewExtra = styled.Text`
   font-size: 16px;
   font-weight: 400;
`;

const NoItemsList = styled.Text`
   font-size: 16px;
   font-weight: 400;
   text-align: center;
   color: black
`;

export { 
   MainView, MainTitle, InfoView, InfoViewText, 
   CardView, CardViewNome, CardViewNumero, CardViewEmail, CardViewExtra,
   NoItemsList 
}