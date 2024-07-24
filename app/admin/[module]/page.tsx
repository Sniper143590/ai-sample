"use client"

import ChatModulePage from "@/components/Pages/Dashboradpage/ChatModulePage";
import ChatModuleLayout from "@/components/Layout/ChatModuleLayout"

const Module = () => {

    return (
        // <AuthProvider>
        //     <ChatModuleProvider>
                <ChatModuleLayout>
                    <ChatModulePage />
                </ChatModuleLayout>
        //      </ChatModuleProvider>
        // </AuthProvider>
    )
}

export default Module