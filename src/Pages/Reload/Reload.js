import { ActivityIndicator, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ViewContainer, ViewIcon } from "./ReloadStyle.js"

export default function Reload() {
   return (
      <ViewContainer>
         <ViewIcon>
            <Icon name="phone" size={86} color="#fff" />
         </ViewIcon>
         
         <ActivityIndicator size={32} color="#D9D9D9" />

         <StatusBar hidden={true} />
      </ViewContainer>
   );
}
