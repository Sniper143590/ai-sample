'use client'

import AuthProvider from "@/providers/AuthProvider";
import ChatModulePage from "@/components/Pages/Dashboradpage/ChatModulePage";
import RightSidebarProvider from "@/providers/RightSidebarProvider";
import ChatModuleProvider from "@/providers/ChatModuleProvider";

export default function Module() {

    return (
        <AuthProvider>
            <ChatModuleProvider>
                <RightSidebarProvider>
                    <ChatModulePage />
                </RightSidebarProvider>
            </ChatModuleProvider>
        </AuthProvider>
    )
}