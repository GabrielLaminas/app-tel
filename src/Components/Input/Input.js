import { ViewInput, ViewLabel, ViewTextInput, ViewTextError} from "./InputStyle.js";

const Input = ({textLabel, errorMessage, setInput, ...props}) => {
   return (
      <ViewInput>
         <ViewLabel nativeID={`formLabel${textLabel}`}>
            {textLabel}
         </ViewLabel>

         <ViewTextInput
            accessibilityLabel="input"
            accessibilityLabelledBy={`formLabel${textLabel}`}
            onChangeText={(text) => setInput(text)}
            {...props}
         />

         {errorMessage && <ViewTextError>{errorMessage}</ViewTextError>}
      </ViewInput>
   );
};

export default Input;
