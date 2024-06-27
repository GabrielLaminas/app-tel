import styled from "styled-components/native";

const MainView = styled.View`
   padding: 0 16px;
   flex: 1;
   background-color: #fff;
`;

const ViewName = styled.View`
   margin-top: 40px;
   gap: 16px;
   align-items: center;
`;

const ViewNameCircle = styled.View`
   width: 150px;
   height: 150px;
   justify-content: center;
   align-items: center;
   background-color: #F3F5F7;
   border-radius: 85px;
`;

const ViewNameCircleLetter = styled.Text`
   color: #1A1E23;
   font-size: 32px;
   font-weight: 600;
   text-align: center;
`;

const ViewFullName = styled.Text`
   color: #185A3D;
   font-size: 20px;
   font-weight: 500;
   text-align: center;
`;

const ViewIcons = styled.View`
   margin: 24px 0 42px 0;
   display: flex;
   flex-direction: row;
   justify-content: center;
   gap: 42px;
`;

const ViewIconsGroup = styled.View`
   gap: 8px;
   align-items: center;
`;

const ViewIconsButton = styled.TouchableOpacity`
   width: 44px;
   height: 44px;
   align-items: center;
   justify-content: center;
   background-color: #F3F5F7;
   border-radius: 50px;
`;

const ViewIconsGroupText = styled.Text`
   color: #1A1E23;
   font-size: 14px;
   font-weight: 400;
`;

const ViewInfos = styled.View`
   gap: 20px;
`;

const ViewInfosItem = styled.View`
   padding-bottom: 20px;
   gap: 10px;
   border-bottom-color: ${props => props.borderB ? 'rgba(217, 217, 217, 0.4)' : 'auto'};
   border-bottom-width: 1px;
`;

const ViewInfosItemTitle = styled.Text`
   color: #185A3D;
   font-size: 24px;
   font-weight: 600;
`;

const ViewInfosItemBody = styled.Text`
   color: #45505E;
   font-size: 20px;
   font-weight: 400;
`;

export {
   MainView, ViewName, ViewNameCircle, ViewNameCircleLetter, ViewFullName,  ViewIcons, ViewIconsButton, ViewIconsGroup, ViewIconsGroupText,  ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody
}