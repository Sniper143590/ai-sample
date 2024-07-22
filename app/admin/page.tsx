'use client'

import AuthProvider from "@/providers/AuthProvider";
import Dashboard from "@/components/Pages/Dashboradpage";
import ChatModuleProvider from "@/providers/ChatModuleProvider";
import withAuth from "@/hooks/withAuth";

const Chats = () => {
    return (
        <AuthProvider>
            <ChatModuleProvider>
                <Dashboard />
            </ChatModuleProvider>
        </AuthProvider>
    )
}

export default withAuth(Chats)