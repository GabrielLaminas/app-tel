import styled from "styled-components/native";

const ViewInput = styled.View`
   gap: 8px;
`;

const ViewLabel = styled.Text`
   color: #185A3D;
   font-size: 16px;
   font-weight: 500;
`;

const ViewTextInput = styled.TextInput`
   padding: 14px 20px;
   background-color: #FAFAFA;
   color: #45505E;
   font-size: 14px;
   font-weight: 400;
   border: 1px solid rgba(47, 53, 66, 0.2);
   border-radius: 14px;
`;

const ViewTextError = styled.Text`
   color: #FF6348;
   font-size: 14px;
   font-weight: 400;
`;

export {
   ViewInput, ViewLabel, ViewTextInput, ViewTextError
}