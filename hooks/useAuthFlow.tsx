import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import userRegister from "@/lib/firebase/userRegister"
import userLogin from "@/lib/firebase/userLogin"
import sendResetPassLink from "@/lib/firebase/sendResetPassLink"
import { auth } from "@/lib/firebase/db"
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";
import handleTxError from "@/lib/handleTxError"
import getUserDataByEmail from "@/lib/firebase/getUserDataByEmail"
import createUserFromCredential from "@/lib/createUserFromCredential"
// import { User } from 'firebase/auth'
import { changePassword } from "@/lib/firebase/changePassword"
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
      setLoading(false)
      return

    } catch (err) {
      handleTxError(err)
      setLoading(false)
    }
  }

  const updatePasswordFromSettings = async (newPwd:string) => {
    try {
      setLoading(true)
      await changePassword(newPwd)
      setLoading(false)
      toast((t) => (
        <Notify iconCheck>
            <div className="mr-6 ml-3 h6 ml-4">Successfully updated!</div>
        </Notify>
      ));
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("done")
      if (user) {
        const data = await createUserFromCredential(user)
        setUserEmail(user.email || "")
        setUserData(user)
        setUserName(user.displayName?user.displayName:"")
        setAvatar(user.photoURL?user.photoURL:"")
        localStorage.setItem("userData", JSON.stringify(data))
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
    updatePasswordFromSettings,
  }
}

export default useAuthFlow
