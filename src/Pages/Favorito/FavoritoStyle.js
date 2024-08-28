import styled from "styled-components/native";

const MainView = styled.View`
  padding: 16px 16px 0 16px;
  flex: 1;
  background-color: #FFFFFF;
`;

const ViewFlat = styled.View`
  margin-top: 32px;
`;

const CardView = styled.View`
  padding: 16px 24px;
  gap: 12px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #F0F9F5;
  border-radius: 14px;
`;

const CardViewNome = styled.Text`
  color: #1A1E23;
  font-size: 20px;
  font-weight: 500;
`;

export {
  MainView, ViewFlat, CardView, CardViewNome
}