import { createContext, ReactNode, useContext, useMemo } from "react"
import useAuthFlow from "../hooks/useAuthFlow"


interface AuthProviderProps {
    children: ReactNode;
  }
interface AuthContextData {
    checkEmail: () => Promise<void>;
    googleSign: () => Promise<void>;
    userEmail: string | null;
    loading:boolean;
    setUserEmail: React.Dispatch<React.SetStateAction<string|null>>;
    userPassword: string| null;
    setUserPassword: React.Dispatch<React.SetStateAction<string|null>>;
    register: () => Promise<boolean>;
    updatePassword:()=>Promise<void>;
    login: () => Promise<boolean>;
    logout: () => void;
    userData:any;
    userName:string;
    avatar:string;
    setAvatar:React.Dispatch<React.SetStateAction<string>>;
    userPasswordConfirm:string | null;
    setUserPasswordConfirm:React.Dispatch<React.SetStateAction<string | null>>;
    updatePasswordFromSettings:(pwd:string) =>void;
}

const AuthContext = createContext<AuthContextData | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const authData = useAuthFlow()

  const value = useMemo(
    () => ({
      ...authData,
    }),
    [authData],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}

export default AuthProvider
