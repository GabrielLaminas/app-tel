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

const ViewIcons = styled.View`
   margin: 30px 0 42px 0;
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   gap: 20px;
`;

const ViewIconsButton = styled.TouchableOpacity`
   width: 50px;
   height: 50px;
   align-items: center;
   justify-content: center;
   background-color: gray;
   border-radius: 50px;
`;

const ViewInfos = styled.View`
   gap: 36px;
`;

const ViewInfosItem = styled.View`
   gap: 12px;
`;

const ViewInfosItemTitle = styled.Text`
   font-size: 24px;
   font-weight: 600;
`;

const ViewInfosItemBody = styled.Text`
   font-size: 24px;
   font-weight: 400;
`;

export {
   MainView, MainTitle, ViewIcons, ViewIconsButton, ViewInfos, ViewInfosItem, ViewInfosItemTitle, ViewInfosItemBody
}