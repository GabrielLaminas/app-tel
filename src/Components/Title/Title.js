import styled from "styled-components/native";

const TitlePage = styled.Text`
   margin-bottom: ${props => props.margin ? props.margin : "" };
   color: #185A3D;
   font-size: 32px;
   text-transform: uppercase;
   text-align: center;
   font-weight: 700;
`;

const Title = ({children}) => {
   return (
      <TitlePage>{children}</TitlePage>
   );
};


export default Title;
