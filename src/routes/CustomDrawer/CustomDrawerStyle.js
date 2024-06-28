import styled from "styled-components/native";

const ViewDataUser = styled.View` 
margin-bottom: 42px;
gap: 20px;
align-items: center;
`;

const ViewDataUserView = styled.View`
   width: 148px;
   height: 148px;
   justify-content: center;
   align-items: center;
   background-color: #F3F5F7;
   border-radius: 80px;
   overflow: hidden;
`;

const ViewDataUserImg = styled.Image`
   width: 100%;
   height: 100%;
`;

const ViewDataUserInfo = styled.View`
   gap: 12px;
`;

const ViewDataUserInfoName = styled.Text`
   color: #1A1E23;
   font-size: 20px;
   font-weight: 500;
   text-align: center;
`;

const ViewDataUserInfoEmail = styled.Text`
   color: #45505E;
   font-size: 16px;
   font-weight: 400;
   text-align: center;
`;

const ViewNav = styled.View`
   gap: 12px;
`;

const ViewNavLink = styled.TouchableOpacity`
   padding: 8px;
   flex-direction: row;
   gap: 12px;
   align-items: center;
   background-color: ${({active}) => active ? '#2E7555': 'auto'};
   border-radius: 6px;
`;

const ViewNavLinkText = styled.Text`
   color: ${({active}) => active ? '#FFFFFF': '#1A1E23'};
   font-size: 16px;
   font-weight: 400;
`;

const ViewNavLinkTextExit = styled.Text`
   color: #FF6348;
   font-size: 16px;
   font-weight: 400;
`;

export {
   ViewDataUser, ViewDataUserView, ViewDataUserImg, ViewDataUserInfo, ViewDataUserInfoName, ViewDataUserInfoEmail, ViewNav, ViewNavLink, ViewNavLinkText, ViewNavLinkTextExit
}