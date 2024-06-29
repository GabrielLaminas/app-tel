import styled from "styled-components/native";

const ButtonSuccess = styled.TouchableOpacity`
   padding: 18px 14px;
   display: flex;
   flex-direction: row;
   gap: 8px;
   align-items: center;
   justify-content: center;
   background-color: ${({color}) => color ? '#2E7555' : '#B8B8B8' };
   border-radius: 14px;
`;

const ButtonSuccessText = styled.Text`
   color: #fff;
   font-size: 20px;
   font-weight: 600;
   text-transform: uppercase;
   text-align: center;
`;

export { ButtonSuccess, ButtonSuccessText }