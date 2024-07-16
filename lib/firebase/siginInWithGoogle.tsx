import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "./db"
import handleTxError from "../handleTxError"

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(response)
    console.log(credential)
    return credential
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}

export default signInWithGoogle
