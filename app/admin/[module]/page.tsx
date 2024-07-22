"use client"

import ChatModulePage from "@/components/Pages/Dashboradpage/ChatModulePage";
import ChatModuleProvider from "@/providers/ChatModuleProvider";
import AuthProvider from "@/providers/AuthProvider";
import withAuth from "@/hooks/withAuth";

const Module = () => {

    return (
        <AuthProvider>
            <ChatModuleProvider>
                <ChatModulePage />
            </ChatModuleProvider>
        </AuthProvider>
    )
}

export default withAuth(Module)