import Layout from "@/components/Layout"
import useIsMobile from "@/hooks/useIsMobile"
import ForgotPasswordPage from "./ForgotPasswordPage"


function ForgotPassword () {
    const isMobile = useIsMobile()

    return (
        <Layout type={isMobile ? "mobile" : "full"}>
            <ForgotPasswordPage />
        </Layout>
    )
        
    
        
    
}

export default ForgotPassword