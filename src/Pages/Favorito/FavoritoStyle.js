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

const ViewNoItems = styled.View`
  gap: 8px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonToContato = styled.TouchableOpacity`
  padding: 12px 24px;
`;

const ButtonToContatoText = styled.Text`
  color: #2E7555;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
`;

const NoItemsList = styled.Text`
  color: #45505E;
  font-size: 17px;
  font-weight: 400;
  text-align: center;
`;

export {
  MainView, ViewFlat, CardView, CardViewNome, ViewNoItems,
  ButtonToContato, ButtonToContatoText, NoItemsList
}