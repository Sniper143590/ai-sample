'use client'
import ForgotPassword from "@/components/Pages/ForgotPasswordPage"
import AuthProvider from "@/providers/AuthProvider";

const Forgot = () => {

    return (
        <AuthProvider>
            <ForgotPassword />
        </AuthProvider>
    )
    
}

export default Forgot