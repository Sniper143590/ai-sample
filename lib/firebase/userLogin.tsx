import { signInWithEmailAndPassword } from "firebase/auth"
import handleTxError from "../handleTxError"
import { auth } from "./db"

const userLogin = async (email:any, password:any) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    // console.log(credential.user.getIdToken())

    if (!credential.user.emailVerified) {
      return { error: "Email is not verified" }
    }
    // console.log(credential)
    localStorage.setItem("token", await credential.user.getIdToken(true))
   
    return credential
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}

export default userLogin
