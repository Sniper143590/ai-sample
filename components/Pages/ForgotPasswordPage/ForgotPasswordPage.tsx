import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/AuthProvider"

const ForgotPasswordPage = () => {
    const router = useRouter()
    const { userEmail, setUserEmail, updatePassword } = useAuth()

    const handleBackClick = () => {
        router.push("/")
    }
    const handleResetPassClick = () => {
        updatePassword()
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center gap-2">
                <div onClick={handleBackClick} className="cursor-pointer">
                    <Image
                        src="/images/forgot-password/arrow-narrow-left.png"
                        width={24}
                        height={24}
                        alt="Arrow Left Image"
                    />
                </div>
                <p className="text-[24px] font-inter font-semibold">Reset your password</p>
            </div>
            <div>
                <label className="input h-[52px] flex items-center gap-3 bg-[#F3F5F7]">
                    <Image 
                        src="/images/auth/email_icon.png"
                        width={20}
                        height={20}
                        alt="Mail Image"
                    />
                    <input type="text" className="grow text-[14px]" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}} placeholder="Username or email" />
                </label>
            </div>
            <button className="h-[52px] w-full btn bg-[#0084FF] hover:bg-[#0084FF] rounded-[12px] text-white text-[16px] font-inter font-semibold" onClick={handleResetPassClick}> Reset password</button>
        </>
    )
}

export default ForgotPasswordPage