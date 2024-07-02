import { 
   ButtonSuccess, ButtonSuccessText, ButtonCancel, ButtonCancelText 
} from "./ButtonsStyle.js";
import { ActivityIndicator } from "react-native";

const BtnSuccess = ({children, status, color, ...props}) => {
   return (
      <ButtonSuccess
         color={color}
         {...props}
      >  
         {
            status
            ? <ActivityIndicator size={27} color="#fff" />
            : <ButtonSuccessText>{children}</ButtonSuccessText>
         }
      </ButtonSuccess>
   );
};

const BtnCancel = ({children, ...props}) => {
   return (
      <ButtonCancel
         {...props}
      >
         <ButtonCancelText>{children}</ButtonCancelText>
      </ButtonCancel>
   )
}

export { BtnSuccess, BtnCancel};
