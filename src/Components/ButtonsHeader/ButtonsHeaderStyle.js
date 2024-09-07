import styled from "styled-components/native";

const ContainerView = styled.View`
  margin-right: 20px;
  position: relative;
`;

const ViewButtons = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const ViewDropDown = styled.View`
  padding: 10px 20px;
  gap: 14px;
  position: absolute;
  top: 110%;
  right: -8px;
  z-index: 100;
  background-color: #FAFAFA;
  display: ${({visible}) => visible ? 'flex' : 'none'};
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .1);
`;


const TextDropDown = styled.Text`
  color: #1A1E23;
  text-align: right;
`

export {
  ContainerView, ViewButtons, ViewDropDown, TextDropDown
}