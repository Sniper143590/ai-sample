import ChatModuleLayout from "@/components/Layout/ChatModuleLayout"
import withAuth from "@/hooks/withAuth"
import ChatPage from "./ChatPage"

const ChatModulePage = () => {
   
    return (
            <ChatModuleLayout>
                <ChatPage />
            </ChatModuleLayout>
    )
}

export default withAuth(ChatModulePage)