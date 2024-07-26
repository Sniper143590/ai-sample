import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import userRegister from "@/lib/firebase/userRegister"
import userLogin from "@/lib/firebase/userLogin"
import sendResetPassLink from "@/lib/firebase/sendResetPassLink"
import { auth } from "@/lib/firebase/db"
import Notify from "@/components/Notify";
import imageCompression from 'browser-image-compression';
import { uploadImage } from "@/lib/firebase/storageHandler";
import { toast } from "react-hot-toast";
import handleTxError from "@/lib/handleTxError"
import getUserDataByEmail from "@/lib/firebase/getUserDataByEmail"
import createUserFromCredential from "@/lib/createUserFromCredential"
// import { User } from 'firebase/auth'
import { changePassword } from "@/lib/firebase/changePassword"
import { changeUserName, changePhotoURL, getUserData } from "@/lib/firebase/userHandler"
import useSocialLogin from "./useSocialLogin"

const useAuthFlow = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const socialLogins = useSocialLogin()

  const [userName, setUserName] = useState<string>("")
  const [avatar, setAvatar] = useState("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userPassword, setUserPassword] = useState<string>("")
  const [userPasswordConfirm, setUserPasswordConfirm] = useState<string>("")
  const [userData, setUserData] = useState<any>({});

//   const isSignUpPage = pathname.includes("/signup") || pathname === "/"
//   const isSignInPage = pathname.includes("/signin")
//   const isResetPage = pathname.includes("/forgotpass")

  const isAuthenticated = userData

  const updatePassword = async () => {
    if(userEmail){
      const response: any = await sendResetPassLink(userEmail)
      if (response?.error) {
          return
      }
      else {
          router.push("/")
      }
    }
    
  }

  const register = async () => {
    setLoading(true)
    if(userEmail && userPassword) {
      const response = await userRegister(userEmail, userPassword)
    if (response?.error) {
        setLoading(false)
        console.log("Error ------->",response.error)
        return false
    } else {
      toast((t) => (
        <Notify iconCheck>
            <div className="mr-6 ml-3 h6 ml-4">Successfully signed up! Check your mail box to verify your email.</div>
        </Notify>
      ));
      setLoading(false)
      return true
    }
    } return false
  }

  const checkEmail = async () => {
    if(userEmail) {
      const response: any = await getUserDataByEmail(userEmail)

    if (response) {
      toast.error("Already registered!")
      router.push("/signin")
      return
    }
    }
  }

  const login = async () => {
    setLoading(true)
    const response: any = await userLogin(userEmail, userPassword)
    if (!response?.error) {
        setLoading(false)
        toast((t) => (
          <Notify iconCheck>
              <div className="mr-6 ml-3 h6 ml-4">Successfully signed in!</div>
          </Notify>
        ));
        return true
    }
    setLoading(false)
    return false
  }

  const logout = async () => {
    try {
      router.push("/")
      setLoading(true)
      await auth.signOut()
      setUserData(null)
      setLoading(false)
      return

    } catch (err) {
      handleTxError(err)
      setLoading(false)
    }
  }

  const compressImage = async (imageFile:File) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
    };
    try {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile;
    } catch (error) {
        console.error("Error compressing image:", error);
        throw error
    }
}

  const updateNameAndPasswordFromSettings = async (newPwd:string, name:string, photo?:File) => {
    try {
      setLoading(true)
      let resultOfName = true, resultOfPwd = true;
      if(newPwd!=="") {
        resultOfPwd = await changePassword(newPwd)
      } 
      if (name!==userName){
        resultOfName = await changeUserName(name, userData.uid)
        setUserName(name)
        setUserData((prev:{}) => ({ ...prev, displayName: name }));
      }
      if (photo){
        let url;
        try {
            if (avatar) {
                const compressedImage = await compressImage(photo)
                url = await uploadImage(compressedImage, userData.uid)
                if (url==="error") {
                    setLoading(false)
                    toast(() => (
                        <Notify iconClose>
                            <div className="mr-6 ml-3 h6 ml-4">Invalid File Format!</div>
                        </Notify>
                    ));
                    return false
                } else {
                    setAvatar(url)
                }
            } else {
                url = avatar
            }
        } catch (error) {
            console.log(error)
            toast(() => (
                <Notify iconClose>
                    <div className="mr-6 ml-3 h6 ml-4">Invalide File Format!</div>
                </Notify>
            ));
            setLoading(false)
            return false
        }
        const resultOfAvatar = await changePhotoURL(url, userData.uid)
        if (resultOfAvatar){
          setUserData((prev:{})=>({...prev, photoURL:url}))
        }
      }
      setLoading(false)
      if (resultOfName&&resultOfPwd){
        toast((t) => (
          <Notify iconCheck>
              <div className="mr-6 ml-3 h6 ml-4">Successfully updated!</div>
          </Notify>
        ));
      } else {
        toast((t) => (
          <Notify iconClose>
              <div className="mr-6 ml-3 h6 ml-4">Failed to update!</div>
          </Notify>
        ));
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("done")
      if (user) {
        setLoading(true)
        await createUserFromCredential(user)
        const userData = await getUserData(user.email)
        // console.log("Here >>>>", userData)
        setUserEmail(userData[0].email || "")
        setUserData(userData[0])
        setUserName(userData[0].displayName?userData[0].displayName:"")
        setAvatar(userData[0].photoURL?userData[0].photoURL:"")
        localStorage.setItem("userData", JSON.stringify(userData[0]))
        setLoading(false)
      } else {
        router.push("/");
        localStorage.setItem("token", "");
        localStorage.setItem("userData", JSON.stringify(""));
        setUserData(null);
    }
    
    })
  }, [])

  return {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userName,
    setUserName,
    register,
    login,
    loading,
    updatePassword,
    isAuthenticated,
    userData,
    logout,
    ...socialLogins,
    checkEmail,
    avatar,
    setAvatar,
    userPasswordConfirm,
    setUserPasswordConfirm,
    updateNameAndPasswordFromSettings,
  }
}

export default useAuthFlow
