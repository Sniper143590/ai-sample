import signInWithGoogle from "@/lib/firebase/siginInWithGoogle"
import { useRouter } from "next/navigation"
import Notify from "@/components/Notify";
import { toast } from "react-hot-toast";

const useSocialLogin = () => {
  const router = useRouter()

  const googleSign = async () => {
    const response: any = await signInWithGoogle()
    if (response?.error) return
    toast((t) => (
      <Notify iconCheck>
          <div className="mr-6 ml-3 h6 ml-4">Successfully signed in!</div>
      </Notify>
    ));
    router.push('/admin')

  }

  return {
    googleSign,
  }
}

export default useSocialLogin
