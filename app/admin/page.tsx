'use client'

import Dashboard from "@/components/Pages/Dashboradpage";
import ChatModuleProvider from "@/providers/ChatModuleProvider";

const Chats = () => {
    return (
            <ChatModuleProvider>
                <Dashboard />
            </ChatModuleProvider>
    )
}

export default Chats