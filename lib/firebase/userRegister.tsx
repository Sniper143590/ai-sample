import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import createUserFromCredential from "../createUserFromCredential"
import handleTxError from "../handleTxError"
import { auth } from "./db"

const userRegister = async (email:string, password:string) => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    // console.log("Credentials------", credential)
    const currentUser = auth.currentUser;
    if (currentUser) {
        await sendEmailVerification(currentUser)
    }
    await createUserFromCredential(credential.user)
    return credential.user.uid as any
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}    

export default userRegister
