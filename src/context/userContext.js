import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.js";

export const UserContext = React.createContext();

function User({children}){
   const [credential, setCredential] = React.useState(null);
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if(user){
            setCredential(user);
            setLoading(false);
         }else{
            setCredential(null);
         }
         setLoading(false);
      });

      return () => unsubscribe();
   }, []);

   async function logOut(){
      await signOut(auth);
   }

   return(
      <UserContext.Provider value={{
         credential,
         user: credential?.uid,
         loading, logOut
      }}>
         {children}
      </UserContext.Provider>
   )
}

export default User;