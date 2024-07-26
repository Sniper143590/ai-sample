import { and, updateDoc, collection, getDocs, query, where} from "firebase/firestore"
import { db, auth } from "./db"

export const changeUserName = async (name:string, uid:string) => {
    try {
      const q = query(
          collection(db, "users"),
          and(where("uid", "==", uid)),
      )
      const querySnapshot = await getDocs(q);
      let docToUpdate = null;

      // console.log(newChatModule.avatar)
  
      querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) { // Check if the document's field matches the known value
          docToUpdate = doc.ref;
      }
      });
  
      if (docToUpdate) {
          await updateDoc(docToUpdate, {
              displayName:name// Replace "fieldName" with the actual field name and "NewValue" with the new value you want to set
          });
          // console.log("Document successfully updated!");
      } else {
          console.log("No document found with the specified field value.");
      }
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

export const changePhotoURL = async (url:string, uid:string) => {
    try {
      const q = query(
          collection(db, "users"),
          and(where("uid", "==", uid)),
      )
      const querySnapshot = await getDocs(q);
      let docToUpdate = null;

      // console.log(newChatModule.avatar)
  
      querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) { // Check if the document's field matches the known value
          docToUpdate = doc.ref;
      }
      });
  
      if (docToUpdate) {
          await updateDoc(docToUpdate, {
              photoURL:url// Replace "fieldName" with the actual field name and "NewValue" with the new value you want to set
          });
          // console.log("Document successfully updated!");
      } else {
          console.log("No document found with the specified field value.");
      }
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

 export const getUserData = async (email:string | null) => {
    try {
        if (email === null) {
            throw {"error":"error"}
        }
      console.log(auth.currentUser)
      const q = query(
          collection(db, "users"),
          and(where("email", "==", email)),
      )
      const userData = await getDocs(q);
    //   console.log(userData)

      return userData.docs.map((doc) => ({
          uid:doc.data().uid,
          displayName: doc.data().displayName,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          createdAt: doc.data().createdAt,
      }))
    } catch (error) {
      throw error;
    }
  }


  


