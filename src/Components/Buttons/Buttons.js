import { 
   ButtonSuccess, ButtonSuccessText 
} from "./ButtonsStyle.js";
import { ActivityIndicator } from "react-native";

const BtnSuccess = ({children, status, color, ...props}) => {
   return (
      <ButtonSuccess
         color={color}
         {...props}sadasd
      >  
         {
            status
            ? <ActivityIndicator size={27} color="#fff" />
            : <ButtonSuccessText>{children}</ButtonSuccessText>
         }
      </ButtonSuccess>
   );
};

export default BtnSuccess;
