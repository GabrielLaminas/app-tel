import styled from "styled-components/native";

const MainView = styled.View`
   flex: 1;
   background-color: #fff;
   position: relative;
`
const ViewCamera = styled.View`
   margin-top: 36px;
   margin-bottom: 40px;
   justify-content: center;
   align-items: center;
`
const ViewImageBackground = styled.ImageBackground`
   width: 160px;
   height: 160px;
   border-radius: 999px;
   overflow: hidden;
`;

const ButtonCamera = styled.TouchableOpacity`
   width: 160px;
   height: 160px;
   justify-content: center;
   align-items: center;
   border-radius: 999px;
   overflow: hidden;
`

const ButtonSave = styled.TouchableOpacity`
   margin-top: 46px;
   padding: 20px;
   background-color: #2E7555;
   border-radius: 14px;
`

const ButtonSaveText = styled.Text`
   color: #fff;
   font-size: 20px;
   font-weight: 600;
   text-align: center;
   text-transform: uppercase;
`

export {
   MainView, ViewCamera, ViewImageBackground, ButtonCamera, ButtonSave, ButtonSaveText
}