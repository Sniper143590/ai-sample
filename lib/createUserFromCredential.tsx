import { doc, setDoc } from "firebase/firestore"
import { User } from "firebase/auth"
import { db } from "./firebase/db"


const createUserFromCredential = async (user:User) => {
  try {
    const userRef = doc(db, "users", user.uid);

    await setDoc(userRef, {
      uid:user.uid,
      email: user.email,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL || null,
      createdAt: new Date(),
    })
    return user
  } catch (error) {
    console.log("Error while registering >>>", error)
    return { error }
  }
}

export default createUserFromCredential
