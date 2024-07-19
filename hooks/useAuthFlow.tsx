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
import useSocialLogin from "./useSocialLogin"
import useIsMobile from "./useIsMobile"

const useAuthFlow = () => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const socialLogins = useSocialLogin()

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userData, setUserData] = useState({});

//   const isSignUpPage = pathname.includes("/signup") || pathname === "/"
//   const isSignInPage = pathname.includes("/signin")
//   const isResetPage = pathname.includes("/forgotpass")

  const isAuthenticated = userData

  const updatePassword = async () => {
    const response: any = await sendResetPassLink(userEmail)
    if (response?.error) {
        return
    }
    else {
        router.push("/")
    }
  }

  const register = async () => {
    setLoading(true)
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
  }

  const checkEmail = async () => {
    const response: any = await getUserDataByEmail(userEmail)

    if (response) {
      toast.error("Already registered!")
      router.push("/signin")
      return
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

  const logout = () => {
    try {
      auth.signOut()
    } catch (err) {
      handleTxError(err)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const data = await createUserFromCredential(user)
        setUserData(data)
        return
      }
      setUserData({})
    })
  }, [userData])

  useEffect(() => {

  }, [pathname, isMobile])

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
  }
}

export default useAuthFlow
