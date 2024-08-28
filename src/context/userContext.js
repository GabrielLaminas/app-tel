import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, update } from "firebase/database";
import { auth, database } from "../Firebase/firebase.js";

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

   async function updateFavorite(favoriteStatus, idContact){ 
      try {
         const referencia = ref(database, `AppTelContato/${credential?.uid}/${idContact}`);
         if(favoriteStatus){
            await update(referencia, { favorito: false })
         } else {
            await update(referencia, { favorito: true })
         }
      } catch (error) {
         console.log(error)
      }
   }

   return(
      <UserContext.Provider value={{
         credential,
         user: credential?.uid,
         loading, logOut,
         updateFavorite
      }}>
         {children}
      </UserContext.Provider>
   )
}

export default User;