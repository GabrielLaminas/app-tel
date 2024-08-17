import styled from "styled-components/native";

const MainView = styled.View`
   flex: 1;
   background-color: #fff;
   position: relative;
`

const ViewContainer = styled.View`
   padding: 56px 16px 42px 16px;
   flex: 1;
   justify-content: space-between;
`

const ViewContainerContent = styled.View`
   flex: 1;
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
   margin-top: 36px;
   padding: 16px 20px;
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

const ModalButton = styled.View`
   flex: 1;
   background-color: rgba(0, 0, 0, .15);
`

const ModalMain = styled.View`
   width: 100%;
   padding: 24px;
   position: absolute;
   bottom: 0;
   background-color: #FFF;
   border-top-left-radius: 24px;
   border-top-right-radius: 24px;
`

const ModalHeader = styled.View`
   margin-bottom: 32px;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   gap: 16px;
`

const ModalHeaderTitle = styled.Text`
   color: #1A1E23;
   font-size: 20px;
   font-weight: 500;
`

const ModalGroupButtons = styled.View`
   flex-direction: row;
   gap: 28px;
`

const ModalGroupColumn = styled.View`
   gap: 8px;
   align-items: center;
`

const ModalGroupColumnButton = styled.TouchableOpacity`
   width: 52px;
   height: 52px;
   justify-content: center;
   align-items: center;
   background-color: #F3F5F7;
   border: 1px solid rgba(47, 53, 66, 0.2);
   border-radius: 999px;
`

const ModalGroupColumnText = styled.Text`
   color: ${({color}) => color ? '#B8B8B8' : '#185A3D' };
   font-size: 14px;
   font-weight: 400;
`

export {
   MainView, ViewContainer, ViewContainerContent, ViewCamera, ViewImageBackground, ButtonCamera, ButtonSave, ButtonSaveText,
   ModalButton, ModalMain, ModalHeader, ModalHeaderTitle, ModalGroupButtons, ModalGroupColumn, 
   ModalGroupColumnButton, ModalGroupColumnText
}