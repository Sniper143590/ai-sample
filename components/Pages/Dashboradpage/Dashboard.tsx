import AdminFullLayout from "@/components/Layout/AdminFullLayout"
import Main from "./Main"
import LoadingPage from "../LoadingPage"
import { useChat } from "@/providers/ChatModuleProvider"

const Dashboard = () => {

    const {loading} = useChat()

    if(loading) {
        return (<LoadingPage />)
    }
    return (
        <AdminFullLayout>
            <Main />
        </AdminFullLayout>
    )
}

export default Dashboard