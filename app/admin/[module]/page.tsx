'use client'

import AuthProvider from "@/providers/AuthProvider";
import ChatModulePage from "@/components/Pages/Dashboradpage/ChatModulePage";
import ChatModuleProvider from "@/providers/ChatModuleProvider";

export default function Module() {

    return (
        <AuthProvider>
            <ChatModuleProvider>
                <ChatModulePage />
            </ChatModuleProvider>
        </AuthProvider>
    )
}